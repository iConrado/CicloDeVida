import React from 'react';

import { 
  View, 
  Text, } from 'react-native';
import Slider from 'react-native-slider';

import styles from '../functions/styles';
import monetizar from '../functions/monetizar';

export default class SliderSalario extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      tmpSalLiq: props.inicial 
    }; 
  }

  render() {
    return (
      <View style={styles.viewVertical}>
        <Text style={styles.label}>Salário Bruto:</Text>
        <View style={styles.viewHorizontal}>
            <Slider 
              style={styles.home_slSalLiq}
              minimumValue={0}
              maximumValue={50000}
              step={100}
              minimumTrackTintColor='#14567A'
              thumbTintColor='#14567A'
              value={this.state.tmpSalLiq}
              onValueChange={(value) => this.setState({ tmpSalLiq: value })}
            />
          <Text style={styles.home_txSalLiq}>{monetizar(this.state.tmpSalLiq)}</Text>
        </View>
      </View>
    );
  }
}
