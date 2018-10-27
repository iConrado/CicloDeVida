import React from 'react';
import { View, Text, Modal, TouchableHighlight, PickerIOS } from 'react-native';

import styles from './styles';

export default props => {
  // Componente para apresentação de uma Combo para IOS
  //
  // Props esperadas:
  // nome             [string]  - nome do componente, util para identificação de qual componente ocultar
  // visivel          [boolean] - estado repassado para informar se a tela estará visível ou não
  // fechar(nome)     [função]  - função para ser acionada para fechar a janela
  //                              (necessita bind no componente de origem)
  // retorno()        [função]  - função para ser acionada ao clicar em Selecionar
  // opcoes           [array]   - Objeto com pares das opções a serem exibidas no Picker
  //                              Ex: [
  //                                    { id: 1, label: 'Solteiro' },
  //                                    { id: 2, label: 'Casado/União Estável' },
  //                                    { id: 3, label: 'Divorciado' },
  //                                  ]
  //
  const PickerItemIOS = PickerIOS.Item;
  const { nome, visivel, valor, fechar, opcoes, retorno } = props;

  return (
    <Modal transparent visible={visivel} animationType="fade" onRequestClose={() => fechar(nome)}>
      <View style={styles.modalMsg_viewContainer}>
        <View style={styles.modalMsg_viewFundo} />

        <View style={styles.modalMsg_viewCaixa}>
          <View style={styles.pickerIOS_closeButtonContainer}>
            <TouchableHighlight onPress={() => fechar(nome)} underlayColor="transparent" style={styles.pickerIOS_closeButton}>
              <Text style={styles.pickerIOS_closeButtonText}>Selecionar</Text>
            </TouchableHighlight>
          </View>
          <PickerIOS selectedValue={valor} onValueChange={opcao => retorno(opcao)}>
            {opcoes.map(item => <PickerItemIOS key={item.id} value={item.value} label={item.label} />)}
          </PickerIOS>
        </View>
      </View>
    </Modal>
  );

  //   <Modal transparent visible={props.visivel} animationType="fade" onRequestClose={() => fechar()}>
  //     <View style={styles.modalMsg_viewContainer}>
  //       <View style={styles.modalMsg_viewFundo} />

  //       <View style={styles.modalMsg_viewCaixa}>
  //         <Text style={styles.modalMsg_titulo}>{erro.titulo}</Text>
  //         <Text style={styles.modalMsg_descricao}>{erro.descricao}</Text>
  //         <Text style={styles.modalMsg_solucao}>{erro.solucao}</Text>
  //         <TouchableOpacity style={styles.modalMsg_botao} onPress={() => fechar()}>
  //           <Text style={styles.modalMsg_textoBotao}>OK</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   </Modal>
  // );
};
