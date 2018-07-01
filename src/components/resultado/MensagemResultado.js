import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from '../functions/styles';

const imgCheck = require('../../imgs/ic_check.png');
const imgSadCloud = require('../../imgs/sad_cloud.png');

export default props => {
  const { resultado = false } = props;

  // Retorno em caso positivo
  if (resultado) {
    return (
      <View style={styles.loading}>
        <View style={styles.viewHorizontal}>
          <View style={styles.result_viewLogo}>
            <Image style={styles.imgLogo} source={imgCheck} />
          </View>
          <View style={styles.result_viewPosLogo}>
            <Text style={styles.result_txResultado}>PARABÉNS!</Text>
            <Text style={styles.result_txResultado}>Vocês está no caminho certo!</Text>
          </View>
        </View>
      </View>
    );
  }

  // Retorno em caso negativo
  return (
    <View style={styles.loading}>
      <View style={styles.viewHorizontal}>
        <View style={styles.result_viewLogoNeg}>
          <Image style={styles.result_imgLogoNeg} source={imgSadCloud} />
        </View>
        <View style={styles.result_viewPosLogo}>
          <Text style={styles.result_txResultado}>É preciso ajustar alguns detalhes.</Text>
          <Text style={styles.result_txResultado}>Mas não desanime!</Text>
        </View>
      </View>
    </View>
  );
};
