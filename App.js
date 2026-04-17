import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FocusScreen from './src/screens/FocusScreen';
import TrainingStack from './src/navigation/TrainingStack';
import './src/i18n'; // Asegúrate de que la configuración de i18n se cargue

const Tab = createBottomTabNavigator();
  
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Configuración de los iconos basada en la ruta
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Focus') {
              iconName = focused ? 'timer' : 'timer-outline';
            } else if (route.name === 'Training') {
              iconName = focused ? 'fitness' : 'fitness-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          // Estilizado Chic y Minimalista
          tabBarActiveTintColor: '#FFC1CC', // Tu rosa suave
          tabBarInactiveTintColor: '#8E8E93', // Gris neutro
          tabBarStyle: {
            backgroundColor: '#F9F9F9',
            borderTopWidth: 0, // Eliminamos la línea divisoria para un look más limpio
            elevation: 10, // Sombra para Android
            shadowOpacity: 0.1, // Sombra para iOS
            height: 90, // Un poco más alto para que respire
            paddingBottom: 30,
          },
          headerShown: false, // Ocultamos el header por defecto para usar el tuyo personalizado
        })}
      >
        <Tab.Screen name="Focus" component={FocusScreen} />
        <Tab.Screen 
          name="Training" 
          component={TrainingStack} // <-- Aquí conectamos el Stack
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
