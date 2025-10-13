import pandas as pd
from typing import Dict, List, Tuple

class FileValidator:
    """Validador para archivos Excel de mantenimiento"""
    
    # Columnas esperadas (flexibles - puede tener variaciones)
    EXPECTED_COLUMNS = {
        'required': [
            'Aviso',
            'Área de empresa',
            'Equipo'
        ],
        'optional': [
            'Sociedad CO',
            'Denominación',
            'Perfil catálogo',
            'Ubicac.técnica',
            'Indicador ABC',
            'CTE',
            'Clase de aviso',
            'Descripción',
            'Creado el',
            'Inicio deseado',
            'Fin deseado',
            'Prioridad',
            'Fecha de cierre'
        ]
    }
    
    MIN_ROWS = 1
    MAX_ROWS = 100000  # Límite razonable
    
    @staticmethod
    def validate_file(df: pd.DataFrame) -> Tuple[bool, str]:
        """
        Valida que el DataFrame tenga el formato correcto para datos de mantenimiento.
        
        Returns:
            Tuple[bool, str]: (es_válido, mensaje_error)
        """
        
        # 1. Verificar que no esté vacío
        if df.empty:
            return False, "El archivo está vacío. Por favor sube un archivo con datos."
        
        # 2. Verificar límites de tamaño
        if len(df) < FileValidator.MIN_ROWS:
            return False, f"El archivo debe tener al menos {FileValidator.MIN_ROWS} fila(s) de datos."
        
        if len(df) > FileValidator.MAX_ROWS:
            return False, f"El archivo excede el límite de {FileValidator.MAX_ROWS} filas."
        
        # 3. Obtener columnas del archivo
        file_columns = set(df.columns)
        
        # 4. Verificar columnas requeridas
        required_columns = set(FileValidator.EXPECTED_COLUMNS['required'])
        missing_required = required_columns - file_columns
        
        if missing_required:
            return False, (
                f"El archivo no tiene el formato correcto. "
                f"Faltan columnas requeridas: {', '.join(missing_required)}. "
                f"Este sistema está diseñado para analizar datos de avisos de mantenimiento."
            )
        
        # 5. Verificar que al menos tenga algunas columnas opcionales (indica que es el formato correcto)
        optional_columns = set(FileValidator.EXPECTED_COLUMNS['optional'])
        matching_optional = file_columns & optional_columns
        
        if len(matching_optional) < 3:  # Al menos 3 columnas opcionales deben coincidir
            return False, (
                f"El archivo parece no ser un archivo de avisos de mantenimiento válido. "
                f"Se esperan columnas como: {', '.join(list(optional_columns)[:5])}, etc."
            )
        
        # 6. Validar tipos de datos básicos en columnas críticas
        if 'Aviso' in df.columns:
            # Verificar que Aviso tenga valores válidos (números o strings)
            if df['Aviso'].isna().all():
                return False, "La columna 'Aviso' está completamente vacía."
        
        if 'Área de empresa' in df.columns:
            # Verificar que Área tenga valores válidos
            if df['Área de empresa'].isna().all():
                return False, "La columna 'Área de empresa' está completamente vacía."
        
        # 7. Todo OK
        return True, "Archivo válido"
    
    @staticmethod
    def get_file_summary(df: pd.DataFrame) -> Dict:
        """Genera un resumen del archivo validado"""
        return {
            'rows': len(df),
            'columns': len(df.columns),
            'column_names': list(df.columns),
            'has_areas': 'Área de empresa' in df.columns,
            'has_priorities': 'Prioridad' in df.columns,
            'has_equipment': 'Equipo' in df.columns
        }