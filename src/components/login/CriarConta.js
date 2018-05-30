import React from 'react';
import { View, ScrollView, ActivityIndicator, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from '../functions/styles';
import validaEmail from '../functions/validaEmail';
import { cadastrarComEmailESenha } from '../login/conectar';

export default class CriarConta extends React.Component {
  static navigationOptions = {
    title: 'Criar Conta',
  };

  constructor(props) {
    super(props);
    this.state = {
      status: 'criar',
      email: '',
      senha: '',
      confirmarSenha: '',
      atualizando: false,
    };
  }

  validar() {
    const { email, senha, confirmarSenha } = this.state;

    if (!validaEmail(email)) {
      return 'Formato de email inválido.';
    }

    if (senha.length < 6) {
      return 'A senha precisa ter no mínimo 6 caracteres.';
    }

    if (senha !== confirmarSenha) {
      return 'As senhas não conferem.';
    }

    return true;
  }

  async criarConta() {
    const { email, senha } = this.state;

    const validacao = this.validar();

    if (validacao !== true) {
      this.setState({ status: 'erro', atualizando: false, erro: validacao });
      return false;
    }

    this.setState({ status: 'criar', atualizando: true });

    const cadastro = await cadastrarComEmailESenha(email, senha);

    if (cadastro !== true) {
      await this.setState({ status: 'erro', atualizando: false, erro: cadastro.msg });
      return false;
    }

    return true;
  }

  render() {
    const { navigate, goBack } = this.props.navigation;

    if (this.state.status === 'cadastrado') {
      return (
        <View style={styles.cadastro_viewContainer}>
          <Text style={styles.cadastro_textoSucesso}>Cadastro realizado com sucesso!</Text>
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
          <Text style={styles.login_textoSubTitulo}>Cadastre-se</Text>
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
          selectTextOnFocus
          style={styles.cadastro_input}
          keyboardType="email-address"
          maxLength={50}
          autoCorrect={false}
          underlineColorAndroid="#FFF"
          editable={!this.state.atualizando}
          placeholder="email"
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />

        <Text style={styles.cadastro_label}>Senha:</Text>
        <TextInput
          selectTextOnFocus
          secureTextEntry
          style={styles.cadastro_input}
          keyboardType="default"
          maxLength={20}
          autoCorrect={false}
          underlineColorAndroid="#FFF"
          editable={!this.state.atualizando}
          placeholder="senha"
          onChangeText={text => this.setState({ senha: text })}
          value={this.state.senha}
        />

        <Text style={styles.cadastro_label}>Confirmar senha:</Text>
        <TextInput
          selectTextOnFocus
          secureTextEntry
          style={styles.cadastro_input}
          keyboardType="default"
          maxLength={20}
          autoCorrect={false}
          underlineColorAndroid="#FFF"
          editable={!this.state.atualizando}
          placeholder="confirmar senha"
          onChangeText={text => this.setState({ confirmarSenha: text })}
          value={this.state.confirmarSenha}
        />

        <TouchableOpacity
          style={[styles.cadastro_botao, styles.cadastro_criarConta]}
          onPress={() => this.criarConta()}
          disabled={this.state.atualizando}
        >
          <Text style={styles.cadastro_textoBotao}>Cadastrar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.cadastro_botao, styles.cadastro_cancelar]} onPress={() => goBack()} disabled={this.state.atualizando}>
          <Text style={styles.cadastro_textoBotao}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
