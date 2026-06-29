"use client";
import { Calendar, FileEdit, Receipt, Scale, School, UserCircle, Settings , Info } from "lucide-react";
import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { fileManager } from "@/services/fileManager";

export function DatosTab() {
  const {
    moduleData,
    setModuleData,
    updateInfoModulo,
    updateModuleData,
  } = useAppStore();

  useEffect(() => {
    // Force reload of new demo values if they are missing
    if (moduleData?.info_modulo?.centro !== "IES Andalán" || (moduleData?.df_act && moduleData.df_act.length < 21)) {
      const db = fileManager.getDb();
      if (db['0237-ictve-pd']) {
        setModuleData(db['0237-ictve-pd']);
      }
    }
  }, [moduleData?.info_modulo?.centro, moduleData?.df_act?.length, setModuleData]);

  // --- Data Extraction ---
  const data = moduleData?.info_modulo || {};

  const h_sem = Number(data.h_sem) || 0;
  const h_boa = Number(data.h_boa) || 0;
  const p_ev = Number(data.p_ev) || 15;
  const h_p_ev = Math.round((p_ev / 100) * h_boa);

  // --- Evaluación ---
  const sumaTrimestres = (data.pond_1t || 0) + (data.pond_2t || 0) + (data.pond_3t || 0);
  const sumaCriterios =
    (data.criterio_conocimiento || 0) +
    (data.criterio_procedimiento_practicas || 0) +
    (data.criterio_procedimiento_ejercicios || 0) +
    (data.criterio_tareas || 0);

  return (
    <>
      <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/5 border border-accent/20 mb-6">
        <Info className="w-5 h-5 text-accent mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-foreground">Módulo Profesional - RD 659/2023</p>
          <p className="text-sm text-muted mt-1">Estructura, duración y normativa aplicable al módulo formativo.</p>
        </div>
      </div>
<div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Centro y docente */}
      <Card className="p-6">
        <h2 className="text-[1.1rem] font-bold flex items-center gap-2 text-foreground mb-5">
<span>‍<span className="inline-flex"><School className="w-[1.2em] h-[1.2em] mr-1" /></span></span> Centro y docente
</h2>
        <div className="grid grid-cols-2 gap-6">
          <Input 
            label="Centro educativo"
            type="text"
            value={data.centro || ""}
            onChange={e => updateInfoModulo('centro', e.target.value)}
          />
          <Input 
            label="Profesorado"
            type="text"
            value={data.profesorado || data.profesor || ""}
            onChange={e => updateInfoModulo('profesorado', e.target.value)}
          />
        </div>
      </Card>

      {/* 2. Módulo didáctico */}
      <Card className="p-6">
        <h2 className="text-[1.1rem] font-bold flex items-center gap-2 text-foreground mb-5">
<span><span className="inline-flex"><FileEdit className="w-[1.2em] h-[1.2em] mr-1" /></span></span> Módulo didáctico
</h2>

        <div className="grid grid-cols-5 gap-4 mb-5">
          <Input 
            label="Código"
            type="text"
            value={data.codigo || ""}
            onChange={e => updateInfoModulo('codigo', e.target.value)}
          />
          <div className="col-span-2">
            <Input 
              label="Nombre del módulo"
              type="text"
              value={data.nombre || ""}
              onChange={e => updateInfoModulo('nombre', e.target.value)}
            />
          </div>
          <Input 
            label="Curso"
            type="text"
            value={data.curso || ""}
            onChange={e => updateInfoModulo('curso', e.target.value)}
          />
          <Input 
            label="Nº de trimestres"
            type="text"
            className="text-muted cursor-not-allowed"
            disabled 
            value="3"
          />
        </div>

        <div className="grid grid-cols-5 gap-4">
          <Input 
            label="Horas/semana clase"
            type="number"
            value={data.h_sem || 0}
            onChange={e => updateInfoModulo('h_sem', Number(e.target.value))}
          />
          <Input 
            label="Horas BOA"
            type="number"
            value={data.h_boa || 0}
            onChange={e => updateInfoModulo('h_boa', Number(e.target.value))}
          />
          <Input 
            label="% P.Ev.Continua"
            type="number"
            value={data.p_ev || 15}
            onChange={e => updateInfoModulo('p_ev', Number(e.target.value))}
          />
          <Input 
            label={`Horas P.Ev. (${p_ev}%)`}
            type="text"
            className="text-warning cursor-not-allowed text-center font-bold"
            disabled 
            value={`${h_p_ev} h`}
          />
        </div>
      </Card>



      {/* 5. Evaluación */}
      <Card className="p-6 border-l-4 border-l-accent">
        <h4 className="text-lg font-bold text-foreground mb-6 flex items-center justify-between">
          <span className="flex items-center gap-2"><span><span className="inline-flex"><Scale className="w-[1.2em] h-[1.2em] mr-1" /></span></span> % Ponderación por trimestres</span>
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${sumaTrimestres === 100 ? 'bg-success/10 text-success border border-success/30' : 'bg-danger/10 text-danger border border-danger/30'}`}>
            {sumaTrimestres}% {sumaTrimestres !== 100 && "(Debe sumar 100%)"}
          </span>
        </h4>
        <div className="grid grid-cols-3 gap-6">
          {[['pond_1t', '1er trimestre (%)'], ['pond_2t', '2º trimestre (%)'], ['pond_3t', '3er trimestre (%)']].map(([k, label]) => (
            <Input 
              key={k}
              label={label}
              type="number" value={data[k] || 0} onChange={e => updateInfoModulo(k, Number(e.target.value))}
              className="text-center" 
            />
          ))}
        </div>
      </Card>

      <Card className="p-6 border-l-4 border-l-purple-500">
        <h4 className="text-lg font-bold text-foreground mb-6 flex items-center justify-between">
          <span className="flex items-center gap-2"><span><span className="inline-flex"><Receipt className="w-[1.2em] h-[1.2em] mr-1" /></span></span> % Instrumentos de evaluación</span>
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${sumaCriterios === 100 ? 'bg-success/10 text-success border border-success/30' : 'bg-danger/10 text-danger border border-danger/30'}`}>
            {sumaCriterios}% {sumaCriterios !== 100 && "(Debe sumar 100%)"}
          </span>
        </h4>
        <div className="grid grid-cols-4 gap-6">
          {[
            ['criterio_conocimiento', 'Exámenes teóricos'],
            ['criterio_procedimiento_practicas', 'Exámenes prácticos'],
            ['criterio_procedimiento_ejercicios', 'Informes de ejercicios'],
            ['criterio_tareas', 'Cuaderno de tareas'],
          ].map(([k, label]) => (
            <Input 
              key={k}
              label={label}
              type="number" value={data[k] || 0} onChange={e => updateInfoModulo(k, Number(e.target.value))}
              className="text-center" 
            />
          ))}
        </div>
      </Card>

      {/* 6. Reglas de redondeo y compensación */}
      <Card className="p-6 border-l-4 border-l-orange-500">
        <h4 className="text-lg font-bold text-foreground mb-6 flex items-center justify-between">
          <span className="flex items-center gap-2"><span><span className="inline-flex"><Settings className="w-[1.2em] h-[1.2em] mr-1" /></span></span> Reglas de redondeo y compensación</span>
        </h4>
        {(() => {
          const config = moduleData?.config_redondeo || {
            nota_aprobado: 5.0,
            umbral_redondeo: 5.0,
            max_compensables: 0
          };
          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Nota mínima para aprobar</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={config.nota_aprobado ?? 5.0}
                  onChange={(e) => updateModuleData("config_redondeo", { ...config, nota_aprobado: parseFloat(e.target.value) })}
                  className="w-full bg-background border border-[var(--glass-border)] rounded px-3 py-2 text-foreground text-center"
                />
                <p className="text-xs text-muted">Nota a partir de la cual un RA o Módulo se considera superado (típicamente 5.0).</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Umbral de redondeo al alza</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={config.umbral_redondeo ?? 5.0}
                  onChange={(e) => updateModuleData("config_redondeo", { ...config, umbral_redondeo: parseFloat(e.target.value) })}
                  className="w-full bg-background border border-[var(--glass-border)] rounded px-3 py-2 text-foreground text-center"
                />
                <p className="text-xs text-muted">Si un alumno obtiene esta nota o superior (ej. 4.8), se redondeará automáticamente a la nota de aprobado.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Criterios compensables por RA</label>
                <input 
                  type="number" 
                  step="1"
                  value={config.max_compensables ?? 0}
                  onChange={(e) => updateModuleData("config_redondeo", { ...config, max_compensables: parseInt(e.target.value) })}
                  className="w-full bg-background border border-[var(--glass-border)] rounded px-3 py-2 text-foreground text-center"
                />
                <p className="text-xs text-muted">Número máximo de criterios de evaluación que se pueden compensar entre trimestres si el RA está cerca de superarse.</p>
              </div>
            </div>
          );
        })()}
      </Card>

      </div>
    </>
  );
}
