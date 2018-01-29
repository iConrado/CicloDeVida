import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Estilo a ser usado no componente principal do cabeçalho. INTERNO
const styles = StyleSheet.create({
  cab: {
    backgroundColor: '#568CD9', 
    flex: 1, 
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tex: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#454545',
  },
});

// Cabeçalho padrão. EXPORT PADRÃO
const Cabecalho = (texto) => 
  (<View style={styles.cab}>
    <Text style={styles.tex}>{texto}</Text>
  </View>
); 

export default Cabecalho;
