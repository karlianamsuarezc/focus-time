export const Colors = {
    background: '#F9F9F9',
    primary: '#FFC1CC',
    secondary: '#EEE',
    text: '#333',
    textLight: '#666',
    white: '#FFFFFF',
    active: '#D1D1D1',
    shadow: 'rgba(0, 0, 0, 0.1)',
    neonBorder: 'rgba(255, 193, 204, 0.3)',
    fuerza: '#E57373',
    gym: '#FFD54F',
    cardio: '#81C784',
    rest: '#A5D6A7',
    border: '#EEE',
    placeholder: '#CCC'
  };
  
  export const getBlockColor = (type) => {
    switch (type) {
      case 'strength': return Colors.fuerza;
      case 'gym': return Colors.gym;
      case 'cardio': return Colors.cardio;
      default: return Colors.border;
    }
  };