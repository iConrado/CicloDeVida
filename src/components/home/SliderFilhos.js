import React from 'react';

import { 
  View, 
  Text, } from 'react-native';
import Slider from 'react-native-slider';

import styles from '../functions/styles';

export default class SliderFilhos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      tmpFilhos: props.inicial 
    }; 
  }

  render() {
    return (
      <View style={styles.viewVertical}>
        <Text style={styles.label}>Filhos:</Text>
        <View style={styles.viewHorizontal}>
          <Slider 
            style={styles.home_slFilhos}
            minimumValue={0}
            maximumValue={10}
            step={1}
            minimumTrackTintColor='#14567A'
            thumbTintColor='#14567A'
            value={this.state.tmpFilhos}
            onValueChange={(value) => this.setState({ tmpFilhos: value })}
            onSlidingComplete={(value) => this.props.retorno(value)}
          />
          <Text style={styles.home_txFilhos}>{this.state.tmpFilhos}</Text>
        </View>
      </View>
    );
  }
}
