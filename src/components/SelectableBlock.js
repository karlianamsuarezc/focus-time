import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/theme';

const SelectableBlock = ({ label, isActive, onPress }) => (
  <TouchableOpacity 
    style={[styles.button, isActive && styles.active]} 
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={[styles.text, isActive && styles.textActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: { 
    padding: 18, 
    borderRadius: 15, 
    backgroundColor: Colors.secondary, 
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  active: { 
    backgroundColor: Colors.primary, // Tu rosa Soft
    borderColor: Colors.neonBorder,
  },
  text: { 
    color: Colors.textLight, 
    fontWeight: '500', 
    textAlign: 'center' 
  },
  textActive: { 
    color: Colors.white, 
    fontWeight: '700' 
  }
});

export default SelectableBlock;