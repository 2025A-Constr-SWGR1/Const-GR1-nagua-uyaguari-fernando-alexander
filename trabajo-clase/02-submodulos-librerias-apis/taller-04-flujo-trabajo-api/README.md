# Taller 4: "Evoluciona tu flujo de trabajo como una API"

## Integrantes

- Mora Ariel
- Nagua Fernando

## Descripción del Taller

Este taller analiza cómo la **rutina de gestión de recordatorios** ha evolucionado durante el semestre, comparando diferentes versiones de un enfoque como si fuera una API que recibe actualizaciones y mejoras continuas.

## Rutina Analizada: Gestión de Recordatorios y Tareas

He elegido analizar mi sistema de **gestión de recordatorios y tareas académicas** porque podría ser fundamental para mi rendimiento estudiantil durante el semestre.

---

## **API v1.0 - Enfoque Inicial**

### **Implementación Original**

```json
{
  "version": "1.0.0",
  "método": "Lista física en cuaderno",
  "herramientas": ["Cuaderno", "Bolígrafo", "Memoria"]
}
```

### **Características v1.0:**

- **Almacenamiento**: Lista escrita a mano en cuaderno
- **Categorización**: Sin categorías específicas
- **Priorización**: Visual (subrayar cosas importantes)
- **Recordatorios**: Dependía 100% de mi memoria
- **Seguimiento**: No había tracking de progreso
- **Acceso**: Solo cuando tenía el cuaderno físico

### **Métricas v1.0:**

- **Tiempo dedicado a gestión**: ~30 min/día
- **Tareas completadas a tiempo**: 60%
- **Nivel de estrés**: 8/10 (alto)
- **Eficiencia**: 4/10
- **Disponibilidad**: 3/10 (solo con cuaderno)

### **Problemas Identificados:**

- Perdía el cuaderno frecuentemente
- Olvidaba revisar la lista
- No tenía alertas de fechas límite
- Sobrecarga mental constante
- Duplicación de tareas
- No podía acceder desde cualquier lugar

---

## **API v2.0 - Enfoque Mejorado**

### **Implementación Actualizada**

```json
{
  "version": "2.0.0",
  "método": "App móvil + Categorización",
  "herramientas": ["Todoist", "Google Calendar", "Notion"]
}
```

### **Nuevas Características v2.0:**

- **Almacenamiento**: Sincronización en la nube de Notion
- **Categorización**: Académico, Personal, Salud, Trabajo
- **Priorización**: Sistema de niveles (Alta, Media, Baja)
- **Recordatorios**: Notificaciones automáticas push
- **Seguimiento**: Métricas de productividad integradas
- **Acceso**: Multiplataforma (móvil, web, desktop)

### **Métricas v2.0:**

- **Tiempo dedicado a gestión**: ~15 min/día
- **Tareas completadas a tiempo**: 85%
- **Nivel de estrés**: 5/10 (moderado)
- **Eficiencia**: 8/10
- **Disponibilidad**: 9/10 (siempre accesible)

---

## **Comparación de Versiones**

| Aspecto | v1.0 (Cuaderno) | v2.0 (Digital) | Mejora |
|---------|-----------------|----------------|---------|
| **Tiempo de gestión** | 30 min/día | 15 min/día | ⬇️ 50% |
| **Tareas completadas** | 60% | 85% | ⬆️ 25% |
| **Nivel de estrés** | 8/10 | 5/10 | ⬇️ 37.5% |
| **Accesibilidad** | Solo físico | Multiplataforma | ⬆️ 200% |
| **Automatización** | 0% | 80% | ⬆️ 80% |
| **Backup/Seguridad** | Ninguno | Automático | ⬆️ 100% |

---

## **Análisis Detallado de Mejoras**

### **Cambios Exitosos:**

1. **Automatización de recordatorios**
   - **Antes**: Dependía de recordar revisar el cuaderno
   - **Después**: Notificaciones automáticas 30 min antes
   - **Impacto**: Reducción de 90% en tareas olvidadas

2. **Categorización inteligente**
   - **Antes**: Todo mezclado sin orden
   - **Después**: Filtros por categoría (académico, personal, etc.)
   - **Impacto**: Mejor priorización y contexto

3. **Sincronización multiplataforma**
   - **Antes**: Solo accesible con cuaderno físico
   - **Después**: Disponible en móvil, laptop, web
   - **Impacto**: Acceso 24/7 desde cualquier lugar

4. **Métricas de productividad**
   - **Antes**: Sin tracking de progreso
   - **Después**: Estadísticas diarias/semanales
   - **Impacto**: Motivación aumentada y mejor autoconocimiento

### **Implementación en la API `/api/personal/recordatorios`:**

Mi endpoint actual refleja la evolución hacia v2.0:

```js
@Get('recordatorios')
getRecordatorios(@Query('categoria') categoria?: string) {
  // v2.0: Filtrado por categoría implementado
  let recordatorios = categoria 
    ? todosLosRecordatorios.filter(r => r.categoria === categoria)
    : todosLosRecordatorios;
    
  return {
    recordatorios,
    completados_hoy: 2, // v2.0: Tracking de progreso
    total_pendientes: recordatorios.length // v2.0: Métricas visibles
  };
}
```
