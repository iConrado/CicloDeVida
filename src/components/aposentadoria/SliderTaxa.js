import React from 'react';

import { 
  View, 
  Text } from 'react-native';
import Slider from 'react-native-slider';

import styles from '../functions/styles';

export default class SliderTaxa extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tmpRentab: props.inicial ? props.inicial : 0 };
  }

  render() {
    return (
      <View style={styles.viewVertical}>
        <View style={styles.viewHorizontal}>
          <Text style={styles.label}>Taxa de rentabilidade estimada (a.a.):</Text>
        </View>
        <View style={styles.viewHorizontal}>
          <Slider
            style={styles.aposent_slider}
            minimumValue={0}
            maximumValue={20}
            step={0.1}
            minimumTrackTintColor='#14567A'
            thumbTintColor='#14567A'
            value={this.state.tmpRentab}
            onValueChange={(value) => this.setState({ tmpRentab: value })}
            onSlidingComplete={(value) => this.props.retorno(value)}
          />
          <View style={styles.aposent_viewCentral}>
            <Text style={styles.aposent_txDireita}>
              {this.state.tmpRentab.toFixed(1).replace('.', ',')}%
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
