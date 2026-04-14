import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import FocusTimer from './src/components/FocusTimer';

export default function App() {
  return (
    <>
      <FocusTimer />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
