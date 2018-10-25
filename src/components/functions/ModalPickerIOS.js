import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableHighlight, Dimensions, Animated, PickerIOS } from 'react-native';

// import styles from './styles';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const showtimes = [{ time: '12:30' }, { time: '2:30' }, { time: '4:30' }, { time: '5:30' }, { time: '6:30' }, { time: '7:00' }, { time: '8:30' }];
const PickerItemIOS = PickerIOS.Item;

export default class ModalPickerIOS extends React.Component {
  // Componente para apresentação de uma tela de erros
  //
  // Props esperadas:
  // visivel          [boolean] - estado repassado para informar se a tela estará visível ou não
  // fechar()         [função]  - função para ser acionada para fechar a janela
  //                              (necessita bind no componente de origem)
  // retorno()        [função]  - função para ser acionada ao clicar em Selecionar
  // opcoes           [array]   - Objeto com pares das opções a serem exibidas no Picker
  //                              Ex: [
  //                                    { id: 1, label: 'Solteiro' },
  //                                    { id: 2, label: 'Casado/União Estável' },
  //                                    { id: 3, label: 'Divorciado' },
  //                                  ]
  //

  constructor(props) {
    super(props);
    this.state = {
      option: 1,
      modal: false,
      optionIndex: 0,
      offSet: new Animated.Value(deviceHeight),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.offSet, {
      duration: 300,
      toValue: 100,
    }).start();
  }

  closeModal() {
    Animated.timing(this.state.offSet, {
      duration: 300,
      toValue: deviceHeight,
    }).start(this.props.fechar);
  }

  render() {
    const { visivel, valor, fechar, opcoes, retorno } = this.props;

    return (
      <Animated.View style={{ transform: [{ translateY: this.state.offSet }] }}>
        <View style={styles.closeButtonContainer}>
          <TouchableHighlight onPress={this.closeModal} underlayColor="transparent" style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Selecionar</Text>
          </TouchableHighlight>
        </View>
        <PickerIOS selectedValue={this.props.valor} onValueChange={opcao => this.props.retorno(opcao)}>
          {opcoes.map(item => <PickerItemIOS key={item.id} value={item.id} label={item.label} />)}
        </PickerIOS>
      </Animated.View>
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
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  showtimeContainer: {
    borderTopColor: '#ededed',
    borderTopWidth: 1,
  },
  showtime: {
    padding: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 25,
    marginBottom: 25,
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopColor: '#e2e2e2',
    borderTopWidth: 1,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1,
  },
  closeButton: {
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
  },
  closeButtonText: {
    color: '#027afe',
  },
});
