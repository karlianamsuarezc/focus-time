import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../theme/theme';
import SelectableBlock from '../components/SelectableBlock';

export default function RoutineConfig({ navigation, route }) {
  const { t } = useTranslation();
  const { dayId } = route.params;
  
  const [blocks, setBlocks] = useState({
    strength: false,
    gym: false,
    cardio: false,
    isRestDay: false,
  });

  const handleNext = () => {
    if (blocks.isRestDay) {
      // Si es descanso, volvemos al dashboard avisando el cambio
      // En una app real aquí guardarías en AsyncStorage
      navigation.navigate('Dashboard', { 
      updatedDay: dayId, // o 'day' si usas el nombre
      status: 'rest' 
    });
    } else {
      // Pasamos solo lo que se seleccionó
      navigation.navigate('ExerciseEditor', { 
        selectedBlocks: blocks,
        dayId: dayId 
      });
    }
  };

  const toggleBlock = (key) => {
    setBlocks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('routine.title')}</Text>
        
        <SelectableBlock 
          label={t('training.weightlifting')} 
          isActive={blocks.strength} 
          onPress={() => toggleBlock('strength')} 
        />

        <SelectableBlock 
          label={t('training.gym')} 
          isActive={blocks.gym} 
          onPress={() => toggleBlock('gym')} 
        />

        <SelectableBlock 
          label={t('training.cardio')} 
          isActive={blocks.cardio} 
          onPress={() => toggleBlock('cardio')} 
        />

        <SelectableBlock 
          label={t('training.rest_day_option')} 
          isActive={blocks.isRestDay} 
          onPress={() => setBlocks({ strength: false, gym: false, cardio: false, isRestDay: !blocks.isRestDay })} 
        />

        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextText}>{t('routine.next_routine')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { padding: 20 },
  title: { 
    fontSize: 24, 
    fontWeight: '300', 
    color: Colors.text, 
    marginBottom: 30, 
    marginTop: 20,
    letterSpacing: 1 
  },
  nextButton: { 
    marginTop: 40, 
    backgroundColor: Colors.text, // Un negro/gris oscuro para contraste
    padding: 18, 
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5
  },
  nextText: { 
    color: Colors.white, 
    textAlign: 'center', 
    fontWeight: 'bold', 
    letterSpacing: 1 
  }
});