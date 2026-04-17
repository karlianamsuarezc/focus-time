import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../theme/theme';
import TrainingCard from '../components/TrainingCard';

// En un proyecto real, DAYS vendría de un Hook o un Context
const DAYS = [
  { id: '1', name: 'Día 1', type: 'Fuerza', subtitle: 'Strict Press' },
  { id: '2', name: 'Día 2', type: 'Fuerza', subtitle: 'Front Squat' },
  { id: '3', name: 'Día 3', type: 'Fuerza', subtitle: 'Bench Press' },
  { id: '4', name: 'Día 4', type: 'Rest Day', subtitle: '-' },
  { id: '5', name: 'Día 5', type: 'Fuerza', subtitle: 'Back Squat' },
];

export default function TrainingDashboard({ navigation }) {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('training.dashboard_title')}</Text>
        <FlatList
          data={DAYS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TrainingCard 
              name={item.name}
              type={item.type}
              subtitle={item.subtitle}
              onPress={() => navigation.navigate('RoutineConfig', { day: item.name })}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}/>
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