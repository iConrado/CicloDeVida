import React from 'react';

import { 
  View, 
  Text,
  Image, } from 'react-native';
import Slider from 'react-native-slider';

import styles from '../functions/styles';
import monetizar from '../functions/monetizar';

const imgMoney = require('../../imgs/ic_money_white.png');

export default class SliderInvestimentos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      tmpInvest: props.inicial 
    }; 
  }
  
  render() {
    return (
      <View style={styles.viewVertical}>
        <Text style={styles.label}>Investimentos (aplicações, poupança, etc):</Text>
        <View style={styles.viewHorizontal}>
          <View style={styles.viewIcone}>
            <Image 
              style={styles.imgIcone}
              source={imgMoney}
            />
          </View>
          <View style={styles.viewPosIcone}>
            <Slider
              style={styles.patrim_slIcone}
              minimumValue={0}
              maximumValue={2000000}
              step={5000}
              minimumTrackTintColor='#14567A'
              thumbTintColor='#14567A'
              value={this.state.tmpInvest}
              onValueChange={(value) => this.setState({ tmpInvest: value })}
              onSlidingComplete={(value) => this.props.retorno(value)}
            />
            <Text style={styles.patrim_txIcone}>{monetizar(this.state.tmpInvest)}</Text>
          </View>
        </View>
      </View>
    );
  }
}
