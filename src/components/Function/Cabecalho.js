import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

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

const Cabecalho = (texto) => 
  (<View style={styles.cab}>
    <Text style={styles.tex}>{texto}</Text>
  </View>
); 

export default Cabecalho;