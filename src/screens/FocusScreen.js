import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTimer } from '../hooks/useTimer';
import { Colors } from '../theme/theme';

// Helper externo (no se redeclara)
const formatTime = (sec) => {
  const mins = Math.floor(sec / 60);
  const remainingSecs = sec % 60;
  return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
};

const FocusScreen = () => {
  const { t } = useTranslation();
  const { seconds, isActive, toggleTimer, resetTimer } = useTimer(25);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t('timer.title')}</Text>

      <View style={styles.ringOuter}> 
        <View style={styles.ringInner}>
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.buttonSecondary} onPress={() => resetTimer(25)}>
          <Text style={styles.buttonText}>{t('timer.focus')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={() => resetTimer(5)}>
          <Text style={styles.buttonText}>{t('timer.break')}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.buttonPrimary, isActive && styles.buttonActive]} 
        onPress={toggleTimer}
      >
        <Text style={styles.primaryButtonText}>
          {isActive ? t('timer.pause') : t('timer.start')}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Usamos el tema
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.text,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 30
  },
  ringOuter: {
    width: 230,
    height: 230,
    borderRadius: 140,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    
    // Sombras neumórficas
    shadowColor: Colors.white,
    shadowOffset: { width: -8, height: -8 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30
  },
  ringInner: {
    width: 220,
    height: 220,
    borderRadius: 130,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.neonBorder, // Color sutil del borde

    // Resplandor Neón
    shadowColor: Colors.primary, 
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  timerText: {
    fontSize: 80,
    fontWeight: '200',
    color: Colors.text,
    textShadowColor: Colors.shadow,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 30
  },
  buttonSecondary: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: Colors.secondary,
  },
  buttonPrimary: {
    backgroundColor: Colors.primary, // El rosa protagonista
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  buttonActive: {
    backgroundColor: Colors.active,
  },
  buttonText: {
    color: Colors.textLight,
    fontSize: 14,
  },
  primaryButtonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
  }
});

export default FocusScreen;