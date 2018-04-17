import React from 'react';

import { 
  View, 
  Text } from 'react-native';
import Slider from 'react-native-slider';

import styles from '../functions/styles';
import Ciclo from '../functions/Ciclo';
import monetizar from '../functions/monetizar';

const C = new Ciclo();

export default class SliderGasto extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tmpGasto: props.inicial ? props.inicial : 0 }; 
  }

  maximumSlider() {
    const max = parseInt(C.getSalLiq(), 10);
    return max;
  }

  render() {
    return (
      <View style={styles.viewVertical}>
        <View style={styles.viewHorizontal}>
          <Text style={styles.label}>Informe seu gasto mensal: </Text>
        </View>
        <View style={styles.viewHorizontal}>
          <Slider
            style={styles.reserva_slider}
            minimumValue={0}
            maximumValue={this.maximumSlider()}
            step={100}
            minimumTrackTintColor='#14567A'
            thumbTintColor='#14567A'
            value={this.state.tmpGasto}
            onValueChange={(value) => this.setState({ tmpGasto: value })}
            onSlidingComplete={(value) => this.props.retorno(value)}
          />
          <View style={styles.reserva_viewCentral}>
            <Text style={styles.reserva_txDireita}>{monetizar(this.state.tmpGasto)}</Text>
          </View>
        </View>
      </View>
    );
  }
}
