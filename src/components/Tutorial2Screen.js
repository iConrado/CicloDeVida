import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

import styles from './functions/styles';

const Tutorial2Screen = props => {
  const { navigate } = props.navigation;
  return (
    <Animatable.View style={styles.intro_view}>
      <View style={styles.intro_viewFrase}>
        <Animatable.Text style={styles.intro_frase} delay={500} animation="pulse" easing="ease-out" iterationCount="infinite">
          Preencha o questionário a seguir e descubra as respostas.
        </Animatable.Text>
      </View>

      <View style={styles.intro_viewRodape}>
        <View style={styles.intro_viewCentral}>
          <TouchableOpacity style={styles.intro_botao} onPress={() => navigate('Simulação')}>
            <Text style={styles.intro_botaoTexto}>Começar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );
};

export default Tutorial2Screen;
