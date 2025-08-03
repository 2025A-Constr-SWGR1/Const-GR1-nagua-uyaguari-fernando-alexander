# Taller 3: "Diseña tu propia API diaria"

## Integrantes

- Mora Ariel
- Nagua Fernando
  
## Descripción del Proyecto

He creado una **API Personal** que permite a mis compañeros consultar información sobre mi disponibilidad, nivel de concentración y recordatorios.

## Endpoints Implementados

### 1. `/api/personal/disponibilidad`

**Descripción**: Consulta mi disponibilidad actual basada en horarios típicos.

**Método**: `GET`

**Parámetros opcionales**:

- `hora` (query): Hora específica a consultar (0-23)

**Ejemplo de respuesta**:

```json
{
  "disponible": true,
  "hasta": "18:00",
  "actividad_actual": "Clases en la Poli",
  "proxima_actividad": "Tiempo libre",
  "mensaje": "Solo disponible para proyectos y tareas"
}
```

**Horarios definidos**:

- 6:00-8:00: Rutina matutina (NO disponible)
- 8:00-12:00: Gimnasio (NO disponible)
- 12:00-14:00: Almuerzo (NO disponible)
- 14:00-18:00: Clases en la Poli (DISPONIBLE)
- 18:00-20:00: Tiempo libre (DISPONIBLE)
- 20:00-22:00: Estudio nocturno (DISPONIBLE)
- 22:00-6:00: Descanso (NO disponible)

---

### 2. `/api/personal/concentracion`

**Descripción**: Indica mi nivel de concentración actual y factores que lo afectan.

**Método**: `GET`

**Parámetros opcionales**:

- `dia` (query): Día de la semana a evaluar

**Ejemplo de respuesta**:

```json
{
  "nivel": 8,
  "estado": "Bueno",
  "factores_distraccion": [],
  "recomendacion": "Buen momento para estudio y trabajo en proyectos",
  "momento_optimo": "Entre 6:00-10:00 AM y 16:00-18:00 PM"
}
```

**Niveles de concentración**:

- 8-10: Excelente (tareas complejas)
- 6-7: Bueno (estudio general)
- 4-5: Regular (tareas rutinarias)
- 1-3: Bajo (descanso recomendado)

---

### 3. `/api/personal/recordatorios`

**Descripción**: Lista mis recordatorios clasificados por categoria.

**Método**: `GET`

**Parámetros opcionales**:

- `categoria` (query): Filtrar por categoría (académico, personal, salud)

**Ejemplo de respuesta**:

```json
{
  "recordatorios": [
    {
      "id": 1,
      "titulo": "Entrega Taller API Personal",
      "descripcion": "Completar implementación y documentación del taller 3",
      "prioridad": "alta",
      "fecha_limite": "2025-07-30T23:59:00",
      "categoria": "académico"
    }
  ],
  "completados_hoy": 2,
  "total_pendientes": 5
}
```

## 🔍 Evaluación de la API

### **¿Es Predecible?**

**SÍ** - La API es altamente predecible porque:

- **Estructura consistente**: Todos los endpoints siguen el patrón `/api/personal/{recurso}`
- **Respuestas estandarizadas**: Cada endpoint tiene un formato de respuesta bien definido con tipos TypeScript
- **Comportamiento determinista**: Dado el mismo input, siempre produce el mismo output
- **Documentación clara**: Cada endpoint está bien documentado con ejemplos
- **Validaciones**: Implementa validaciones de entrada (ej: hora entre 0-23)

**Ejemplo**: Si consulto `/disponibilidad?hora=10`, siempre se obtiene la misma respuesta porque 10 AM está en el bloque "Estudio/Trabajo".

### 🔒 **¿Es Segura?**

**MODERADAMENTE SEGURA** - Implementa seguridad básica:

**Aspectos seguros**:

- ✅ Validación de entrada de datos
- ✅ Manejo de errores con códigos HTTP apropiados
- ✅ No expone información sensible personal
- ✅ Usa TypeScript para prevenir errores de tipo

**Mejoras de seguridad pendientes**:

- ❌ No tiene autenticación/autorización
- ❌ No tiene rate limiting
- ❌ No tiene logging de seguridad
- ❌ No valida origen de las requests

### ⚡ **¿Es Eficiente?**

**SÍ** - La API es eficiente porque:

- **Respuestas rápidas**: Datos calculados en memoria, sin consultas a BD
- **Payload ligero**: Respuestas JSON optimizadas, sin datos innecesarios
- **Lógica simple**: Algoritmos O(1) para disponibilidad y concentración
- **Filtrado inteligente**: Endpoint de recordatorios permite filtrar por categoría
- **Sin dependencias externas**: No requiere llamadas a APIs terceros

**Métricas simuladas**:

- Tiempo de respuesta: ~85ms
- Throughput: Alto (limitado solo por NestJS)
- Memoria: Baja (datos estáticos)

### 👥 **¿Da Buena Experiencia de Usuario?**

**EXCELENTE UX** - La API está diseñada pensando en el usuario:

**Aspectos positivos**:

- ✅ **URLs intuitivas**: `/disponibilidad`, `/concentracion`, `/recordatorios`
- ✅ **Respuestas informativas**: Incluye contexto útil (próxima actividad, recomendaciones)
- ✅ **Flexibilidad**: Parámetros opcionales para personalizar consultas
- ✅ **Mensajes amigables**: Textos explicativos en lugar de códigos crípticos
- ✅ **Datos contextuales**: Información adicional útil en cada respuesta
- ✅ **Consistencia**: Mismo patrón de respuesta en todos los endpoints

**Ejemplo de UX bien diseñada**:
En lugar de solo devolver `"disponible": false`, la API explica:

```json
{
  "disponible": false,
  "hasta": "08:00",
  "actividad_actual": "Gimnasio",
  "mensaje": "En rutina matutina, disponible después de las 8:00 AM"
}
```
