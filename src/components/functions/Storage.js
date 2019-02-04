import firebase from 'react-native-firebase';

export default class Storage {
  constructor() {
    if (!Storage.instance) {
      Storage.instance = this;
    }

    return Storage.instance;
  }

  async config(uid, item) {
    if (!uid || typeof uid !== 'string' || uid.length === 0) {
      return false;
    }
    if (!item || typeof item !== 'string' || item.length === 0) {
      return false;
    }
    try {
      const db = firebase.database();
      this.id = uid;
      this.ref = db.ref(`users/${uid}/${item}`);
      this.settingsref = db.ref('settings');
      return true;
    } catch (e) {
      return false;
    }
  }

  async gravar(dado) {
    if (!this.ref) {
      return false;
    }

    if (!dado || typeof dado !== 'object') {
      return false;
    }

    try {
      await this.ref.set(dado);
      return true;
    } catch (e) {
      return false;
    }
  }

  async recuperar() {
    if (!this.ref) {
      return false;
    }

    try {
      const resp = await this.ref.once('value').then(snapshot => snapshot.val());
      return resp;
    } catch (e) {
      return false;
    }
  }

  async appSettings() {
    if (!this.settingsref) {
      return false;
    }

    try {
      const resp = await this.settingsref.once('value').then(snapshot => snapshot.val());
      return resp;
    } catch (e) {
      return false;
    }
  }

  async remover() {
    if (!this.ref) {
      return false;
    }

    try {
      await this.ref.remove();
      return true;
    } catch (e) {
      return false;
    }
  }
}
