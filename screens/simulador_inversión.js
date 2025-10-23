import React, { useState } from "react"; 
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import CalculadoraInversion from "../components/calculadora_inversion";

export default function SimuladorInversion({ navigation }) {
  const [monto, setMonto] = useState("");
  const [montoUsuario, setMontoUsuario] = useState(""); 
  const [plazo, setPlazo] = useState("");
  const [error, setError] = useState("");

  const montos = [
    { label: "$1,000 - $5,000", value: "1000-5000" },
    { label: "$5,001 - $10,000", value: "5001-10000" },
    { label: "$10,001 - $25,000", value: "10001-25000" },
    { label: "$25,001 - $50,000", value: "25001-50000" },
    { label: "$50,001 - $100,000", value: "50001-100000" },
    { label: "$100,001 - $150,000", value: "100001-150000" },
    { label: "$150,001 - $200,000", value: "150001-200000" },
    { label: "$200,001 - $400,000", value: "200001-400000" },
    { label: "$400,001 - $600,000", value: "400001-600000" },
    { label: "$600,001 - $1,000,000", value: "600001-1000000" },

  ];

  const plazos = [30, 60, 90, 120, 180, 270, 360];

  const validarMonto = (valor) => {
    setMontoUsuario(valor);

    if (!monto) {
      setError("Primero selecciona un rango de inversión.");
      return;
    }

    const [min, max] = monto.split("-").map(Number);
    const montoNum = Number(valor);

    if (!valor) {
      setError("Ingresa un monto válido.");
    } else if (montoNum < min || montoNum > max) {
      setError(`El monto debe estar entre $${min} y $${max}.`);
    } else {
      setError("");
    }
  };

  const calcular = () => {
    const calc = new CalculadoraInversion();
    const resultado = calc.calcular(plazo, Number(montoUsuario));

    if (resultado.error) {
      setError(resultado.error);
      return;
    }

    navigation.navigate("ResultadosInversion", { resultado });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Simulador de Inversión</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Monto a invertir (rango):</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={monto}
              onValueChange={(itemValue) => {
                setMonto(itemValue);
                if (montoUsuario) validarMonto(montoUsuario);
              }}
            >
              <Picker.Item label="Selecciona un rango" value="" />
              {montos.map((m) => (
                <Picker.Item key={m.value} label={m.label} value={m.value} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Plazo en días:</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={plazo} onValueChange={(v) => setPlazo(v)}>
              <Picker.Item label="Selecciona un plazo" value="" />
              {plazos.map((p) => (
                <Picker.Item key={p} label={`${p} días`} value={p} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Ingresa el monto a invertir:</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe el monto"
            keyboardType="numeric"
            value={montoUsuario}
            onChangeText={validarMonto}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.button, !!error || !montoUsuario || !plazo ? styles.disabledButton : null]}
            disabled={!!error || !montoUsuario || !plazo}
            onPress={calcular}
          >
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: "#333",
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#28a745",
    borderRadius: 30,
    marginVertical: 10,
    textAlign: "center",
    backgroundColor: "#f9fff9",
    fontSize: 16,
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#28a745",
    borderRadius: 30,
    backgroundColor: "#fff",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#a5d6a7",
  },
  backButton: {
    backgroundColor: "#1c7c31",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    textAlign: "center",
  },
});

