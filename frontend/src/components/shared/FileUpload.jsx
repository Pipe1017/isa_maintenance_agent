export default function FileUpload({ selectedFile, fileInfo, onFileChange }) {
  return (
    <div className="space-y-6">
      {/* Carga de Archivo */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4">📁 Archivo de Datos</h3>
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
              {selectedFile.name}
            </p>
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
              <span className="text-gray-400 text-sm">Filas:</span>
              <span className="text-cyan-400 font-bold">{fileInfo.rows.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Columnas:</span>
              <span className="text-cyan-400 font-bold">{fileInfo.columns}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}