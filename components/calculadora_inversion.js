export default class CalculadoraInversion {
  constructor() {
    // Definimos tasas anuales según el plazo y rango de monto
    this.tasas = {
      "30": [
        { min: 1000, max: 5000, tasa: 0.90 },
        { min: 5001, max: 10000, tasa: 1.10 },
        { min: 10001, max: 25000, tasa: 2.50 },
        { min: 25001, max: 50000, tasa: 2.70 },
        { min: 50001, max: 100000, tasa: 2.90 },
        { min: 100001, max: 150000, tasa: 4.50 },
        { min: 150001, max: 200000, tasa: 4.70 },
        { min: 200001, max: 400000, tasa: 5.20 },
        { min: 400001, max: 600000, tasa: 5.40 },
        { min: 600001, max: 1000000, tasa: 5.60 },
      ],
      "60": [
        { min: 1000, max: 5000, tasa: 1.10 },
        { min: 5001, max: 10000, tasa: 1.30 },
        { min: 10001, max: 25000, tasa: 2.70 },
        { min: 25001, max: 50000, tasa: 2.90 },
        { min: 50001, max: 100000, tasa: 3.10 },
        { min: 100001, max: 150000, tasa: 4.70 },
        { min: 150001, max: 200000, tasa: 4.90 },
        { min: 200001, max: 400000, tasa: 5.40 },
        { min: 400001, max: 600000, tasa: 5.60 },
        { min: 600001, max: 1000000, tasa: 5.80 },
      ],
      "90": [
        { min: 1000, max: 5000, tasa: 1.40 },
        { min: 5001, max: 10000, tasa: 1.60 },
        { min: 10001, max: 25000, tasa: 3.00 },
        { min: 25001, max: 50000, tasa: 3.20 },
        { min: 50001, max: 100000, tasa: 3.40 },
        { min: 100001, max: 150000, tasa: 5.00 },
        { min: 150001, max: 200000, tasa: 5.20 },
        { min: 200001, max: 400000, tasa: 5.70 },
        { min: 400001, max: 600000, tasa: 5.90 },
        { min: 600001, max: 1000000, tasa: 6.10 },
      ],
      "120": [
        { min: 1000, max: 5000, tasa: 1.93 },
        { min: 5001, max: 10000, tasa: 2.10 },
        { min: 10001, max: 25000, tasa: 3.50 },
        { min: 25001, max: 50000, tasa: 3.70 },
        { min: 50001, max: 100000, tasa: 3.90 },
        { min: 100001, max: 150000, tasa: 5.50 },
        { min: 150001, max: 200000, tasa: 5.70 },
        { min: 200001, max: 400000, tasa: 6.20 },
        { min: 400001, max: 600000, tasa: 6.40 },
        { min: 600001, max: 1000000, tasa: 6.60 },
      ],
      "180": [
        { min: 1000, max: 5000, tasa: 2.23 },
        { min: 5001, max: 10000, tasa: 2.40 },
        { min: 10001, max: 25000, tasa: 3.80 },
        { min: 25001, max: 50000, tasa: 4.00 },
        { min: 50001, max: 100000, tasa: 4.20 },
        { min: 100001, max: 150000, tasa: 6.00 },
        { min: 150001, max: 200000, tasa: 6.20 },
        { min: 200001, max: 400000, tasa: 6.70 },
        { min: 400001, max: 600000, tasa: 6.90 },
        { min: 600001, max: 1000000, tasa: 7.10 },
      ],
      "270": [
        { min: 1000, max: 5000, tasa: 2.53 },
        { min: 5001, max: 10000, tasa: 2.70 },
        { min: 10001, max: 25000, tasa: 4.10 },
        { min: 25001, max: 50000, tasa: 4.30 },
        { min: 50001, max: 100000, tasa: 4.70 },
        { min: 100001, max: 150000, tasa: 6.50 },
        { min: 150001, max: 200000, tasa: 6.70 },
        { min: 200001, max: 400000, tasa: 7.20 },
        { min: 400001, max: 600000, tasa: 7.40 },
        { min: 600001, max: 1000000, tasa: 7.60 },
      ],
      "360": [
        { min: 1000, max: 5000, tasa: 2.83 },
        { min: 5001, max: 10000, tasa: 3.00 },
        { min: 10001, max: 25000, tasa: 4.40 },
        { min: 25001, max: 50000, tasa: 4.60 },
        { min: 50001, max: 100000, tasa: 5.00 },
        { min: 100001, max: 150000, tasa: 7.00 },
        { min: 150001, max: 200000, tasa: 7.20 },
        { min: 200001, max: 400000, tasa: 7.70 },
        { min: 400001, max: 600000, tasa: 7.90 },
        { min: 600001, max: 1000000, tasa: 8.10 },
      ],
    };
  }

  calcular(plazo, montoUsuario) {
    if (!plazo || !montoUsuario) {
      return { error: "Faltan datos para calcular la inversión" };
    }

    // Convertimos plazo a string para usar como key en tasas
    const plazoStr = String(plazo);
    const rangoTasas = this.tasas[plazoStr];
    if (!rangoTasas) return { error: "Plazo no válido" };

    // Buscamos la tasa según el monto
    const tasaObj = rangoTasas.find(r => montoUsuario >= r.min && montoUsuario <= r.max);
    if (!tasaObj) return { error: "Monto fuera de los rangos permitidos" };

    const tasaAnual = tasaObj.tasa;

    const interes = montoUsuario * plazo * ((tasaAnual / 100) / 360);

    let isr = 0;
    const UMA = 206367.60;
    if (montoUsuario > UMA) {
      const diferencia = montoUsuario - UMA;
      const valorTasa = diferencia * 0.005; 
      const valorDia = valorTasa / 360;
      isr = valorDia * plazo;
    }

    // Total a recibir
    const total = montoUsuario + interes - isr;

    return {
      monto: montoUsuario,
      plazo,
      interes: interes.toFixed(2),
      isr: isr.toFixed(2),
      total: total.toFixed(2),
      tasaAnual
    };
  }
}



