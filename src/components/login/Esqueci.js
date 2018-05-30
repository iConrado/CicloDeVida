import React from 'react';
import firebase from 'firebase';
import { View, ScrollView, ActivityIndicator, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from '../functions/styles';
import validaEmail from '../functions/validaEmail';

export default class Esqueci extends React.Component {
  static navigationOptions = {
    title: 'Esqueci a senha',
  };

  constructor(props) {
    super(props);
    this.state = {
      status: 'esqueci',
      email: '',
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

  async redefinir() {
    const { email } = this.state;

    if (!this.validar()) {
      this.setState({ status: 'erro', atualizando: false, erro: 'Formato de email inválido.' });
      return false;
    }

    this.setState({ status: 'esqueci', atualizando: true });

    await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(async () => {
        // Email sent.
        await this.setState({ status: 'enviado', atualizando: false });
      })
      .catch(async () => {
        // An error happened.
        const message = 'Não existe conta vinculada ao email informado.';
        await this.setState({ status: 'erro', atualizando: false, erro: message });
      });

    return true;
  }

  render() {
    const { navigate, goBack } = this.props.navigation;

    if (this.state.status === 'enviado') {
      return (
        <View style={styles.cadastro_viewContainer}>
          <Text style={styles.cadastro_textoSucesso}>As instuções para a redefinição de senha foram encaminhadas para o email informado.</Text>
          <TouchableOpacity style={[styles.cadastro_botao, styles.cadastro_criarConta]} onPress={() => navigate('SignIn')}>
            <Text style={styles.cadastro_textoBotao}>Voltar</Text>
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
          <Text style={styles.login_textoSubTitulo}>Redefinição de senha</Text>
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
          editable={!this.state.atualizando}
          placeholder="email"
          underlineColorAndroid="#EAEAEA"
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />

        <TouchableOpacity
          style={[styles.cadastro_botao, styles.cadastro_criarConta]}
          onPress={() => this.redefinir()}
          disabled={this.state.atualizando}
        >
          <Text style={styles.cadastro_textoBotao}>Redefinir senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.cadastro_botao, styles.cadastro_cancelar]} onPress={() => goBack()} disabled={this.state.atualizando}>
          <Text style={styles.cadastro_textoBotao}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
