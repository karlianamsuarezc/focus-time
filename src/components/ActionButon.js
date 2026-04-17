import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/theme'; // Opcional, si quieres usar tus colores globales

const ActionButton = ({ label, color, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.actionBtn, { borderColor: color }]} 
      onPress={onPress}
      activeOpacity={0.7} // Mejora la sensación táctil al presionar
    >
      <Text style={[styles.text, { color: color }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionBtn: { 
    borderWidth: 1.5, // Un poco más grueso para que se vea más "chic"
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { 
    fontSize: 12, 
    fontWeight: '600',
    letterSpacing: 0.5,
  }
});

export default ActionButton;