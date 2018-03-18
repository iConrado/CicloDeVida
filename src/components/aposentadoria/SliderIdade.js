import React from 'react';

import { 
  View, 
  Text } from 'react-native';
import Slider from 'react-native-slider';

import styles from '../functions/styles';
import Ciclo from '../functions/Ciclo';

const C = new Ciclo();

export default class SliderIdade extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tmpIdadeAposent: props.inicial };
  }

  render() {
    return (
      <View style={styles.viewVertical}>
        <View style={styles.viewHorizontal}>
          <Text style={styles.label}>Idade desejada para aposentadoria (em anos):</Text>
        </View>
        <View style={styles.viewHorizontal}>
          <Slider
            style={styles.aposent_slider}
            minimumValue={C.idadeAtual()}
            maximumValue={80}
            step={1}
            minimumTrackTintColor='#14567A'
            thumbTintColor='#14567A'
            value={this.state.tmpIdadeAposent}
            onValueChange={(value) => this.setState({ tmpIdadeAposent: value })}
            onSlidingComplete={(value) => this.props.retorno(value)}
          />
          <View style={styles.aposent_viewCentral}>
            <Text style={styles.aposent_txDireita}>{this.state.tmpIdadeAposent}</Text>
          </View>
        </View>
      </View>
    );
  }
}
