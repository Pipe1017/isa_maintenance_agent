import { useState } from 'react';

export default function FileUpload({ selectedFile, fileInfo, onFileChange }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="space-y-6">
      {/* Carga de Archivo */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">📁 Archivo de Mantenimiento</h3>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-1"
          >
            <span className="text-lg">ℹ️</span>
            <span>Info</span>
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          Sube el archivo Excel (.xlsx) con los datos de avisos de mantenimiento que deseas analizar.
        </p>

        <input
          type="file"
          accept=".xlsx"
          onChange={onFileChange}
          className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700 file:cursor-pointer transition-all"
        />
        
        {selectedFile && (
          <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
            <p className="text-sm text-green-400 flex items-center gap-2">
              <span>✓</span>
              <span className="font-medium">{selectedFile.name}</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Archivo cargado correctamente
            </p>
          </div>
        )}

        {/* Modal de Información */}
        {showInfo && (
          <div className="mt-4 bg-gray-900 border border-cyan-500/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-cyan-400">Validaciones del Archivo</h4>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex gap-2">
                <span className="text-cyan-400">✓</span>
                <div>
                  <p className="font-semibold">Formato correcto:</p>
                  <p className="text-gray-400">Debe ser un archivo Excel (.xlsx) válido</p>
                </div>
              </div>

              <div className="flex gap-2">
                <span className="text-cyan-400">✓</span>
                <div>
                  <p className="font-semibold">Columnas requeridas:</p>
                  <p className="text-gray-400">Aviso, Área de empresa, Equipo</p>
                </div>
              </div>

              <div className="flex gap-2">
                <span className="text-cyan-400">✓</span>
                <div>
                  <p className="font-semibold">Columnas esperadas (opcionales):</p>
                  <p className="text-gray-400">Prioridad, Clase de aviso, Descripción, Fechas, etc.</p>
                </div>
              </div>

              <div className="flex gap-2">
                <span className="text-cyan-400">✓</span>
                <div>
                  <p className="font-semibold">Contenido:</p>
                  <p className="text-gray-400">Mínimo 1 fila, máximo 100,000 filas</p>
                </div>
              </div>

              <div className="flex gap-2">
                <span className="text-cyan-400">✓</span>
                <div>
                  <p className="font-semibold">Datos válidos:</p>
                  <p className="text-gray-400">Las columnas críticas no deben estar vacías</p>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                💡 El sistema validará automáticamente que el archivo contenga datos de mantenimiento válidos antes de procesarlo.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Resumen del Archivo */}
      {fileInfo && (
        <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-xl p-6 border border-cyan-500/30">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">📊 Resumen del Archivo</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Archivo:</span>
              <span className="text-white font-medium text-sm truncate ml-2 max-w-[150px]" title={fileInfo.filename}>
                {fileInfo.filename}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Total de avisos:</span>
              <span className="text-cyan-400 font-bold">{fileInfo.rows.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Columnas:</span>
              <span className="text-cyan-400 font-bold">{fileInfo.columns}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-cyan-500/30">
              <p className="text-xs text-gray-400 text-center">
                ✓ Archivo validado correctamente
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}