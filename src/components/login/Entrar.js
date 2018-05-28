import React from 'react';
import { View, ScrollView, ActivityIndicator, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from '../functions/styles';
import { conectar } from './conectar';
import validaEmail from '../functions/validaEmail';

export default class Entrar extends React.Component {
  static navigationOptions = {
    title: 'Entrar',
  };

  constructor(props) {
    super(props);
    this.state = {
      status: 'entrar',
      email: '',
      senha: '',
      atualizando: false,
    };
  }

  validar() {
    const { email } = this.state;

    if (validaEmail(email)) {
      return true;
    }
    return false;
  }

  async entrar() {
    const { email, senha } = this.state;

    if (!this.validar()) {
      this.setState({ status: 'erro', atualizando: false, erro: 'Formato de email inválido.' });
      return false;
    }

    this.setState({ status: 'entrar', atualizando: true });

    const conexao = await conectar(email, senha);

    if (conexao !== true) {
      this.setState({ status: 'erro', atualizando: false, erro: conexao.msg });
      return false;
    }

    // if (conexao === true) {
    //   navigate('App');
    //   return true;
    // }

    // this.setState({ status: 'erro', atualizando: false, erro: conexao.msg });
    // return false;
  }

  render() {
    const { navigate, goBack } = this.props.navigation;

    if (this.state.status === 'cadastrado') {
      return (
        <View style={styles.cadastro_viewContainer}>
          <Text>Login realizado com sucesso!</Text>
          <TouchableOpacity style={[styles.cadastro_botao, styles.cadastro_criarConta]} onPress={() => navigate('App')}>
            <Text style={styles.cadastro_textoBotao}>Continuar no aplicativo</Text>
          </TouchableOpacity>
        </View>
      );
    }
    // Retorno padrão: tela de cadastro de conta
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.cadastro_viewContainer}
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.login_viewTitulo}>
          <Text style={styles.login_textoSubTitulo}>Entrar com email e senha</Text>
        </View>

        {this.state.status === 'erro' ? <Text style={styles.cadastro_textoErro}>{this.state.erro}</Text> : null}

        {this.state.atualizando ? (
          <View>
            <ActivityIndicator animating size="small" color="#2561C7" />
            <Text>Aguarde um instante...</Text>
          </View>
        ) : null}

        <Text style={styles.cadastro_label}>Email:</Text>
        <TextInput
          style={styles.cadastro_input}
          keyboardType="email-address"
          maxLength={50}
          autoCorrect={false}
          underlineColorAndroid="#FFF"
          editable={!this.state.atualizando}
          placeholder="email"
          underlineColorAndroid="#EAEAEA"
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />

        <Text style={styles.cadastro_label}>Senha:</Text>
        <TextInput
          secureTextEntry
          style={styles.cadastro_input}
          keyboardType="default"
          maxLength={20}
          autoCorrect={false}
          underlineColorAndroid="#FFF"
          editable={!this.state.atualizando}
          placeholder="senha"
          underlineColorAndroid="#EAEAEA"
          onChangeText={text => this.setState({ senha: text })}
          value={this.state.senha}
        />

        <TouchableOpacity
          style={[styles.cadastro_botao, styles.cadastro_criarConta]}
          onPress={() => this.entrar()}
          disabled={this.state.atualizando}
        >
          <Text style={styles.cadastro_textoBotao}>Conectar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.cadastro_botao, styles.cadastro_cancelar]} onPress={() => goBack()} disabled={this.state.atualizando}>
          <Text style={styles.cadastro_textoBotao}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
