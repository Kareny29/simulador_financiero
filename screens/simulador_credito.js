import React, { useState } from "react"; 
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { CREDITOS } from "../components/creditos";

export default function SimuladorCredito({ navigation }) {
  const [tipoCredito, setTipoCredito] = useState("");
  const [monto, setMonto] = useState("");
  const [destinoGeneral, setDestinoGeneral] = useState(""); // 👈 Nuevo: Consumo / Comercial
  const [destinoEspecifico, setDestinoEspecifico] = useState(""); // 👈 Nuevo: destino final

  // --- Definir las actividades por tipo de destino ---
  const destinos = {
    consumo: [
      "Pagos de pasivo",
      "Trámites administrativos",
      "Gastos personales",
      "Construcción",
      "Adquisición de bienes inmuebles",
      "Adquisición de bienes muebles para uso personal"
    ],
    comercial: [
      "Capital de trabajo",
      "Inversión en el negocio",
      "Adquisición de bienes muebles para uso de servicio público",
      "Adquisición de bienes muebles para herramienta de trabajo",
      "Ganadería mixta"
    ]
  };

  // --- Tipos de crédito según destinos válidos ---
  const creditosConsumoYComercial = ["unico", "impulso", "premium", "plus"];
  const creditosSoloConsumo = ["autoMejora", "confianza", "facil"];
  const creditosSoloComercial = ["ganadero", "mixto"];

  const handleSiguiente = () => {
    if (!tipoCredito) {
      return Alert.alert("Error", "Debes seleccionar un tipo de crédito.");
    }

    const creditoSeleccionado = CREDITOS[tipoCredito];
    const montoNum = parseFloat(monto);

    if (isNaN(montoNum)) {
      return Alert.alert("Error", "Debes ingresar un monto válido.");
    }

    const { min, max } = creditoSeleccionado.importe;
    if (montoNum < min || montoNum > max) {
      return Alert.alert(
        "Monto inválido",
        `El monto para este crédito debe estar entre $${min.toLocaleString()} y $${max.toLocaleString()}.`
      );
    }

    // Validar destinos según tipo de crédito
    if (creditosSoloComercial.includes(tipoCredito)) {
      if (!destinoEspecifico) return Alert.alert("Error", "Debes seleccionar un destino comercial.");
    } else if (creditosSoloConsumo.includes(tipoCredito)) {
      if (!destinoEspecifico) return Alert.alert("Error", "Debes seleccionar un destino de consumo.");
    } else if (creditosConsumoYComercial.includes(tipoCredito)) {
      if (!destinoGeneral || !destinoEspecifico)
        return Alert.alert("Error", "Debes seleccionar destino general y específico.");
    }

    // Enviar datos a la siguiente pantalla
    navigation.navigate("PlazoCredito", {
      tipoCredito,
      monto,
      destinoGeneral,
      destino: destinoEspecifico
    });
  };

  // --- Determinar qué destinos mostrar según el tipo de crédito ---
  let opcionesDestinoGeneral = [];
  if (creditosConsumoYComercial.includes(tipoCredito)) {
    opcionesDestinoGeneral = ["consumo", "comercial"];
  } else if (creditosSoloConsumo.includes(tipoCredito)) {
    opcionesDestinoGeneral = ["consumo"];
  } else if (creditosSoloComercial.includes(tipoCredito)) {
    opcionesDestinoGeneral = ["comercial"];
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Simulador de Crédito</Text>

      <View style={styles.card}>
        {/* --- Picker de tipo de crédito --- */}
        <Text style={styles.label}>Tipo de crédito:</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={tipoCredito} onValueChange={(value) => {
            setTipoCredito(value);
            setDestinoGeneral("");
            setDestinoEspecifico("");
          }}>
            <Picker.Item label="Selecciona un tipo" value="" />
            {Object.entries(CREDITOS).map(([key, credito]) => (
              <Picker.Item key={key} label={credito.nombre} value={key} />
            ))}
          </Picker>
        </View>

        {/* --- Mostrar rango --- */}
        {tipoCredito ? (
          <Text style={styles.rangoMensaje}>
            Rango: ${CREDITOS[tipoCredito].importe.min.toLocaleString()} - ${CREDITOS[tipoCredito].importe.max.toLocaleString()}
          </Text>
        ) : null}

        {/* --- Picker de destino general --- */}
        {opcionesDestinoGeneral.length > 0 && (
          <>
            <Text style={styles.label}>Destino general:</Text>
            <View style={styles.pickerContainer}>
              <Picker selectedValue={destinoGeneral} onValueChange={(value) => {
                setDestinoGeneral(value);
                setDestinoEspecifico("");
              }}>
                <Picker.Item label="Selecciona destino general" value="" />
                {opcionesDestinoGeneral.map((d) => (
                  <Picker.Item
                    key={d}
                    label={d.charAt(0).toUpperCase() + d.slice(1)}
                    value={d}
                  />
                ))}
              </Picker>
            </View>
          </>
        )}

        {/* --- Picker de destino específico --- */}
        {destinoGeneral && (
          <>
            <Text style={styles.label}>Destino específico:</Text>
            <View style={styles.pickerContainer}>
              <Picker selectedValue={destinoEspecifico} onValueChange={setDestinoEspecifico}>
                <Picker.Item label="Selecciona un destino" value="" />
                {destinos[destinoGeneral].map((d) => (
                  <Picker.Item key={d} label={d} value={d.toLowerCase()} />
                ))}
              </Picker>
            </View>
          </>
        )}

        {/* --- Input monto --- */}
        <Text style={styles.label}>Ingresa el monto a solicitar:</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe el monto"
          placeholderTextColor="#9e9e9e"
          keyboardType="numeric"
          value={monto}
          onChangeText={setMonto}
        />

        {/* --- Botones --- */}
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSiguiente}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f8fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a2533',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  pickerContainer: {
    width: '100%',
    height: 50,
    borderWidth: 1.5,
    borderColor: '#a5d6a7',
    borderRadius: 25,
    justifyContent: 'center',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1.5,
    borderColor: '#a5d6a7',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  rangoMensaje: {
    fontSize: 15,
    color: '#dd0404ff',
    marginBottom: 15,
    alignSelf: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#1c7c31',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonSecondary: {
    backgroundColor: '#1c7c31',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fffcfcff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
