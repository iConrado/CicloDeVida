import React from 'react';

import { 
  View, 
  Text,
  Image, } from 'react-native';
import Slider from 'react-native-slider';

import styles from '../functions/styles';
import monetizar from '../functions/monetizar';

const imgCar = require('../../imgs/ic_car_white.png');

export default class SliderVeiculos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      tmpVeiculos: props.inicial 
    }; 
  }

  render() {
    return (
      <View style={[styles.viewVertical, styles.espacador]}>
        <Text style={styles.label}>Veículos (valor total - financiados ou não):</Text>
        <View style={styles.viewHorizontal}>
          <View style={styles.viewIcone}>
            <Image 
              style={styles.imgIcone}
              source={imgCar}
            />
          </View>
          <View style={styles.viewPosIcone}>
            <Slider
              style={styles.patrim_slIcone}
              minimumValue={0}
              maximumValue={500000}
              step={2000}
              minimumTrackTintColor='#14567A'
              thumbTintColor='#14567A'
              value={this.state.tmpVeiculos}
              onValueChange={(value) => this.setState({ tmpVeiculos: value })}
              onSlidingComplete={(value) => this.props.retorno(value)}
            />
            <Text style={styles.patrim_txIcone}>{monetizar(this.state.tmpVeiculos)}</Text>
          </View>
        </View>
      </View>
    );
  }
}
