import React from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './functions/styles';
import { conectarComFacebook, conectarComGoogle } from './login/conectar';

const facebook = require('../imgs/facebook.png');
const google = require('../imgs/google.jpg');

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    this.state = {
      status: 'logar',
      atualizando: false,
      erro: '',
    };
  }

  async entrarFacebook() {
    try {
      await this.setState({ status: 'logar', atualizando: true });
      const conexao = await conectarComFacebook();

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
    try {
      await this.setState({ status: 'logar', atualizando: true });
      const conexao = await conectarComGoogle();

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

          <TouchableOpacity
            style={[styles.login_botao, styles.login_google]}
            disabled={this.state.atualizando}
            onPress={async () => this.entrarGoogle()}
          >
            <View style={{ flexDirection: 'row' }}>
              <Image style={styles.login_imgGoogle} source={google} />
              <Text style={styles.login_textoBotaoGoogle}>Entrar com Google</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.login_botao, styles.login_cadastrar]}
            onPress={() => navigate('Entrar')}
            disabled={this.state.atualizando}
          >
            <Text style={styles.login_textoBotao}>Entrar com email e senha</Text>
          </TouchableOpacity>

          <View style={styles.login_viewOpcoes}>
            <TouchableOpacity onPress={() => navigate('Esqueci')} disabled={this.state.atualizando}>
              <Text style={styles.login_textoLink}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate('SignUp')} disabled={this.state.atualizando}>
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
