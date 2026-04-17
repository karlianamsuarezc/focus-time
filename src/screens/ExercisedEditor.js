import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useRoutineEditor } from '../hooks/useRoutineEditor';
import { Colors, getBlockColor } from '../theme/theme';
import ActionButton from '../components/ActionButon'; // Supongamos que ya lo moviste

export default function ExerciseEditor({ route, navigation }) {
  const { t } = useTranslation();
  const { day } = route.params;
  const { activeBlocks, addBlock, removeBlock, clearBlocks } = useRoutineEditor();

  const handleRestDay = () => {
    Alert.alert(t('training.rest_day_title'), t('training.rest_day_confirm'), [
      { text: t('common.no'), style: 'cancel' },
      { 
        text: t('common.yes'), 
        onPress: () => {
          clearBlocks();
          navigation.goBack();
        } 
      }
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.dayTitle}>{day}</Text>

      {activeBlocks.map((block) => (
        <View key={block.id} style={[styles.blockCard, { borderLeftColor: getBlockColor(block.type) }]}>
          <View style={styles.blockHeader}>
            <Text style={[styles.blockTypeText, { color: getBlockColor(block.type) }]}>
              {t(`training.${block.type.toLowerCase()}`)}
            </Text>
            <TouchableOpacity onPress={() => removeBlock(block.id)}>
              <Ionicons name="trash-outline" size={20} color={Colors.fuerza} />
            </TouchableOpacity>
          </View>
          
          <TextInput 
            placeholder={t('training.block_title_placeholder')} 
            style={styles.titleInput}
            placeholderTextColor={Colors.placeholder}
          />
          
          {/* Aquí vendrá el componente ExerciseRow más adelante */}
        </View>
      ))}

      <View style={styles.addActions}>
        <Text style={styles.addLabel}>{t('training.add_block_label')}</Text>
        <View style={styles.buttonRow}>
          <ActionButton 
            label={t('training.fuerza')} 
            color={Colors.fuerza} 
            onPress={() => addBlock('Fuerza')} 
          />
          <ActionButton 
            label={t('training.gym')} 
            color={Colors.gym} 
            onPress={() => addBlock('Gymnastics')} 
          />
          <ActionButton 
            label={t('training.cardio')} 
            color={Colors.cardio} 
            onPress={() => addBlock('Cardio')} 
          />
        </View>
      </View>

      <TouchableOpacity style={styles.restButton} onPress={handleRestDay}>
        <Text style={styles.restText}>{t('training.rest_day_option')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingBottom: 60 },
  dayTitle: { fontSize: 24, fontWeight: '300', textAlign: 'center', marginTop: 40, marginBottom: 20, color: Colors.text },
  blockCard: { 
    backgroundColor: Colors.white, 
    borderRadius: 15, 
    padding: 15, 
    marginBottom: 15,
    borderLeftWidth: 5,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 3
  },
  blockHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  blockTypeText: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  titleInput: { fontSize: 16, fontWeight: '600', borderBottomWidth: 1, borderBottomColor: Colors.border, paddingVertical: 5, color: Colors.text },
  addActions: { marginTop: 20, alignItems: 'center' },
  addLabel: { fontSize: 14, color: Colors.textLight, marginBottom: 10 },
  buttonRow: { flexDirection: 'row', gap: 10 },
  restButton: { marginTop: 40, padding: 15, alignItems: 'center' },
  restText: { color: Colors.cardio, fontWeight: '600', letterSpacing: 1 }
});