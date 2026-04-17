import React from 'react';
import { StyleSheet, Text, View, SafeAreaView  } from 'react-native';
import { useTranslation } from 'react-i18next';
import '../i18n';

const TrainingScreen = () => {
  const { t } = useTranslation();
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('training.title_screen')}</Text>
        </View>
  
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

    timerText: {
      fontSize: 80,
      fontWeight: '200',
      color: '#333',
      marginBottom: 30,
      textShadowColor: 'rgba(0, 0, 0, 0.1)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    }
  });

  export default TrainingScreen;
  