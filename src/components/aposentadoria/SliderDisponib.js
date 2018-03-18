import React from 'react';

import { 
  View, 
  Text } from 'react-native';
import Slider from 'react-native-slider';

import styles from '../functions/styles';
import Ciclo from '../functions/Ciclo';
import monetizar from '../functions/monetizar';

const C = new Ciclo();

export default class SliderDisponib extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tmpDisponib: props.inicial };
  }

  sugestaoReserva() {
    const sugestaoReserva = C.sugestReserv();

    return sugestaoReserva;
  }

  percentualRenda(valor) {
    if (valor === 0) { return 0; }
    
    const salario = C.getSalLiq();
    const perc = (valor / salario) * 100;

    return perc.toFixed(1).replace('.', ',');
  }

  rendaPercentual() {
    const perc = this.sugestaoReserva();

    if (perc === 0) { return 0; }

    const salario = C.getSalLiq();
    const valor = (perc * salario);

    return parseInt(valor, 10);    
  }

  render() {
    return (
      <View style={styles.viewVertical}>
        <View style={styles.viewHorizontal}>
          <Text style={styles.label}>Sua disponibilidade mensal: </Text>
        </View>
        <View style={styles.viewHorizontal}>
          <Slider
            style={styles.aposent_slider}
            minimumValue={0}
            maximumValue={Number.parseInt(C.getSalLiq() * 0.3, 10)}
            step={50}
            minimumTrackTintColor='#14567A'
            thumbTintColor='#14567A'
            value={this.state.tmpDisponib}
            onValueChange={(value) => this.setState({ tmpDisponib: value })}
            onSlidingComplete={(value) => this.props.retorno(value)}
          />
          <View style={styles.aposent_viewCentral}>
            <Text style={styles.aposent_txDireita}>
              {this.percentualRenda(this.state.tmpDisponib)}%
            </Text>
            <Text style={styles.aposent_txDireita}>{monetizar(this.state.tmpDisponib)}</Text>
           </View>
        </View>
      </View>
    );
  }
}
