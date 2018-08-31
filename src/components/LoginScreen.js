import React from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';

import styles from './functions/styles';
import { conectarComFacebook, conectarComGoogle } from './functions/conectar';
import ModalPoliticaPrivacidade from './termos/ModalPoliticaPrivacidade';
import ControlePrivacidade from './functions/ControlePrivacidade';

const google = require('../imgs/google.jpg');
const facebook = require('../imgs/facebook.png');

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    this.state = {
      status: 'logar',
      modalPrivacidade: false,
      aceitePrivacidade: false,
      atualizando: false,
      erro: '',
    };
    this.aceitarPrivacidade = this.aceitarPrivacidade.bind(this);
  }

  componentDidMount() {
    this.montagem();
  }

  async montagem() {
    // await AsyncStorage.removeItem('Privacidade');
    const priv = await AsyncStorage.getItem('Privacidade');
    if (!priv) {
      this.setState({ modalPrivacidade: true });
    }
  }

  async aceitarPrivacidade() {
    const control = new ControlePrivacidade();
    control.setAceitouPrivacidade(true);
    await this.setState({ modalPrivacidade: false, aceitePrivacidade: true });
  }

  async entrarFacebook() {
    const { aceitePrivacidade } = this.state;
    try {
      await this.setState({ status: 'logar', atualizando: true });
      const conexao = await conectarComFacebook(aceitePrivacidade);

      if (conexao !== true) {
        this.setState({ status: 'erro', atualizando: false, erro: conexao.msg });
        return false;
      }
    } catch (e) {
      this.setState({ status: 'logar', atualizando: false });
      return false;
    }
    return true;
  }

  async entrarGoogle() {
    const { aceitePrivacidade } = this.state;
    try {
      await this.setState({ status: 'logar', atualizando: true });
      const conexao = await conectarComGoogle(aceitePrivacidade);

      if (conexao !== true) {
        this.setState({ status: 'erro', atualizando: false, erro: conexao.msg });
        return false;
      }
    } catch (e) {
      this.setState({ status: 'logar', atualizando: false });
      return false;
    }
    return true;
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.login_viewContainer}>
        {/* Camada Modal que apresenta a politica de privacidade do App                  */}
        <ModalPoliticaPrivacidade visivel={this.state.modalPrivacidade} fechar={this.aceitarPrivacidade} />
        {/* **************************************************************************** */}
        <View style={styles.login_viewPrincipal}>
          <View style={styles.login_viewTitulo}>
            <Text style={styles.login_textoTitulo}>Consultoria</Text>
            <Text style={styles.login_textoTitulo}>Ciclo de Vida</Text>
          </View>

          {/* Mensagem em caso de erro */}
          {this.state.status === 'erro' ? <Text style={styles.login_textoErro}>{this.state.erro}</Text> : null}

          {/* Mensagem standby */}
          {this.state.atualizando ? (
            <View>
              <Text>Aguarde...</Text>
              <ActivityIndicator animating={this.state.atualizando} size="large" color="#2561C7" />
            </View>
          ) : null}
          <TouchableOpacity
            style={[styles.login_botao, styles.login_facebook]}
            onPress={() => this.entrarFacebook()}
            disabled={this.state.atualizando}
          >
            <View style={{ flexDirection: 'row' }}>
              <Image style={styles.login_imgFacebook} source={facebook} />
              <Text style={styles.login_textoBotao}>Entrar com Facebook</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.login_botao, styles.login_google]} disabled={this.state.atualizando} onPress={() => this.entrarGoogle()}>
            <View style={{ flexDirection: 'row' }}>
              <Image style={styles.login_imgGoogle} source={google} />
              <Text style={styles.login_textoBotaoGoogle}>Entrar com Google</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.login_botao, styles.login_cadastrar]}
            onPress={() => navigate('Entrar', { aceitePrivacidade: this.state.aceitePrivacidade })}
            disabled={this.state.atualizando}
          >
            <Text style={styles.login_textoBotao}>Entrar com email e senha</Text>
          </TouchableOpacity>

          <View style={styles.login_viewOpcoes}>
            <TouchableOpacity onPress={() => navigate('Esqueci')} disabled={this.state.atualizando}>
              <Text style={styles.login_textoLink}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigate('SignUp', { aceitePrivacidade: this.state.aceitePrivacidade })}
              disabled={this.state.atualizando}
            >
              <Text style={styles.login_textoLink}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.login_viewRodape}>
          <Text style={styles.login_texto}>Para sair do aplicativo, aperte o botão 'voltar' em seu aparelho.</Text>
        </View>
      </View>
    );
  }
}
