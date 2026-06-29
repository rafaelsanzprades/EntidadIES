'use client';
import React, { useState, useEffect } from 'react';
import { File, Folder, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import './DriveFileViewer.css';

interface DriveFile {
  ID: string;
  Name: string;
  IsDir: boolean;
  MimeType: string;
  ModTime: string;
  Size: number;
}

interface DriveFileViewerProps {
  folderId: string;
  title?: string;
}

export function DriveFileViewer({ folderId, title = "Documentación Asociada" }: DriveFileViewerProps) {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFiles() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`http://127.0.0.1:8000/api/drive/files/${folderId}`);
        if (!res.ok) throw new Error("Error al obtener archivos de Drive");
        const data = await res.json();
        setFiles(data.files || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    if (folderId) fetchFiles();
  }, [folderId]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatSize = (bytes: number) => {
    if (!bytes || bytes === 0) return '--';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="drive-viewer-card fade-in">
      <div className="drive-viewer-header">
        <div className="header-left">
          <svg className="drive-logo" viewBox="0 0 87.3 126.9" width="18" height="18">
            <path fill="#0066da" d="M58.3 103.3l17.7 30.5L34.2 127l12-21 12.1-2.7z"/>
            <path fill="#00ac47" d="M87.3 76.5h-59L45.9 46.2l30.6-2.5 10.8 32.8z"/>
            <path fill="#ea4335" d="M10.8 76.5h47.6l28.9-50-25-4.8L34.2 0 10.8 76.5z"/>
            <path fill="#ffba00" d="M0 103.3h58.3L29.3 53.4l-7.3-3.6L0 103.3z"/>
          </svg>
          <h3 className="drive-viewer-title">{title}</h3>
        </div>
        <span className="drive-viewer-badge">Google Drive</span>
      </div>
      
      <div className="drive-viewer-content">
        {loading && (
          <div className="drive-viewer-state">
            <Loader2 className="spinner icon-spin" size={24} /> 
            <p>Conectando con Google Drive...</p>
          </div>
        )}
        
        {error && (
          <div className="drive-viewer-state error-state">
            <AlertCircle size={24} /> 
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && files.length === 0 && (
          <div className="drive-viewer-state empty-state">
            <p>Carpeta vacía</p>
          </div>
        )}

        {!loading && !error && files.length > 0 && (
          <div className="drive-file-list-container">
            <ul className="drive-file-list">
              {files.map(file => (
                <li key={file.ID} className="drive-file-item">
                  <div className="file-icon-wrapper">
                    {file.IsDir ? (
                      <Folder className="icon-folder" size={20} />
                    ) : (
                      <File className="icon-file" size={20} />
                    )}
                  </div>
                  <div className="file-details">
                    <span className="file-name">{file.Name}</span>
                    <div className="file-meta">
                      <span className="file-date">{formatDate(file.ModTime)}</span>
                      {!file.IsDir && (
                        <>
                          <span className="file-dot">&bull;</span>
                          <span className="file-size">{formatSize(file.Size)}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="file-actions">
                    <a 
                      href={`https://drive.google.com/open?id=${file.ID}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="action-btn"
                      title="Abrir en Drive"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
