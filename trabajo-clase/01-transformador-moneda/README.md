# Transformador de Monedas

La siguiente actividad en clase es una aplicación web para convertir entre distintas monedas.

## Conceptos aplicados de Clean Code

Este proyecto implementa buenas prácticas recomendadas por el repositorio `clean-code-javascript-es`.

### `app.js`

- **Nombres descriptivos**: Las funciones y variables utilizan nombres claros y concisos (`manejarConversion`, `mostrarResultado`, `seleccionDeMoneda`).
- **Funciones puras y con única responsabilidad**:
  - `mostrarResultado` se encarga solo de mostrar el resultado.
  - `manejarConversion` se encarga de coordinar la conversión.
- **Evita efectos colaterales innecesarios**.
- **Condicionales claros**: validaciones explícitas para entrada inválida.
- **Constantes bien nombradas**: `TASA_DE_CAMBIO` y `MONEDAS`.

### `style.css`

- **Separación de responsabilidades**: El estilo está aislado del comportamiento.
- **Diseño limpio**: Colores verdes suaves, esquinas redondeadas, y botones accesibles.

### `index.html`

- **Estructura semántica**: Uso correcto de etiquetas (`main`, `label`, `button`).
- **Accesibilidad**: Formularios bien etiquetados.
