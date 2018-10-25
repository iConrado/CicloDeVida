import React from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';

import styles from './styles';

export default () => (
  <View style={styles.loading}>
    <ActivityIndicator size={Platform.OS === 'android' ? 80 : 1} color="#0A2955" />
  </View>
);
