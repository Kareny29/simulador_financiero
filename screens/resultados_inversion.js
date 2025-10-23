import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ResultadosInversion({ route, navigation }) {
  const { resultado } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultados de la inversión</Text>

      <View style={styles.resultCard}>
        <Text style={styles.resultHeader}>Detalle de la inversión</Text>

        <View style={styles.resultRow}>
          <Text style={styles.label}>Monto de la inversión:</Text>
          <Text style={styles.value}>${resultado.monto}</Text>
        </View>

        <View style={styles.resultRow}>
          <Text style={styles.label}>Plazo seleccionado:</Text>
          <Text style={styles.value}>{resultado.plazo} días</Text>
        </View>

        <View style={styles.resultRow}>
          <Text style={styles.label}>Tasa Anual Fija:</Text>
          <Text style={styles.value}>{resultado.tasaAnual}%</Text>
        </View>
      
        <View style={styles.resultRow}>
          <Text style={styles.label}>Interés generado:</Text>
          <Text style={styles.value}>${resultado.interes}</Text>
        </View>

        <View style={styles.resultRow}>
          <Text style={styles.label}>ISR:</Text>
          <Text style={styles.isrValue}>${resultado.isr}</Text>
        </View>
      </View>

      {/* Caja destacada para el total */}
      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total a Pagar:</Text>
        <Text style={styles.totalValue}>${resultado.total}</Text>
      </View>
        
      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  resultCard: {
    width: "90%",
    backgroundColor: "#e0f7e9",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
  resultHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#1c7c31",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#a5d6a7",
    paddingBottom: 5,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#28a745",
  },
  isrValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "red", // 🔴 ISR en rojo
  },
  totalBox: {
    marginTop: 20,
    width: "90%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#28a745",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#28a745",
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 25,
    width: 200,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
  backButton: {
    backgroundColor: "#1c7c31",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});


