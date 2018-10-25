import { Platform } from 'react-native';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';

import Storage from './Storage';
import Ciclo from './Ciclo';

const salvarPrivacidade = async () => {
  const d = new Date();
  const C = new Ciclo();
  await C.recuperar();
  if (!C.getPoliticaPrivacidade()) {
    C.setPoliticaPrivacidade(d);
    C.salvar();
  }
};

export const getUser = () => firebase.auth().currentUser;

export const storageConfig = async () => {
  const stor = new Storage();
  await stor.config(getUser().uid, 'simulacao');
};

export const cadastrarComEmailESenha = async (email, senha, aceitePrivacidade) => {
  const erro = {};

  try {
    await firebase
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

    if (erro.code) {
      return erro;
    }

    await storageConfig();
    if (aceitePrivacidade) {
      salvarPrivacidade();
    }

    return true;
  } catch (e) {
    erro.msg = e.errorMessage;
    return erro;
  }
};

export const conectar = async (email, senha, aceitePrivacidade) => {
  const erro = {};
  try {
    // signInWithEmailAndPassword
    await firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(email, senha)
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

    if (erro.code) {
      return erro;
    }

    await storageConfig();
    if (aceitePrivacidade) {
      salvarPrivacidade();
    }

    return true;
  } catch (e) {
    erro.msg = e.errorMessage;
    return erro;
  }
};

export const setupGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({ autoResolve: true });
    if (Platform.OS === 'android') {
      await GoogleSignin.configure({
        offlineAccess: true,
      });
    } else {
      await GoogleSignin.configure({
        iosClientId: '508485733058-gi6tb3kbafmss963tf52v7861ohldogd.apps.googleusercontent.com',
      });
    }
    return true;
  } catch (err) {
    return false;
  }
};

export const conectarComGoogle = async aceitePrivacidade => {
  const erro = {};
  let user;
  try {
    user = await GoogleSignin.signIn();
  } catch (error) {
    if (error.code === 'CANCELED') {
      return false;
    }
    return false;
  }

  try {
    const credential = await firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken);

    await firebase
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

    if (erro.code) {
      return erro;
    }

    await storageConfig();
    if (aceitePrivacidade) {
      salvarPrivacidade();
    }

    return true;
  } catch (e) {
    return e;
  }
};

export const conectarComFacebook = async aceitePrivacidade => {
  // native_only config will fail in the case that the user has
  // not installed in his device the Facebook app. In this case we
  // need to go for webview.
  const erro = {};
  let result;

  try {
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('NATIVE_ONLY');
    } else {
      LoginManager.setLoginBehavior('web');
    }
    result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
  } catch (nativeError) {
    try {
      LoginManager.setLoginBehavior('WEB_VIEW_ONLY');
      result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
    } catch (error) {
      erro.code = error.code;
      erro.code = 'Este dispositivo está impossibilitado de fazer login pelo Facebook.';
      return erro;
    }
  }
  // handle the case that users clicks cancel button in Login view
  if (!result.isCancelled) {
    const { accessToken } = await AccessToken.getCurrentAccessToken();
    const credential = await firebase.auth.FacebookAuthProvider.credential(accessToken);
    await firebase
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
        return erro;
      });

    await storageConfig();
    if (aceitePrivacidade) {
      salvarPrivacidade();
    }

    return true;
  }
  return false;
};
