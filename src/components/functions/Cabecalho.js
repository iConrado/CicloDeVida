import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import EstiloVoltar from './EstiloVoltar';

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
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

const titulo = texto => (
  <View style={styles.cab}>
    <Text style={styles.tex}>{texto}</Text>
  </View>
);

// Cabeçalho padrão. EXPORT PADRÃO
const Cabecalho = (navigation, txTitulo, principal = false) => {
  const { openDrawer } = navigation;
  const cabecalho = {
    headerTitle: titulo(txTitulo),
    headerBackTitle: 'Voltar',
    headerTintColor: EstiloVoltar.hTintColor,
    headerStyle: EstiloVoltar.hStyle,
  };

  cabecalho.headerRight = <View />;

  if (principal) {
    cabecalho.headerLeft = (
      <TouchableOpacity
        style={{ marginRight: 7, marginLeft: 4 }}
        onPress={() => {
          openDrawer();
        }}
      >
        <Text style={{ color: '#FFF' }}>Menu</Text>
      </TouchableOpacity>
    );
  }
  return cabecalho;
};

export default Cabecalho;
