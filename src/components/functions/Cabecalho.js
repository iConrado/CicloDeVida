import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Estilo a ser usado no componente principal do cabeçalho. INTERNO
const styles = StyleSheet.create({
  cab: {
    backgroundColor: '#0A2955', 
    flex: 1, 
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tex: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

// Cabeçalho padrão. EXPORT PADRÃO
const Cabecalho = (texto) => 
  (<View style={styles.cab}>
    <Text style={styles.tex}>{texto} 0.1.17</Text>
  </View>
); 

export default Cabecalho;
