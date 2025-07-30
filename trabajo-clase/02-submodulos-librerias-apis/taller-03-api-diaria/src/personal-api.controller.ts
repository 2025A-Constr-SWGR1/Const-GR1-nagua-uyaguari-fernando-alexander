import { Controller, Get, Query, HttpStatus, HttpException } from '@nestjs/common';

@Controller('api/personal')
export class PersonalApiController {
  
  /**
   * Endpoint para consultar disponibilidad actual
   */
  @Get('disponibilidad')
  getDisponibilidad(@Query('hora') hora?: string) {
    const horaActual = hora ? parseInt(hora) : new Date().getHours();
    
    // Validación de hora
    if (horaActual < 0 || horaActual > 23) {
      throw new HttpException('Hora debe estar entre 0 y 23', HttpStatus.BAD_REQUEST);
    }

    // Lógica de disponibilidad basada en horarios típicos
    if (horaActual >= 6 && horaActual < 8) {
      return {
        disponible: false,
        hasta: '08:00',
        actividad_actual: 'Rutina matutina',
        proxima_actividad: 'Gimnasio',
        mensaje: 'En rutina matutina, no disponible para actividades académicas'
      };
    }
    
    if (horaActual >= 8 && horaActual < 12) {
      return {
        disponible: false,
        hasta: '12:00',
        actividad_actual: 'Tiempo de gimnasio',
        proxima_actividad: 'Almuerzo',
        mensaje: 'En medio de una rutina de gimnasio'
      };
    }
    
    if (horaActual >= 12 && horaActual < 14) {
      return {
        disponible: false,
        hasta: '14:00',
        actividad_actual: 'Almuerzo y descanso',
        proxima_actividad: 'Clases en la Poli',
        mensaje: 'En hora de almuerzo, no disponible'
      };
    }
    
    if (horaActual >= 14 && horaActual < 18) {
      return {
        disponible: true,
        hasta: '18:00',
        actividad_actual: 'Clases en la Poli',
        proxima_actividad: 'Tiempo libre',
        mensaje: 'Solo disponible para proyectos y tareas'
      };
    }
    
    if (horaActual >= 18 && horaActual < 20) {
      return {
        disponible: true,
        hasta: '20:00',
        actividad_actual: 'Tiempo libre',
        proxima_actividad: 'Estudio nocturno',
        mensaje: 'Disponible para cualquier activdad'
      };
    }
    
    if (horaActual >= 20 && horaActual < 22) {
      return {
        disponible: true,
        hasta: '22:00',
        actividad_actual: 'Estudio nocturno',
        proxima_actividad: 'Descanso',
        mensaje: 'Disponible para sesiones de estudio o proyectos'
      };
    }
    
    // 22:00 - 06:00
    return {
      disponible: false,
      hasta: '06:00',
      actividad_actual: 'Descanso nocturno',
      proxima_actividad: 'Rutina matutina',
      mensaje: 'Tiempo de descanso, disponible desde las 6:00 AM'
    };
  }

  /**
   * Endpoint para consultar nivel de concentración
   */
  @Get('concentracion')
  getConcentracion(@Query('dia') dia?: string) {
    const hoy = new Date();
    const horaActual = hoy.getHours();
    const diaSemana = dia || ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'][hoy.getDay()];
    
    // Factores que afectan la concentración
    const factoresDistraccion:string[] = [];
    let nivelBase:number;

    // Factores por hora del día
    if (horaActual >= 6 && horaActual < 10) {
      nivelBase = 9; // Mañana temprano - alta concentración
    } else if (horaActual >= 10 && horaActual < 12) {
      nivelBase = 8; // Media mañana - buena concentración
    } else if (horaActual >= 12 && horaActual < 14) {
      nivelBase = 4; // Hora de almuerzo - baja concentración
      factoresDistraccion.push('Hora de almuerzo');
    } else if (horaActual >= 14 && horaActual < 16) {
      nivelBase = 6; // Post-almuerzo - concentración media
      factoresDistraccion.push('Somnolencia post-almuerzo');
    } else if (horaActual >= 16 && horaActual < 18) {
      nivelBase = 8; // Tarde - buena concentración
    } else if (horaActual >= 18 && horaActual < 20) {
      nivelBase = 5; // Hora de cena - concentración reducida
      factoresDistraccion.push('Hora de cena');
    } else if (horaActual >= 20 && horaActual < 22) {
      nivelBase = 7; // Noche - concentración moderada
    } else {
      nivelBase = 3; // Muy tarde/muy temprano
      factoresDistraccion.push('Hora inadecuada para estudio');
    }
    
    // Factores por día de la semana
    if (diaSemana === 'lunes') {
      nivelBase -= 1;
      factoresDistraccion.push('Síndrome del lunes');
    } else if (diaSemana === 'viernes') {
      nivelBase -= 2;
      factoresDistraccion.push('Expectativa del fin de semana');
    } else if (diaSemana === 'sábado' || diaSemana === 'domingo') {
      nivelBase -= 1;
      factoresDistraccion.push('Fin de semana - modo relajado');
    }
    
    // Asegurar que el nivel esté entre 1 y 10
    const nivelFinal = Math.max(1, Math.min(10, nivelBase));
    
    let estado: string;
    let recomendacion: string;
    
    if (nivelFinal >= 8) {
      estado = 'Excelente';
      recomendacion = 'Momento ideal para tareas complejas y aprendizaje de conceptos nuevos';
    } else if (nivelFinal >= 6) {
      estado = 'Bueno';
      recomendacion = 'Buen momento para estudio y trabajo en proyectos';
    } else if (nivelFinal >= 4) {
      estado = 'Regular';
      recomendacion = 'Mejor para tareas rutinarias y repaso de material conocido';
    } else {
      estado = 'Bajo';
      recomendacion = 'Momento de descanso o actividades ligeras';
    }
    
    return {
      nivel: nivelFinal,
      estado,
      factores_distraccion: factoresDistraccion,
      recomendacion,
      momento_optimo: 'Entre 6:00-10:00 AM y 16:00-18:00 PM'
    };
  }

  /**
   * Endpoint para consultar recordatorios y tareas
   */
  @Get('recordatorios')
  getRecordatorios(@Query('categoria') categoria?: string) {
    const todosLosRecordatorios = [
      {
        id: 1,
        titulo: 'Entrega Taller API Personal',
        descripcion: 'Completar implementación y documentación del taller 3',
        prioridad: 'alta',
        fecha_limite: '2025-07-30T23:59:00',
        categoria: 'académico'
      },
      {
        id: 2,
        titulo: 'Revisar commits del proyecto',
        descripcion: 'Hacer retrospectiva semanal del repositorio Git',
        prioridad: 'media',
        fecha_limite: '2025-08-01T18:00:00',
        categoria: 'académico'
      },
      {
        id: 3,
        titulo: 'Estudiar para examen de Construcción de Software',
        descripcion: 'Repasar submódulos, librerías y APIs',
        prioridad: 'alta',
        fecha_limite: '2025-08-05T08:00:00',
        categoria: 'académico'
      },
      {
        id: 4,
        titulo: 'Actualizar librería personal de funciones',
        descripcion: 'Documentar nuevas funciones reutilizables aprendidas',
        prioridad: 'baja',
        fecha_limite: '2025-08-03T20:00:00',
        categoria: 'personal'
      },
      {
        id: 5,
        titulo: 'Llamar a mi ex',
        descripcion: 'Llamar a mi ex para arreglar las cosas :\')',
        prioridad: 'media',
        fecha_limite: '2025-07-31T19:00:00',
        categoria: 'personal'
      }
    ];
    
    // Filtrar por categoría si se proporciona
    let recordatorios = categoria 
      ? todosLosRecordatorios.filter(r => r.categoria === categoria)
      : todosLosRecordatorios;
        
    return {
      recordatorios,
      completados_hoy: 2, // Simulado
      total_pendientes: recordatorios.length
    };
  }
}
