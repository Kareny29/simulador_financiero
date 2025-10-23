import React, { useState } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, 
  UIManager, LayoutAnimation, Platform, 
  ScrollView, Alert 
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons"; 
import { CREDITOS } from "../components/creditos";

// Habilitar animaciones en Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function PlazoCredito({ route, navigation }) {
  const { tipoCredito, monto, destinoGeneral, destino } = route.params;

  // Estados
  const [frecuenciaPago, setFrecuenciaPago] = useState("");
  const [plazo, setPlazo] = useState("");
  const [condicionPago, setCondicionPago] = useState("");
  const [fechaPrimerPago, setFechaPrimerPago] = useState(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [cicloPago, setCicloPago] = useState("");
  const [mostrarResumen, setMostrarResumen] = useState(false);

  // Función toggle con animación
  const toggleResumen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMostrarResumen(!mostrarResumen);
  };

  const formatDate = (date) => {
    if (!date) return "Selecciona una fecha";
    return date.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
  };

  const onChangeFecha = (event, selectedDate) => {
    setMostrarCalendario(Platform.OS === "ios");
    if (selectedDate) setFechaPrimerPago(selectedDate);
  };

  // 🔹 Adaptado para MIXTO y otros créditos
  const obtenerPlazos = () => {
    if (!tipoCredito || !condicionPago) return [];
    const creditoSeleccionado = CREDITOS[tipoCredito];
    if (!creditoSeleccionado?.condicionesPago) return [];

    const tipoCondicion = condicionPago === "Pago único" ? "unico" : "periodicos";
    const condiciones = creditoSeleccionado.condicionesPago[tipoCondicion];
    if (!condiciones) return [];

    const montoNum = parseFloat(monto) || 0;

    for (let c of condiciones) {
      // MIXTO valida por destino
      if (creditoSeleccionado.nombre === "MIXTO") {
        if (c.condicion(destino)) {
          if (c.plazos) {
            const { min, max } = c.plazos;
            return Array.from({ length: max - min + 1 }, (_, i) => min + i);
          } else if (c.plazosFijos) {
            return c.plazosFijos;
          }
        }
      } else {
        // Resto de créditos valida por monto
        if (c.condicion(montoNum)) {
          if (c.plazos) {
            const { min, max } = c.plazos;
            return Array.from({ length: max - min + 1 }, (_, i) => min + i);
          } else if (c.plazosFijos) {
            return c.plazosFijos;
          }
        }
      }
    }
    return [];
  };

  const obtenerFrecuencias = () => {
    if (!tipoCredito || !condicionPago) return [];
    const creditoSeleccionado = CREDITOS[tipoCredito];

    // MIXTO → depende del destino
    if (creditoSeleccionado.nombre === "MIXTO") {
      const tipoCondicion = condicionPago === "Pago único" ? "unico" : "periodicos";
      const condiciones = creditoSeleccionado.condicionesPago[tipoCondicion];
      if (!condiciones) return [];

      for (let c of condiciones) {
        if (c.condicion(destino) && c.frecuencia) {
          return c.frecuencia;
        }
      }
      return [];
    }

    // Resto de créditos
    if (condicionPago === "Pago único") {
      const condiciones = creditoSeleccionado.condicionesPago?.unico;
      if (condiciones?.[0]?.frecuencias) {
        return condiciones[0].frecuencias;
      }
    }
    return creditoSeleccionado.frecuencias || [];
  };

  const handleCalcular = () => {
    const creditoSeleccionado = CREDITOS[tipoCredito];
    const montoNum = parseFloat(monto);

    if (!condicionPago) return Alert.alert("Error", "Debes seleccionar una condición de pago.");
    if (creditoSeleccionado.nombre === "CRÉDITO FÁCIL" && condicionPago === "Pago único" && montoNum > 10000) {
      return Alert.alert("Condición inválida", "En CRÉDITO FÁCIL, con PAGO ÚNICO el monto no puede ser mayor a $10,000.");
    }
    if (condicionPago === "Pagos periódicos" && !frecuenciaPago) {
      return Alert.alert("Error", "Debes seleccionar una frecuencia de pago.");
    }
    if (frecuenciaPago === 'CÍCLICO' && !cicloPago) {
      return Alert.alert("Error", "Debes seleccionar la periodicidad del pago cíclico.");
    }
    if (!plazo || !fechaPrimerPago) {
      return Alert.alert("Error", "Debes completar todos los campos.");
    }

    navigation.navigate("ResultadoCredito", {
      tipoCredito,
      monto: montoNum,
      destino, // 👈 también enviamos destino al resultado
      condicionPago,
      frecuenciaPago,
      cicloPago,
      plazo,
      fechaPrimerPago: fechaPrimerPago.toISOString()
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* --- BOTÓN PARA MOSTRAR/OCULTAR RESUMEN --- */}
      <TouchableOpacity style={styles.toggleButton} onPress={toggleResumen}>
        <Ionicons 
          name={mostrarResumen ? "eye-off-outline" : "eye-outline"} 
          size={20} 
          color="#fff" 
          style={{ marginRight: 8 }} 
        />
        <Text style={styles.toggleButtonText}>
          {mostrarResumen ? "Ocultar resumen de la solicitud" : "Mostrar resumen de la solicitud"}
        </Text>
      </TouchableOpacity>

      {/* --- RESUMEN SOLO SI mostrarResumen === true --- */}
      {mostrarResumen && (
        <View style={styles.summaryBox}>
          <View style={styles.summaryHeader}>
              <Ionicons name="document-text-outline" size={22} color="#2e7d32" style={{ marginRight: 8 }} />
               <Text style={styles.summaryTitle}>Resumen de tu solicitud</Text>
            </View>
            <Text style={styles.summaryText}>
                <Text style={styles.summaryLabel}>Crédito: </Text>{CREDITOS[tipoCredito].nombre}
                </Text>
                <Text style={styles.summaryText}>
                  <Text style={styles.summaryLabel}>Monto: </Text>${parseFloat(monto).toLocaleString()}
                  </Text>
                  {/* ✅ Mostrar destino general si existe */}
                  {destinoGeneral ? (
                    <Text style={styles.summaryText}>
                      <Text style={styles.summaryLabel}>Destino general: </Text>
                      {destinoGeneral.charAt(0).toUpperCase() + destinoGeneral.slice(1)}
                      </Text>
                    ) : null}
                    {/* ✅ Mostrar destino específico */}
                    {destino ? (
                      <Text style={styles.summaryText}>
                        <Text style={styles.summaryLabel}>Destino específico: </Text>{destino}
                        </Text>
                      ) : null}
                      </View>
                    )}


      {/* --- FORMULARIO PRINCIPAL --- */}
<View style={styles.card}>
  <Text style={styles.label}>Condición de pago:</Text>
  <View style={styles.pickerContainer}>
    <Picker selectedValue={condicionPago} onValueChange={setCondicionPago}>
      <Picker.Item label="Selecciona una condición" value="" />

      {/* Mostrar PAGO ÚNICO solo si aplica */}
      {CREDITOS[tipoCredito]?.condicionesPago?.unico &&
        !(tipoCredito === "mixto" && 
          (destino === "adquisición de bienes muebles para uso de servicio público" || 
           destino === "adquisición de bienes muebles para herramienta de trabajo")
        ) && (
          <Picker.Item label="PAGO ÚNICO" value="Pago único" />
      )}

      {/* Mostrar PAGOS PERIÓDICOS si aplica */}
      {CREDITOS[tipoCredito]?.condicionesPago?.periodicos && (
        <Picker.Item label="PAGOS PERIÓDICOS" value="Pagos periódicos" />
      )}
    </Picker>
  </View>

        <Text style={styles.label}>Plazo de vencimiento en meses:</Text>
        <View style={styles.pickerContainer}>
          <Picker enabled={!!condicionPago} selectedValue={plazo} onValueChange={setPlazo}>
            <Picker.Item label="Selecciona un plazo" value="" />
            {obtenerPlazos().map((p) => (
              <Picker.Item key={p} label={`${p} meses`} value={p.toString()} />
            ))}
          </Picker>
        </View>

        {condicionPago === "Pagos periódicos" && (
          <>
            <Text style={styles.label}>Frecuencia de pago:</Text>
            <View style={styles.pickerContainer}>
              <Picker selectedValue={frecuenciaPago} onValueChange={setFrecuenciaPago}>
                <Picker.Item label="Selecciona una frecuencia" value="" />
                {obtenerFrecuencias().map((f) => (
                  <Picker.Item key={f} label={f} value={f} />
                ))}
              </Picker>
            </View>

            {frecuenciaPago === "CÍCLICO" && (
              <>
                <Text style={styles.label}>Periodicidad del pago:</Text>
                <View style={styles.pickerContainer}>
                  <Picker selectedValue={cicloPago} onValueChange={setCicloPago}>
                    <Picker.Item label="Selecciona una periodicidad" value="" />
                    <Picker.Item label="2 meses" value="2 meses" />
                    <Picker.Item label="3 meses" value="3 meses" />
                    <Picker.Item label="4 meses" value="4 meses" />
                    <Picker.Item label="5 meses" value="5 meses" />
                    <Picker.Item label="6 meses" value="6 meses" />
                    <Picker.Item label="8 meses" value="8 meses" />
                    <Picker.Item label="10 meses" value="10 meses" />
                    <Picker.Item label="12 meses" value="12 meses" />
                  </Picker>
                </View>
              </>
            )}
          </>
        )}

        <Text style={styles.label}>Fecha de entrega:</Text>
        <TouchableOpacity style={styles.input} onPress={() => setMostrarCalendario(true)}>
          <Text style={{ color: fechaPrimerPago ? '#000' : '#9e9e9e' }}>{formatDate(fechaPrimerPago)}</Text>
        </TouchableOpacity>

        {mostrarCalendario && (
          <DateTimePicker
            value={fechaPrimerPago || new Date()}
            mode="date"
            display="spinner"
            onChange={onChangeFecha}
          />
        )}

        <TouchableOpacity style={styles.buttonPrimary} onPress={handleCalcular}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonTextSecondary}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#f7f8fa', justifyContent: 'center', alignItems: 'center', padding: 20 },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2e7d32",
    padding: 12,
    borderRadius: 25,
    justifyContent: "center",
    marginBottom: 15,
  },
  toggleButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  summaryBox: { 
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  summaryHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', color: '#343a40', marginBottom: 10, textAlign: 'center' },
  summaryText: { fontSize: 15, color: '#495057', lineHeight: 22, textAlign: 'center' },
  summaryLabel: { fontWeight: '600' },
  card: { width: '100%', backgroundColor: '#ffffff', borderRadius: 20, padding: 25, alignItems: 'center', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 5 },
  label: { fontSize: 16, color: '#424242', marginBottom: 8, alignSelf: 'flex-start' },
  pickerContainer: { width: '100%', height: 50, borderWidth: 1.5, borderColor: '#a5d6a7', borderRadius: 25, justifyContent: 'center', marginBottom: 15 },
  input: { width: '100%', height: 50, borderWidth: 1.5, borderColor: '#a5d6a7', borderRadius: 25, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  buttonPrimary: { backgroundColor: '#2e7d32', width: '100%', paddingVertical: 15, borderRadius: 25, alignItems: 'center', marginBottom: 12 },
  buttonSecondary: { backgroundColor: '#c8e6c9', width: '100%', paddingVertical: 15, borderRadius: 25, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  buttonTextSecondary: { color: '#2e7d32', fontSize: 16, fontWeight: 'bold' },
});
