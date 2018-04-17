import React from 'react';

import { 
  View, 
  Text,
  Image, } from 'react-native';
import Slider from 'react-native-slider';

import styles from '../functions/styles';
import monetizar from '../functions/monetizar';

const imgHome = require('../../imgs/ic_home_white.png');

export default class SliderImoveis extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tmpImoveis: props.inicial ? props.inicial : 0 }; 
  }

  render() {
    return (
      <View style={[styles.viewVertical, styles.espacador]}>
        <Text style={styles.label}>Imóveis (valor total - financiados ou não):</Text>
        <View style={styles.viewHorizontal}>
          <View style={styles.viewIcone}>
            <Image 
              style={styles.imgIcone}
              source={imgHome}
            />
          </View>
          <View style={styles.viewPosIcone}>
            <Slider
              style={styles.patrim_slIcone}
              minimumValue={0}
              maximumValue={5000000}
              step={10000}
              minimumTrackTintColor='#14567A'
              thumbTintColor='#14567A'
              value={this.state.tmpImoveis}
              onValueChange={(value) => this.setState({ tmpImoveis: value })}
              onSlidingComplete={(value) => this.props.retorno(value)}
            />
            <Text style={styles.patrim_txIcone}>{monetizar(this.state.tmpImoveis)}</Text>
          </View>
        </View>
      </View>
    );
  }
}
