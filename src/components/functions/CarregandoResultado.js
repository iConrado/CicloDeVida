import React from 'react';
import { View, ActivityIndicator, Text, Platform } from 'react-native';

import styles from './styles';

export default () => (
  <View style={styles.loading}>
    <Text style={styles.carregando_txResultado}>Preparando o resultado da sua consultoria</Text>
    <ActivityIndicator size={Platform.OS === 'android' ? 80 : 1} color="#0A2955" />
  </View>
);
