"use client";
import { AlertTriangle, ChevronRight, ChevronDown, Cloud, Hourglass, Moon, Redo2, Save, Shield, Sun, Undo2, XCircle, CalendarDays, FolderOpen } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useAppStore, useTemporalStore } from "@/store/useAppStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import { navGroups } from "@/config/navigation";
import { initialGroups } from "@/store/initialData";
import { showRichToast } from "@/utils/toast";
import { motion } from "framer-motion";
import { fileManager } from "@/services/fileManager";
import { searchGlobal, type SearchResult } from "@/services/searchService";
import { ThemeSelector } from "@/components/features/settings/ThemeSelector";


export default function Header({ title, breadcrumbSuffix }: { title?: React.ReactNode; breadcrumbSuffix?: React.ReactNode }) {
  const { activeModuleId, activeCursoId, moduleData, cursoData, pdFileSource, cursoFileSource, saveModuleData, saveCursoData, isSidebarOpen, toggleSidebar, dataSource, workspaceHandle, syncStatus } = useAppStore();
  const [localGroups, setLocalGroups] = useState<string[]>([]);
  const [activeLocalGroup, setActiveLocalGroup] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cursoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialLoadRef = useRef<boolean>(true);

  const { undo, redo, pastStates, futureStates } = useTemporalStore((state) => state);

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [cloudSynced, setCloudSynced] = useState(false);
  
  // Estado para búsqueda
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateStates = () => {
      setCloudSynced(fileManager.isGoogleConnected() || fileManager.isOneDriveConnected());
    };
    updateStates();
  }, []);

  useEffect(() => {
    if (workspaceHandle && dataSource === 'local') {
      fileManager.scanGroupsInWorkspace(workspaceHandle).then(groups => setLocalGroups(groups));
    }
  }, [workspaceHandle, dataSource]);

  let currentItem = "";
  let currentGroup = "";
  if (pathname === '/inicio') {
    currentItem = "Inicio";
  } else if (pathname === '/agenda') {
    currentItem = "Agenda de clase";
  } else if (pathname === '/archivos') {
    currentItem = "Archivos";
  } else {
    for (const group of navGroups) {
      const found = group.items.find(item => item.href === pathname);
      if (found) {
        currentItem = found.label;
        currentGroup = group.title;
        break;
      }
    }
  }


  // Autosave Effect for moduleData
  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      return;
    }

    if (!moduleData || !activeModuleId) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      await saveModuleData();
    }, 3000);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [moduleData, activeModuleId, saveModuleData]);

  // Autosave Effect for cursoData
  useEffect(() => {
    if (!cursoData || !activeCursoId) return;

    if (cursoSaveTimeoutRef.current) {
      clearTimeout(cursoSaveTimeoutRef.current);
    }

    cursoSaveTimeoutRef.current = setTimeout(async () => {
      await saveCursoData();
    }, 3000);

    return () => {
      if (cursoSaveTimeoutRef.current) clearTimeout(cursoSaveTimeoutRef.current);
    };
  }, [cursoData, activeCursoId, saveCursoData]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    let ok: boolean | "conflict" = false;
    let cursoOk: boolean | "conflict" = false;
    
    if (moduleData && activeModuleId) {
      ok = await saveModuleData();
    }
    if (cursoData && activeCursoId) {
      cursoOk = await saveCursoData();
      ok = (ok === true || cursoOk === true) ? true : (ok === "conflict" || cursoOk === "conflict" ? "conflict" : false);
    }
    
    if (ok === "conflict") {
      showRichToast.error("Conflicto de versiones", "Los datos están obsoletos. Por favor, recarga la página.");
    } else if (ok === true) {
      showRichToast.success(`Guardado con éxito`, `Datos actualizados.`);
    } else {
      showRichToast.error("Error al guardar", "Revisa la conexión o los datos.");
    }
    setIsSaving(false);
  }, [moduleData, activeModuleId, cursoData, activeCursoId, saveModuleData, saveCursoData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          if (futureStates.length > 0) redo();
        } else {
          if (pastStates.length > 0) undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        if (futureStates.length > 0) redo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        // Focus search input
        const searchInput = document.querySelector('input[placeholder="Buscar..." aria-label="Buscar en la aplicación" role="searchbox"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        // Navigate to help
        router.push('/ayuda');
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle command palette (placeholder)
        toast('Comando palette no implementado aún');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, pastStates.length, futureStates.length, handleSave]);
  return (
    <div className="w-full flex flex-col z-40 sticky top-0 bg-background/95 backdrop-blur-xl border-b border-[var(--glass-border)] pb-2 shadow-md">
      <div className="w-full px-6 py-2 flex items-center justify-between gap-3 text-sm text-muted tracking-wide">
        
        {/* Izquierda: Menú móvil y Breadcrumb */}
        <div className="flex-1 min-w-0 flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-muted hover:text-foreground p-1 rounded-lg hover:bg-foreground/5 transition-colors shrink-0"
            aria-label="Toggle sidebar" aria-expanded={isSidebarOpen} aria-controls="sidebar" tabIndex={0}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
          
          <div className="flex items-center gap-2 text-sm text-muted whitespace-nowrap overflow-hidden text-ellipsis">
            <Link href="/" className="hover:text-foreground transition-colors font-medium">Inicio</Link>
            {currentGroup && (
              <>
                <ChevronRight className="w-4 h-4 shrink-0" />
                <span className="truncate">{currentGroup}</span>
              </>
            )}
            {(currentItem || breadcrumbSuffix) && (
              <>
                <ChevronRight className="w-4 h-4 shrink-0" />
                <span className="font-medium text-foreground">{currentItem || breadcrumbSuffix}</span>
              </>
            )}
            
            {/* Sync Status Indicator */}
            {dataSource === 'local' && (
              <div className="ml-4 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-foreground/5 text-xs font-medium">
                {syncStatus === 'saving' && <><Hourglass className="w-3 h-3 text-warning animate-spin" /><span className="text-warning">Guardando...</span></>}
                {syncStatus === 'saved' && <><Save className="w-3 h-3 text-success" /><span className="text-success">Guardado local</span></>}
                {syncStatus === 'error' && <><AlertTriangle className="w-3 h-3 text-danger" /><span className="text-danger">Error al guardar</span></>}
                {syncStatus === 'idle' && <><Cloud className="w-3 h-3 text-muted/50" /><span className="text-muted/60">Sincronizado</span></>}
              </div>
            )}
          </div>
        </div>

        {/* Derecha: Búsqueda y Herramientas */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative w-48 md:w-64 shrink-0">
            <input
              type="text"
              placeholder="Buscar..."
              aria-label="Buscar en la aplicación"
              role="searchbox"
              value={searchQuery}
              onChange={(e) => {
                const query = e.target.value;
                setSearchQuery(query);
                const results = searchGlobal(query);
                setSearchResults(results);
                setShowResults(results.length > 0);
              }}
              onFocus={() => setShowResults(searchResults.length > 0)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              className="bg-foreground/5 border border-[var(--glass-border)] rounded-lg px-3 py-1.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-accent/50 w-full"
            />
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full right-0 mt-1 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto w-64">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 hover:bg-foreground/10 cursor-pointer text-sm"
                    onClick={() => {
                      if (result.href) {
                        router.push(result.href);
                        setSearchQuery("");
                        setShowResults(false);
                      }
                    }}
                  >
                    <div className="font-medium text-[var(--text-primary)]">{result.title}</div>
                    {result.subtitle && (
                      <div className="text-xs text-[var(--text-muted)]">{result.subtitle}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 bg-foreground/5 p-1 rounded-lg">
            <button
              onClick={() => undo()}
              disabled={pastStates.length === 0}
              className={`p-1.5 rounded-md transition-colors ${pastStates.length > 0 ? 'text-foreground hover:bg-foreground/10 cursor-pointer' : 'text-muted opacity-50 cursor-not-allowed'}`}
              title="Deshacer (Ctrl+Z)" aria-label="Deshacer" tabIndex={0}
            >
              <Undo2 size={16} />
            </button>
            <button
              onClick={() => redo()}
              disabled={futureStates.length === 0}
              className={`p-1.5 rounded-md transition-colors ${futureStates.length > 0 ? 'text-foreground hover:bg-foreground/10 cursor-pointer' : 'text-muted opacity-50 cursor-not-allowed'}`}
              title="Rehacer (Ctrl+Y)" aria-label="Rehacer" tabIndex={0}
            >
              <Redo2 size={16} />
            </button>
          </div>

          {mounted && (
            <div className="flex items-center">
              <ThemeSelector />
            </div>
          )}
        </div>
      </div>

      {title && (
        <header className="w-full flex items-center justify-center px-8 pt-4 pb-2">
          <div className="border-2 border-[#14a085] rounded-xl px-8 py-3 shadow-[0_4px_15px_rgba(20,160,133,0.1)] bg-background/50 backdrop-blur-sm">
            <h2 className="text-3xl whitespace-nowrap font-extrabold tracking-tight primary-gradient-text m-0 leading-none">
              {title}
            </h2>
          </div>
        </header>
      )}
    </div>
  );
}
