import React from 'react';

import { 
  StyleSheet, 
  View, 
  Text, 
  Modal,  
  TouchableOpacity, 
} from 'react-native';

const erroPadrao = {
  titulo: 'Erro',
  descricao: 'O aplicativo se comportou de maneira inesperada.',
  solucao: 'Tente conferir os dados, voltar uma tela ou reiniciar o app.'
};

export default class ModalErro extends React.Component {

  // Componente para apresentação de uma tela de erros
  //
  // Props esperadas: 
  // visivel  [boolean] - estado repassado para informar se a tela estará visível ou não
  // fechar() [função]  - função para ser acionada para fechar a janela 
  //                      (necessita bind no componente de origem)
  // objErro  [objeto]  - objeto contendo as descrições do erro. na ausência será retornada 
  //                      uma mensagem padrão, retornando ao aplicativo

  render() {
    const erro = this.props.objErro || erroPadrao;

    return (
      <Modal 
        transparent
        visible={this.props.visivel}
        animationType={'fade'}
        onRequestClose={() => this.props.fechar()}
      >
        <View style={styles.container}>
          <View style={styles.fundo} />
          
          <View style={styles.caixa}>
            <Text style={styles.titulo}>{erro.titulo}</Text>
            <Text style={styles.descricao}>{erro.descricao}</Text>
            <Text style={styles.solucao}>{erro.solucao}</Text>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => this.props.fechar()}
            >
              <Text style={styles.textoBotao}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fundo: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    opacity: 0.8,
    zIndex: 1,
  },
  caixa: {
    position: 'absolute',
    width: '80%',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    zIndex: 2
  },
  titulo: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  descricao: {
    fontSize: 14,
    marginBottom: 5,
  },
  solucao: {
    fontSize: 14,
  }, 
  textoBotao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginHorizontal: 5,
  },
  botao: {
    alignSelf: 'center',
    alignItems: 'center',
    minWidth: '30%',
    paddingVertical: 4,
    marginTop: 10,
    borderRadius: 2,
    elevation: 4,
    backgroundColor: '#5C86F5'
  },
});
