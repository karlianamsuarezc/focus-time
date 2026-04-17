import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Vibration } from 'react-native';
import '../../i18n';

const FocusTimer = () => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null); // Usamos useRef para persistir el ID del intervalo sin re-renders

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = (mins) => {
    setIsActive(false);
    setSeconds(mins * 60);
  };

  useEffect(() => {
    if (isActive && seconds > 0) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
        Vibration.vibrate();
      setIsActive(false);
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current); // Cleanup fundamental en mobile
  }, [isActive, seconds]);

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('timer.title')}</Text>
      </View>

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
        <Text style={styles.primaryButtonText}>{isActive ? 'PAUSE' : 'START'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9', // Neutro suave
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 30
  },
  ringOuter: {
    width: 230,
    height: 230,
    borderRadius: 140,
    backgroundColor: '#F9F9F9', // Mismo color que el fondo para el efecto neumórfico
    alignItems: 'center',
    justifyContent: 'center',
    
    // SOMBRA NEUMÓRFICA (Luz superior izquierda)
    shadowColor: '#FFFFFF',
    shadowOffset: { width: -8, height: -8 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5, // Para Android (limitado, no soporta offset negativo)
    marginBottom: 30
  },

  ringInner: {
    width: 220,
    height: 220,
    borderRadius: 130,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 193, 204, 0.3)', // Un toque de rosa muy sutil en el borde

    // RESPLANDOR NEÓN (Sombra difusa de color)
    shadowColor: '#FFC1CC', 
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20, // Esto crea el efecto de "glow" o resplandor
  },
  timerText: {
    fontSize: 80,
    fontWeight: '200',
    color: '#333',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
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
    backgroundColor: '#EEE',
  },
  buttonPrimary: {
    backgroundColor: '#FFC1CC', // Acento Rosa Soft
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: '#000', // Sombra sutil para profundidad chic
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  buttonActive: {
    backgroundColor: '#D1D1D1',
  },
  buttonText: {
    color: '#666',
    fontSize: 14,
  },
  primaryButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  }
});

export default FocusTimer;