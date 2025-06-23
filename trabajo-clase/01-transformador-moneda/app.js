document.addEventListener('DOMContentLoaded', () => {
  const valorInput = document.getElementById('valor');
  const monedaOrigen = document.getElementById('monedaOrigen');
  const monedaConvertida = document.getElementById('monedaConvertida');
  const elementoResultado = document.getElementById('resultado');
  const botonConvertir = document.getElementById('botonConvertir');

  const MONEDAS = ['USD', 'EUR', 'GBP', 'JPY', 'BRL', 'MXN'];

  const TASAS_DE_CAMBIO = {
    USD: { EUR: 0.92, GBP: 0.78, JPY: 157.65, BRL: 5.45, MXN: 18.29 },
    EUR: { USD: 1.09, GBP: 0.85, JPY: 171.32, BRL: 5.92, MXN: 19.88 },
    GBP: { USD: 1.28, EUR: 1.18, JPY: 201.23, BRL: 6.93, MXN: 22.03 },
    JPY: { USD: 0.0063, EUR: 0.0058, GBP: 0.005, BRL: 0.034, MXN: 0.11 },
    BRL: { USD: 0.18, EUR: 0.17, GBP: 0.14, JPY: 29.55, MXN: 3.18 },
    MXN: { USD: 0.055, EUR: 0.05, GBP: 0.045, JPY: 9.28, BRL: 0.31 },
  };

  function seleccionDeMoneda() {
    MONEDAS.forEach(currency => {
      const opcionOrigen = document.createElement('option');
      const opcionConvertida = document.createElement('option');

      opcionOrigen.value = opcionConvertida.value = currency;
      opcionOrigen.textContent = opcionConvertida.textContent = currency;

      monedaOrigen.appendChild(opcionOrigen);
      monedaConvertida.appendChild(opcionConvertida);
    });

    monedaOrigen.value = 'USD';
    monedaConvertida.value = 'EUR';
  }

  function mostrarResultado(monto, tasa, moneda) {
    const resultado = monto * tasa;
    elementoResultado.textContent = `${monto} equivale a ${resultado.toFixed(2)} ${moneda}`;
  }

  function manejarConversion() {
    const monto = parseFloat(valorInput.value);
    if (isNaN(monto) || monto <= 0) {
      elementoResultado.textContent = 'Ingrese una cantidad válida';
      return;
    }

    const base = monedaOrigen.value;
    const objetivo = monedaConvertida.value;

    if (base === objetivo) {
      mostrarResultado(monto, 1, objetivo);
      return;
    }

    const tasa = TASAS_DE_CAMBIO[base]?.[objetivo];

    if (!tasa) {
      elementoResultado.textContent = 'Tasa de conversión no disponible';
      return;
    }

    mostrarResultado(monto, tasa, objetivo);
  }

  botonConvertir.addEventListener('click', manejarConversion);

  seleccionDeMoneda();
});
