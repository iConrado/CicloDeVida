import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import styles from './styles';

export default () => (
  <View style={styles.loading}>
    <ActivityIndicator size={80} color="#0A2955" />
  </View>
);
