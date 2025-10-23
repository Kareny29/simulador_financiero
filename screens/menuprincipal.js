import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Logo EIZ.png")} style={styles.logo} />

      <Text style={styles.title}>Bienvenido a la COOPERATIVA EIZ</Text>
      <Text style={styles.subtitle}>Selecciona una opción del menú:</Text>

      {/* Botón personalizado Pantalla 1 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SimuladorCredito")}
      >
        <Image
          source={require("../../assets/credito.png")} // tu imagen aquí
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Simulador de Credito</Text>
      </TouchableOpacity>

      {/* Botón personalizado Pantalla 2 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SimuladorInversion")}
      >
        <Image
          source={require("../../assets/inversion.png")} // tu imagen aquí
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Simulador de Inversión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 100,
    height: 120,
    marginBottom: 30,
    
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: "#666",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#29C809",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginVertical: 10,
    width: 200,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
   icon: {
    width: 35, // tamaño del icono
    height: 35,
    marginRight: 10, // separa imagen del texto
    resizeMode: "contain",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});


