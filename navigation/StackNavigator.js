import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuPrincipal from '../screens/menuprincipal';
import SimuladorCredito from '../screens/simulador_credito';
import PlazoCredito from '../screens/seleccionar_plazoCredito';
import SimuladorInversion from '../screens/simulador_inversión';
import ResultadosInversion from '../screens/resultados_inversion';
import ResultadoCredito from '../screens/resultado_credito';
const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Home" 
      screenOptions={{ headerShown: false }} // Oculta el header en todas las pantallas
    >
      <Stack.Screen name="Home" component={MenuPrincipal} />
      {/* --- Flujo del Simulador de Crédito --- */}
      <Stack.Screen name="SimuladorCredito" component={SimuladorCredito} /> 
      <Stack.Screen name="PlazoCredito" component={PlazoCredito} /> 
      <Stack.Screen name="ResultadoCredito" component={ResultadoCredito} />

      {/* --- Flujo del Simulador de Inversión --- */}
      <Stack.Screen name="SimuladorInversion" component={SimuladorInversion} />
      <Stack.Screen name="ResultadosInversion" component={ResultadosInversion} /> 
    </Stack.Navigator>
  );
}

