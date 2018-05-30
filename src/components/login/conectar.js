import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import Expo from 'expo';

import CONST from '../functions/constantes';

export const cadastrarComEmailESenha = async (email, senha) => {
  const erro = {};

  try {
    const credencial = await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        const cred = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, senha)
          .catch(error => {
            erro.code = error.code;

            switch (error.code) {
              case 'auth/invalid-email':
                erro.msg = 'Endereço de email inválido.';
                break;

              case 'auth/email-already-in-use':
                erro.msg = 'Email já cadastrado.';
                break;

              case 'auth/operation-not-allowed':
                erro.msg = 'Operação não permitida no momento. Tente novamente mais tarde.';
                break;

              case 'auth/weak-password':
                erro.msg = 'Senha muito simples. Tente usar uma senha com pelo menos 6 caracteres entre letras e números.';
                break;

              default:
                erro.msg = 'Ocorreu um erro desconhecido ou a aplicação está indisponível neste momento. Por favor, tentar novamente mais tarde.';
            }
          });

        return cred;
      });

    if (erro.code) {
      return erro;
    }

    await AsyncStorage.setItem('userToken', JSON.stringify(credencial));
    return true;
  } catch (e) {
    erro.msg = e.errorMessage;
    return erro;
  }
};

export const conectar = async (email, senha) => {
  const erro = {};
  try {
    const credencial = await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        const cred = await firebase
          .auth()
          .signInWithEmailAndPassword(email, senha)
          .catch(error => {
            erro.code = error.code;

            switch (error.code) {
              case 'auth/invalid-email':
                erro.msg = 'Email/senha inválido(a).';
                break;

              case 'auth/user-disabled':
                erro.msg = 'Esta conta está desabilitada no momento.';
                break;

              case 'auth/user-not-found':
                erro.msg = 'Conta não encontrada.';
                break;

              case 'auth/wrong-password':
                erro.msg = 'Email/senha inválido(a).';
                break;

              default:
                erro.msg = 'Ocorreu um erro desconhecido ou a aplicação está indisponível neste momento. Por favor, tentar novamente mais tarde.';
            }
          });

        return cred;
      });

    if (erro.code) {
      return erro;
    }

    await AsyncStorage.setItem('userToken', JSON.stringify(credencial));
    return true;
  } catch (e) {
    erro.msg = e.errorMessage;
    return erro;
  }
};

export const conectarComGoogle = async () => {
  const erro = {};

  try {
    const { type, idToken, accessToken } = await Expo.Google.logInAsync({
      androidClientId: CONST.androidClientId,
      iosClientId: CONST.iosClientId,
      scopes: ['profile', 'email'],
    });

    if (type === 'success') {
      const credential = await firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);

      const credencial = await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(async () => {
          const cred = await firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .catch(error => {
              erro.code = error.code;

              switch (error.code) {
                case 'auth/account-exists-with-different-credential':
                  erro.msg = 'Credencial existente em outra conta.';
                  break;

                case 'auth/invalid-credential':
                  erro.msg = 'Credencial inválida. Por favor, conecte-se novamente.';
                  break;

                case 'auth/operation-not-allowed':
                  erro.msg = 'Operação não permitida neste momento. Tente novamente mais tarde.';
                  break;

                case 'auth/user-disabled':
                  erro.msg = 'Conta desabilitada.';
                  break;

                case 'auth/user-not-found':
                  erro.msg = 'Conta não encontrada.';
                  break;

                case 'auth/wrong-password':
                  erro.msg = 'Senha inválida.';
                  break;

                case 'auth/invalid-verification-code':
                  erro.msg = 'Código de verificação inválido.';
                  break;

                case 'auth/invalid-verification-id':
                  erro.msg = 'Código de verificação inválido.';
                  break;

                default:
                  erro.msg = 'Ocorreu um erro desconhecido ou a aplicação está indisponível neste momento. Por favor, tentar novamente mais tarde.';
              }
            });
          return cred;
        });

      if (erro.code) {
        return erro;
      }

      await AsyncStorage.setItem('userToken', JSON.stringify(credencial));
      return true;
    }
  } catch (e) {
    return e;
  }
  return false;
};

export const conectarComFacebook = async () => {
  const erro = {};
  try {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(CONST.facebookID, { permissions: ['public_profile', 'email'] });

    if (type === 'success') {
      const credential = await firebase.auth.FacebookAuthProvider.credential(token);

      // PARA OBTER INFORMAÇÕES DO USUARIO, USAR O CODIGO ABAIXO:
      // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      // const user = await response.json();

      // console.log('user', user);

      // Sign in with credential from the Facebook user.
      const credencial = await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(async () => {
          const cred = await firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .catch(error => {
              erro.code = error.code;

              switch (error.code) {
                case 'auth/account-exists-with-different-credential':
                  erro.msg = 'Credencial existente em outra conta.';
                  break;

                case 'auth/invalid-credential':
                  erro.msg = 'Credencial inválida. Por favor, conecte-se novamente.';
                  break;

                case 'auth/operation-not-allowed':
                  erro.msg = 'Operação não permitida neste momento. Tente novamente mais tarde.';
                  break;

                case 'auth/user-disabled':
                  erro.msg = 'Conta desabilitada.';
                  break;

                case 'auth/user-not-found':
                  erro.msg = 'Conta não encontrada.';
                  break;

                case 'auth/wrong-password':
                  erro.msg = 'Senha inválida.';
                  break;

                case 'auth/invalid-verification-code':
                  erro.msg = 'Código de verificação inválido.';
                  break;

                case 'auth/invalid-verification-id':
                  erro.msg = 'Código de verificação inválido.';
                  break;

                default:
                  erro.msg = 'Ocorreu um erro desconhecido ou a aplicação está indisponível neste momento. Por favor, tentar novamente mais tarde.';
              }
            });
          return cred;
        });

      if (erro.code) {
        return erro;
      }

      await AsyncStorage.setItem('userToken', JSON.stringify(credencial));
      return true;
    }
  } catch (e) {
    return e;
  }
  return false;
};
