export const CREDITOS = {
  unico: {
    nombre: "CREDI-UNICO",
    importe: { min: 5000, max: 60000 },
    tasaInteresAnual: 0.48,
    frecuencias: ["SEMANAL", "QUINCENAL", "MENSUAL", "CÍCLICO"],
    condicionesPago: {
      unico: [
        {
          condicion: (monto) => monto === 5000,
          plazos: { min: 2, max: 8 },
        },
        {
          condicion: () => true,
          plazos: { min: 2, max: 12 },
        },
      ],
      periodicos: [
        {
          condicion: (monto) => monto === 5000,
          plazos: { min: 2, max: 8 },
        },
        {
          condicion: () => true,
          plazos: { min: 2, max: 48 },
        },
      ],
    },
  },

  impulso: {
    nombre: "CREDI-IMPULSO",
    importe: { min: 10000, max: 100000 },
    tasaInteresAnual: 0.42,
    frecuencias: ["SEMANAL", "QUINCENAL", "MENSUAL", "CÍCLICO"],
    condicionesPago: {
      unico: [
        {
          condicion: () => true,
          plazos: { min: 4, max: 8 }, 
        },
      ],
      periodicos: [
        {
          condicion: () => true,
          plazos: { min: 4, max: 36 },
        },
      ],
    },
  },

  premium: {
    nombre: "CREDI-PREMIUM",
    importe: { min: 20000, max: 300000 },
    tasaInteresAnual: 0.24,
    frecuencias: ["SEMANAL", "QUINCENAL", "MENSUAL", "CÍCLICO"],
    condicionesPago: {
      unico: [
        {
          condicion: () => true,
          plazos: { min: 6, max: 8 }, 
        },
      ],
      periodicos: [
        {
          condicion: () => true,
          plazos: { min: 6, max: 58 },
        },
      ],
    },
  },

  plus: {
    nombre: "CREDI-PLUS",
    importe: { min: 61000, max: 400000 },
    tasaInteresAnual: 0.36,
    frecuencias: ["QUINCENAL", "MENSUAL", "CÍCLICO"],
    condicionesPago: {
      unico: [
        { condicion: () => true, plazos: { min: 6, max: 58 } },
      ],
      periodicos: [
        { condicion: () => true, plazos: { min: 6, max: 58 } },
      ],
    },
  },

  autoMejora: {
    nombre: "AUTO-MEJORA",
    importe: { min: 20000, max: 500000 },
    tasaInteresAnual: 0.30,
    frecuencias: ["SEMANAL", "QUINCENAL", "MENSUAL", "CÍCLICO"],
    condicionesPago: {
      periodicos: [
        { condicion: () => true, plazos: { min: 6, max: 58 } },
      ],
    },
  },
  
  ganadero: {
    nombre: "GANADERO",
    importe: { min: 60000, max: 300000 },
    tasaInteresAnual: 0.26,
    frecuencias: ["MENSUAL", "CÍCLICO"],
    condicionesPago: {
      unico: [
        { condicion: () => true, plazosFijos: [6, 8, 10, 12] },
      ],
      periodicos: [
        { condicion: () => true, plazos: { min: 6, max: 48 } },
      ],
    },
  },
  
  facil: {
    nombre: "CRÉDITO FÁCIL",
    importe: { min: 2000, max: 40000 },
    tasaInteresAnual: 0.24,
    frecuencias: ["QUINCENAL", "MENSUAL", "CÍCLICO"],
    condicionesPago: {
      unico: [
        {
        condicion: (monto) => monto <= 10000,
        plazos: { min: 2, max: 10 }, // en meses
        }
      ],
      periodicos: [
        {
        condicion: () => true,
        plazos: { min: 2, max: 30 },
        }
      ]
    },
  },

  mixto: {
  nombre: "MIXTO",
  importe: { min: 30000, max: 500000 },
  tasaInteresAnual: 0.20,
  condicionesPago: {
    unico: [
      {
        // Capital de trabajo con pago único
        condicion: (destino) => destino?.toLowerCase() === "capital de trabajo",
        plazos: { min: 6, max: 58 } // SOLO plazos, sin frecuencia
      }
    ],
    periodicos: [
      {
        // Servicio público
        condicion: (destino) => 
          destino?.toLowerCase() === "adquisición de bienes muebles para uso de servicio público",
        plazos: { min: 6, max: 58 },
        frecuencia: ["SEMANAL", "QUINCENAL"]
      },
      {
        // Herramienta de trabajo
        condicion: (destino) => 
          destino?.toLowerCase() === "adquisición de bienes muebles para herramienta de trabajo",
        plazos: { min: 6, max: 36 },
        frecuencia: ["SEMANAL", "QUINCENAL"]
      },
      {
        // Capital de trabajo (pagos periódicos)
        condicion: (destino) => destino?.toLowerCase() === "capital de trabajo",
        plazos: { min: 6, max: 58 },
        frecuencia: ["MENSUAL", "CÍCLICO"]
      }
    ]
  }
},

  confianza: {
    nombre: "CREDITO DE CONFIANZA",
    importe: { min: "Sin minimo", max: 80000 },
    plazos: { min: 0, maxDias: 360 },
    tasaInteresAnual: 0.18,
    frecuencias: [], // no aplica
    //condicionesPago: {unico}
  },

};
