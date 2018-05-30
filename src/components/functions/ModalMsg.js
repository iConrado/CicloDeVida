import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

import styles from './styles';

const erroPadrao = {
  titulo: 'Erro',
  descricao: 'O aplicativo se comportou de maneira inesperada.',
  solucao: 'Tente conferir os dados, voltar uma tela ou reiniciar o app.',
};

export default props => {
  // Componente para apresentação de uma tela de erros
  //
  // Props esperadas:
  // visivel      [boolean] - estado repassado para informar se a tela estará visível ou não
  // fechar()     [função]  - função para ser acionada para fechar a janela
  //                          (necessita bind no componente de origem)
  // prosseguir() [função]  - função para ser acionada ao clicar em prosseguir (necessário se indicado okCancela = true)
  //                          (necessita bind no componente de origem)
  // objErro      [objeto]  - objeto contendo as descrições do erro. na ausência será retornada
  //                       uma mensagem padrão, retornando ao aplicativo
  // okCancela    [boolean] - switch para permitr a visualização dos botões cancelar e prosseguir
  //

  const erro = props.objErro || erroPadrao;
  const { fechar, prosseguir, okCancela } = props;

  if (okCancela) {
    return (
      <Modal transparent visible={props.visivel} animationType="fade" onRequestClose={() => fechar()}>
        <View style={styles.modalMsg_viewContainer}>
          <View style={styles.modalMsg_viewFundo} />

          <View style={styles.modalMsg_viewCaixa}>
            <Text style={styles.modalMsg_titulo}>{erro.titulo}</Text>
            <Text style={styles.modalMsg_descricao}>{erro.descricao}</Text>
            <Text style={styles.modalMsg_solucao}>{erro.solucao}</Text>
            <View style={styles.modalMsg_viewBotoes}>
              <TouchableOpacity style={styles.modalMsg_botao} onPress={() => fechar()}>
                <Text style={styles.modalMsg_textoBotao}>CANCELAR</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalMsg_botao} onPress={() => prosseguir()}>
                <Text style={styles.modalMsg_textoBotao}>PROSSEGUIR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal transparent visible={props.visivel} animationType="fade" onRequestClose={() => fechar()}>
      <View style={styles.modalMsg_viewContainer}>
        <View style={styles.modalMsg_viewFundo} />

        <View style={styles.modalMsg_viewCaixa}>
          <Text style={styles.modalMsg_titulo}>{erro.titulo}</Text>
          <Text style={styles.modalMsg_descricao}>{erro.descricao}</Text>
          <Text style={styles.modalMsg_solucao}>{erro.solucao}</Text>
          <TouchableOpacity style={styles.modalMsg_botao} onPress={() => fechar()}>
            <Text style={styles.modalMsg_textoBotao}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
