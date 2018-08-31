import React from 'react';
import { View, Text, Modal, TouchableOpacity, WebView, BackHandler, AsyncStorage, Platform } from 'react-native';

import styles from '../functions/styles';
import Ciclo from '../functions/Ciclo';

const isAndroid = Platform.OS === 'android';
const htmlPricavidade = { uri: isAndroid ? 'file:///android_asset/html/politica_privacidade.html' : './external/html/politica_privacidade.html' };

export default props => {
  // Componente para apresentação das políticas e termos do APP
  //
  // Props esperadas:
  // visivel          [boolean] - estado repassado para informar se a tela estará visível ou não
  // fechar()         [função]  - função para ser acionada para fechar a janela
  //                              (necessita bind no componente de origem)
  // tela             [string]  - tela de origem da chamada. usado para diferenciar o processamento
  //                              do aceite.
  //

  const { fechar, visivel, tela } = props;

  const fechando = async () => {
    const d = new Date();

    if (tela === 'home') {
      const C = new Ciclo();
      await C.recuperar();
      if (!C.getPoliticaPrivacidade()) {
        C.setPoliticaPrivacidade(d);
        C.salvar();
      }
    }

    AsyncStorage.setItem('Privacidade', d.toString());
    fechar();
  };

  return (
    <Modal transparent visible={visivel} animationType="fade" onRequestClose={() => BackHandler.exitApp()}>
      <View style={styles.modalTermos_viewContainer}>
        <View style={styles.modalTermos_viewFundo} />

        <View style={styles.modalTermos_viewConteudo}>
          <WebView source={htmlPricavidade} />
          <View style={styles.modalTermos_viewBotoes}>
            <TouchableOpacity style={styles.modalTermos_botao} onPress={() => BackHandler.exitApp()}>
              <Text style={styles.modalTermos_textoBotao}>Não Concordo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalTermos_botao} onPress={() => fechando()}>
              <Text style={styles.modalTermos_textoBotao}>Concordo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
