import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import ActionButton from '../components/ActionButton';
import { Colors, getBlockColor } from '../theme/theme';
import ExerciseRow from '../components/ExerciseRow';

export default function ExerciseEditor({ route, navigation }) {
  const { t } = useTranslation();
  const { day, selectedBlocks = {} } = route.params || {};// Extraemos todo del route
  
  // Estado local para los bloques activos en esta pantalla
  const [activeBlocks, setActiveBlocks] = useState([]);

  // Funciones de gestión de bloques (Lógica que luego moveremos a un Hook)
  const addBlock = (type) => {
    const newBlock = {
      id: Date.now().toString(),
      type: type, // 'fuerza', 'gym', 'cardio'
      title: '',
      exercises: []
    };
    setActiveBlocks([...activeBlocks, newBlock]);
  };

  const removeBlock = (id) => {
    setActiveBlocks(activeBlocks.filter(block => block.id !== id));
  };

  const addExercise = (blockId) => {
    setActiveBlocks(prev => prev.map(block => {
      if (block.id === blockId) {
        return {
          ...block,
          exercises: [...block.exercises, { id: Date.now().toString(), name: '', detail: '' }]
        };
      }
      return block;
    }));
  };

  const updateExercise = (blockId, exerciseId, field, value) => {
    setActiveBlocks(prev => prev.map(block => {
      if (block.id === blockId) {
        const newExercises = block.exercises.map(ex => 
          ex.id === exerciseId ? { ...ex, [field]: value } : ex
        );
        return { ...block, exercises: newExercises };
      }
      return block;
    }));
  };

  const updateBlockTitle = (blockId, text) => {
    setActiveBlocks(prevBlocks => 
      prevBlocks.map(block => {
        if (block.id === blockId) {
          // Retornamos una copia del bloque con el título actualizado
          return { ...block, title: text };
        }
        // Si no es el bloque que buscamos, lo dejamos igual
        return block;
      })
    );
  };

  const removeExercise = (blockId, exerciseId) => {
    setActiveBlocks(prev => prev.map(block => {
      if (block.id === blockId) {
        return {
          ...block,
          exercises: block.exercises.filter(ex => ex.id !== exerciseId)
        };
      }
      return block;
    }));
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* FILTRADO DINÁMICO DE BOTONES */}
        <View style={styles.addActions}>
        <Text style={styles.addLabel}>{t('training.add_block_label')}</Text>
        <View style={styles.buttonRow}>
          {selectedBlocks.strength && (
            <ActionButton 
              label={t('training.strength')} 
              color={Colors.fuerza} 
              onPress={() => addBlock('strength')} 
            />
          )}

          {selectedBlocks.gym && (
            <ActionButton 
              label={t('training.gym')} 
              color={Colors.gym} 
              onPress={() => addBlock('gym')} 
            />
          )}

          {selectedBlocks.cardio && (
            <ActionButton 
              label={t('training.cardio')} 
              color={Colors.cardio} 
              onPress={() => addBlock('cardio')} 
            />
          )}
        </View>
      </View>

      <Text style={styles.dayTitle}>{day}</Text>

      {/* RENDERIZADO DE BLOQUES SELECCIONADOS */}
      {activeBlocks.map((block) => (
  <View key={block.id} style={[styles.blockCard, { borderLeftColor: getBlockColor(block.type) }]}>
    
    {/* 1. HEADER DEL BLOQUE (Tipo y Basurero) */}
    <View style={styles.blockHeader}>
      <Text style={[styles.blockTypeText, { color: getBlockColor(block.type) }]}>
        {t(`training.${block.type.toLowerCase()}`)}
      </Text>
      <TouchableOpacity onPress={() => removeBlock(block.id)}>
        <Ionicons name="trash-outline" size={20} color={Colors.fuerza} />
      </TouchableOpacity>
    </View>

    {/* 2. TÍTULO DEL BLOQUE (Ej: Strict Press) */}
    <TextInput 
      placeholder={
        block.type === 'strength' ? t('training.strength_title_placeholder') :
        block.type === 'gym' ? t('training.gym_title_placeholder') :
        t('training.cardio_title_placeholder')
      }
      style={styles.titleInput}
      placeholderTextColor={Colors.placeholder}
      value={block.title}
      onChangeText={(text) => updateBlockTitle(block.id, text)} // Importante: Implementar esta función
    />

    {/* 3. LISTA DE FILAS DE EJERCICIOS (3x3, 60%, etc.) */}
    {block.exercises.map((ex) => (
      <ExerciseRow 
        key={ex.id}
        id={ex.id}
        name={ex.name}
        detail={ex.detail}
        onUpdate={(exId, field, val) => updateExercise(block.id, exId, field, val)}
        onRemove={(exId) => removeExercise(block.id, exId)}
      />
    ))}

    {/* 4. BOTÓN PARA AÑADIR FILA */}
    <TouchableOpacity 
      style={styles.addExerciseBtn} 
      onPress={() => addExercise(block.id)}
    >
      <Ionicons name="add-outline" size={16} color={getBlockColor(block.type)} />
      <Text style={[styles.addExerciseText, { color: getBlockColor(block.type) }]}>
        {t('training.add_row')}
      </Text>
    </TouchableOpacity>

  </View>
))}

{/* 
      <TouchableOpacity style={styles.restButton} onPress={handleRestDay}>
        <Text style={styles.restText}>{t('training.rest_day_option')}</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  content: { padding: 20, paddingBottom: 100 },
  dayTitle: { fontSize: 26, fontWeight: '200', textAlign: 'center', marginVertical: 30, color: '#333' },
  blockCard: { 
    backgroundColor: '#FFF', 
    borderRadius: 15, 
    padding: 15, 
    marginBottom: 15,
    borderLeftWidth: 5,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 
  },
  blockHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  blockTypeText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  titleInput: { fontSize: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingVertical: 8, color: '#333' },
  addActions: { marginTop: 80, alignItems: 'center' },
  addLabel: { fontSize: 13, color: '#999', marginBottom: 15, textTransform: 'uppercase' },
  buttonRow: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 10 },
  restButton: { marginTop: 40, alignSelf: 'center', padding: 10 },
  restText: { color: Colors.cardio, fontWeight: '600', fontSize: 14 },
  addExerciseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addExerciseText: {
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 13,
  },
});