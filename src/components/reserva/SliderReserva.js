import React from 'react';

import { View, Text } from 'react-native';
import Slider from 'react-native-slider';

import styles from '../functions/styles';
import Ciclo from '../functions/Ciclo';
import monetizar from '../functions/monetizar';

const C = new Ciclo();

export default class SliderReserva extends React.Component {
  static percentualRenda(valor) {
    if (valor === 0) {
      return 0;
    }

    const salario = C.getSalLiq();
    const perc = (valor / salario) * 100;

    return perc.toFixed(1).replace('.', ',');
  }

  static maximumSlider() {
    const max = parseInt(C.getSalLiq() * 0.3, 10);
    return max;
  }

  constructor(props) {
    super(props);
    this.state = { tmpReserva: props.inicial ? props.inicial : 0 };
  }

  render() {
    return (
      <View style={styles.viewVertical}>
        <View style={styles.viewHorizontal}>
          <Text style={styles.label}>Faça sua reserva (sugestão 10%): </Text>
        </View>
        <View style={styles.viewHorizontal}>
          <Slider
            testID="slider"
            style={styles.reserva_slider}
            minimumValue={0}
            maximumValue={SliderReserva.maximumSlider()}
            step={50}
            minimumTrackTintColor="#14567A"
            thumbTintColor="#14567A"
            value={this.state.tmpReserva}
            onValueChange={value => this.setState({ tmpReserva: value })}
            onSlidingComplete={value => this.props.retorno(value)}
          />
          <View style={styles.reserva_viewCentral}>
            <Text style={styles.reserva_txDireita}>{SliderReserva.percentualRenda(this.state.tmpReserva)}%</Text>
            <Text style={styles.reserva_txDireita}>{monetizar(this.state.tmpReserva)}</Text>
          </View>
        </View>
      </View>
    );
  }
}
