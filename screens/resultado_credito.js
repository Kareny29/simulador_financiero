import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function ResultadoCredito({ route, navigation }) {
  const {
    tipoCredito,
    monto,
    condicionPago,
    frecuenciaPago,
    cicloPago,
    plazo,
    fechaPrimerPago,
  } = route.params;

  // --- Ejemplo de cálculos básicos (ajústalos según tu lógica) ---
  const tasaInteres = 0.15; // 15% anual, ejemplo
  const interesTotal = monto * tasaInteres * (plazo / 12);
  const totalPagar = monto + interesTotal;
  const pagoMensual =
    condicionPago === "Pagos periódicos" ? totalPagar / plazo : totalPagar;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resultados de tu solicitud</Text>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>Detalle del crédito</Text>

        <View style={styles.row}>
          <Text>Tipo de Crédito:</Text>
          <Text style={styles.green}>{tipoCredito}</Text>
        </View>

        <View style={styles.row}>
          <Text>Monto solicitado:</Text>
          <Text style={styles.green}>${monto.toLocaleString()}</Text>
        </View>

        <View style={styles.row}>
          <Text>Condición de Pago:</Text>
          <Text style={styles.green}>{condicionPago}</Text>
        </View>

        <View style={styles.row}>
          <Text>Plazo en meses:</Text>
          <Text style={styles.green}>{plazo} meses</Text>
        </View>

        <View style={styles.row}>
          <Text>Interés total:</Text>
          <Text style={styles.green}>${interesTotal.toFixed(2)}</Text>
        </View>

        <View style={styles.row}>
          <Text>Pago {condicionPago === "Pagos periódicos" ? "mensual" : "único"}:</Text>
          <Text style={styles.green}>${pagoMensual.toFixed(2)}</Text>
        </View>

        {/* TOTAL */}
        <View style={styles.totalBox}>
          <Text style={styles.totalText}>
            Total a pagar: ${totalPagar.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* BOTÓN */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#e9f9ec",
    padding: 20,
    borderRadius: 15,
    width: "90%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0a801f",
    textAlign: "center",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  green: {
    color: "#0a801f",
    fontWeight: "bold",
  },
  red: {
    color: "red",
    fontWeight: "bold",
  },
  totalBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#0a801f",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0a801f",
  },
  button: {
    marginTop: 25,
    backgroundColor: "#0a801f",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

