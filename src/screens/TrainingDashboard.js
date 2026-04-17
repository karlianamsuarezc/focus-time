import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../theme/theme';
import TrainingCard from '../components/TrainingCard';

export default function TrainingDashboard({ navigation, route }) {
  const { t } = useTranslation();
  const [days, setDays] = useState([
    { id: '1', name: 'Día 1', type: 'Fuerza', subtitle: 'Strict Press' },
    { id: '2', name: 'Día 2', type: 'Fuerza', subtitle: 'Front Squat' },
    { id: '3', name: 'Día 3', type: 'Fuerza', subtitle: 'Bench Press' },
    { id: '4', name: 'Día 4', type: 'Rest Day', subtitle: '-' },
    { id: '5', name: 'Día 5', type: 'Fuerza', subtitle: 'Back Squat' },
  ]);

  // Escuchamos si regresamos de RoutineConfig con un día de descanso
  useEffect(() => {
    if (route.params?.updatedDay && route.params?.status === 'rest') {
      const updatedDays = days.map(d => {
        if (d.name === route.params.updatedDay || d.id === route.params.updatedDay) {
          return { ...d, isRest: true, type: 'Rest Day' };
        }
        return d;
      });
      setDays(updatedDays);
    }
  }, [route.params?.updatedDay, route.params?.status]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('training.dashboard_title')}</Text>
        <FlatList
  data={days}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TrainingCard 
      name={item.name}
      type={item.type}
      subtitle={item.subtitle}
      // PASO CLAVE: Pasamos el estado de descanso al componente que dibuja
      isRest={item.isRest || item.type === 'Rest Day'} 
      onPress={() => navigation.navigate('RoutineConfig', { 
        day: item.name, 
        dayId: item.id // Es mejor pasar el ID para la comparación en el useEffect
      })}
    />
  )}
  contentContainerStyle={styles.list}
  showsVerticalScrollIndicator={false}
/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1 },
  title: { 
    fontSize: 20, 
    fontWeight: '300', 
    letterSpacing: 2, 
    textAlign: 'center', 
    marginVertical: 20, 
    color: Colors.text 
  },
  list: { paddingHorizontal: 20, paddingBottom: 40 },
});