import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

import styles from './functions/styles';

const TutorialScreen = props => {
  const { navigate } = props.navigation;
  return (
    <Animatable.View style={styles.intro_view} animation="fadeIn" duration={2000}>
      <View style={styles.intro_viewFrase}>
        <Animatable.Text style={styles.intro_frase} delay={500} animation="fadeInUp" duration={1500}>
          Está satisfeito com sua vida financeira?
        </Animatable.Text>
        <Animatable.Text style={styles.intro_frase} delay={2000} animation="fadeInRight" duration={1500}>
          Qual é o seu maior desejo?
        </Animatable.Text>
      </View>

      <View style={styles.intro_viewRodape}>
        <View>
          <TouchableOpacity onPress={() => navigate('Simulação')}>
            <Text style={styles.intro_texto}>Pular introdução</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.intro_botao} onPress={() => navigate('Tutorial2')}>
            <Text style={styles.intro_botaoTexto}>Avançar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );
};

export default TutorialScreen;
