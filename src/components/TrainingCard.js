import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/theme';

const TrainingCard = ({ name, type, subtitle, onPress }) => {
  const isRest = type === 'Rest Day';
  
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={[
        styles.indicator, 
        { backgroundColor: isRest ? Colors.rest : Colors.fuerza }
      ]} />
      <View style={styles.cardContent}>
        <Text style={styles.dayText}>{name}</Text>
        <Text style={styles.typeText}>{type}: {subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.placeholder} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  indicator: { width: 4, height: 40, borderRadius: 2 },
  cardContent: { flex: 1, marginLeft: 15 },
  dayText: { fontSize: 16, fontWeight: '600', color: Colors.text },
  typeText: { fontSize: 13, color: Colors.textLight, marginTop: 2 },
});

export default TrainingCard;