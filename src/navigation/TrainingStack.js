import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importamos las vistas que definimos en el plan
import TrainingDashboard from '../screens/TrainingDashboard';
import RoutineConfig from '../screens/RoutineConfig';
import ExerciseEditor from '../screens/ExercisedEditor';

const Stack = createStackNavigator();

export default function TrainingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* La primera pantalla que verá el usuario */}
      <Stack.Screen name="Dashboard" component={TrainingDashboard} />
      
      {/* Pantalla para elegir bloques o libre */}
      <Stack.Screen name="RoutineConfig" component={RoutineConfig} />
      
      {/* Pantalla para anotar series y reps */}
      <Stack.Screen name="ExerciseEditor" component={ExerciseEditor} />
    </Stack.Navigator>
  );
}