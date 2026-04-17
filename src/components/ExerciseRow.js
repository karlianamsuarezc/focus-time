import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ExerciseRow = ({ id, name, detail, onUpdate, onRemove }) => {
  return (
    <View style={styles.row}>
      <TextInput
        style={[styles.input, styles.flex2]}
        placeholder="Ej: 3x3"
        value={name}
        onChangeText={(text) => onUpdate(id, 'name', text)}
      />
      <TextInput
        style={[styles.input, styles.flex3]}
        placeholder="Detalle o %"
        value={detail}
        onChangeText={(text) => onUpdate(id, 'detail', text)}
      />
      <TouchableOpacity onPress={() => onRemove(id)}>
        <Ionicons name="close-circle-outline" size={20} color="#FFC1CC" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 },
  input: { borderBottomWidth: 1, borderBottomColor: '#F0F0F0', padding: 5, fontSize: 14 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },
});

export default ExerciseRow;