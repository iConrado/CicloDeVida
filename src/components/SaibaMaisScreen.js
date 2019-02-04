import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, TextInput, Switch } from 'react-native';

import styles from './functions/styles';
import Cabecalho from './functions/Cabecalho';
import ModalMsg from './functions/ModalMsg';
import Erro from './functions/Erro';
import validaEmail from './functions/validaEmail';
import validaTel from './functions/validaTel';
import enviarEmail from './functions/enviarEmail';

import Ciclo from './functions/Ciclo';
import Storage from './functions/Storage';

let objErro = {};

const C = new Ciclo();
const stor = new Storage();
const replay = require('../imgs/replay.png');

export default class SaibaMaisScreen extends React.Component {
  static navigationOptions = ({ navigation }) => Cabecalho(navigation, 'Consultoria Ciclo de Vida');

  constructor(props) {
    super(props);
    this.state = {
      confirmar: false,
      permiteEmail: true,
      permiteTel: true,
      id: '',
      nome: '',
      email: '',
      tel: '',
      modalMsg: false,
    };

    this.refNome = elem => {
      this.nome = elem;
    };
    this.refEmail = elem => {
      this.email = elem;
    };
    this.refTel = elem => {
      this.tel = elem;
    };
    this.focusNome = () => {
      if (this.nome) this.nome.focus();
    };
    this.focusEmail = () => {
      if (this.email) this.email.focus();
    };
    this.focusTel = () => {
      if (this.tel) this.tel.focus();
    };

    this.fechaErro = this.fechaErro.bind(this);
    this.abreErro = this.abreErro.bind(this);

    this.proxTela = this.proxTela.bind(this);
  }

  componentDidMount() {
    this.montagem();
  }

  montagem() {
    const { id } = stor;
    const nome = C.getNome();
    const email = C.getEmail();

    this.setState({ id, nome, email });
  }

  abreErro(e) {
    objErro = e;
    this.setState({ modalMsg: true });
  }

  fechaErro() {
    this.setState({ modalMsg: false });
    objErro = {};
  }

  switchEmail() {
    const status = !this.state.permiteEmail;
    this.setState({ permiteEmail: status });
  }

  switchTel() {
    const status = !this.state.permiteTel;
    this.setState({ permiteTel: status });
  }

  async conhecer() {
    const { confirmar, permiteEmail, permiteTel, id, nome, email, tel } = this.state;

    if (confirmar) {
      const dados = {
        id,
        nome,
        permiteEmail,
        email,
        permiteTel,
        tel,
        timestamp: new Date(),
      };

      if (await !enviarEmail(dados)) {
        // registrar erro no banco de dados
      }
      this.proxTela();
    } else {
      this.setState({ confirmar: true });
    }
  }

  proxTela() {
    // Função que valida os campos e submete os dados para registro na classe de negócio.
    // Em caso de algum retorno com erro, executa a abertura da tela de erros.
    // Validação das regras de negócio, registro e gravação de log
    const { navigate } = this.props.navigation;
    const { permiteEmail, permiteTel, nome, email, tel } = this.state;

    // Nome
    if (nome.trim().length < 6) {
      this.abreErro(Erro.t01, 0);
      this.focusNome();
      return false;
    }
    if (!nome.match(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ. -]+$/)) {
      this.abreErro(Erro.t02, 0);
      this.focusNome();
      return false;
    }

    // Email
    if (permiteEmail) {
      if (!validaEmail(email)) {
        this.abreErro(Erro.t07, 0);
        this.focusEmail();
        return false;
      }
    }

    // Tel
    if (permiteTel) {
      if (!validaTel(tel)) {
        this.abreErro(Erro.t12, 0);
        this.focusTel();
        return false;
      }
    }

    navigate('Final');

    return true;
  }

  refazerSim() {
    this.props.navigation.popToTop();
  }

  render() {
    const { confirmar } = this.state;

    return (
      <View style={styles.tela}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container} keyboardDismissMode="none" keyboardShouldPersistTaps="always">
          {/* Camada Modal que intercepta erros e exibe uma mensagem personalizada na tela */}
          <ModalMsg visivel={this.state.modalMsg} fechar={this.fechaErro} objErro={objErro} />
          {/* **************************************************************************** */}

          <View style={styles.viewTitulo}>
            <Text style={styles.titulo}>Saiba Mais</Text>
          </View>

          <View style={styles.saiba_viewContainer}>
            <View style={[styles.saiba_viewTit, styles.saiba_viewBorda]}>
              <Text style={styles.saiba_textTit}>Aprenda a organizar sua vida financeira e alcance seus objetivos!</Text>
            </View>

            <View style={styles.saiba_viewTit}>
              <Text style={styles.saiba_textTit}>
                Deixe-nos apresentar o COACHING FINANCEIRO e obtenha a orientação necessária para tomar as rédeas de suas finanças.
              </Text>
            </View>

            {confirmar ? (
              <View>
                <View style={styles.saiba_viewHoriz}>
                  <Text>Nome:</Text>
                  <TextInput
                    ref={this.refNome}
                    style={styles.saiba_input}
                    autoCapitalize="characters"
                    maxLength={50}
                    selectTextOnFocus
                    autoCorrect={false}
                    underlineColorAndroid="#EAEAEA"
                    onChangeText={text => this.setState({ nome: text.toUpperCase() })}
                    value={this.state.nome}
                  />
                </View>

                <View style={styles.saiba_viewHoriz}>
                  <Switch onValueChange={() => this.switchEmail()} value={this.state.permiteEmail} />
                  <TextInput
                    ref={this.refEmail}
                    style={styles.saiba_input}
                    autoCapitalize="characters"
                    maxLength={50}
                    selectTextOnFocus
                    autoCorrect={false}
                    underlineColorAndroid="#EAEAEA"
                    editable={this.state.permiteEmail}
                    onChangeText={text => this.setState({ email: text.toLowerCase() })}
                    value={this.state.email}
                  />
                </View>

                <View style={styles.saiba_viewHoriz}>
                  <Switch onValueChange={() => this.switchTel()} value={this.state.permiteTel} />
                  <TextInput
                    ref={this.refTel}
                    style={styles.saiba_input}
                    autoCapitalize="characters"
                    maxLength={50}
                    selectTextOnFocus
                    autoCorrect={false}
                    placeholder="(__) _____-____"
                    underlineColorAndroid="#EAEAEA"
                    editable={this.state.permiteTel}
                    onChangeText={text => this.setState({ tel: text.toLowerCase() })}
                    value={this.state.tel}
                  />
                </View>
              </View>
            ) : null}

            <View style={styles.saiba_viewTit}>
              <TouchableOpacity
                style={styles.botao}
                onPress={() => {
                  this.conhecer();
                }}
              >
                <Text style={styles.txtBotao}>{confirmar ? 'CONFIRMAR' : 'CONHECER SEM COMPROMISSO'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.result_viewRodape}>
          <TouchableOpacity onPress={() => this.refazerSim()} style={{ flexDirection: 'row' }}>
            <Image source={replay} style={{ height: 20, width: 20 }} />
            <Text>Refazer a Simulação</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
