import firebase from 'firebase';

export default class Storage {
  static async gravar(item, dado) {
    if (!item || typeof item !== 'string' || item.length === 0) {
      return false;
    }

    if (!dado || typeof dado !== 'object') {
      return false;
    }

    try {
      const { uid } = firebase.auth().currentUser;
      const db = firebase.database();
      await db.ref(`users/${uid}/${item}`).set(dado);
      return true;
    } catch (e) {
      return false;
    }
  }

  static async recuperar(item) {
    if (!item || typeof item !== 'string' || item.length === 0) {
      return false;
    }

    try {
      const { uid } = firebase.auth().currentUser;
      const db = firebase.database();
      const resp = await db
        .ref(`users/${uid}/${item}`)
        .once('value')
        .then(snapshot => snapshot.val());
      return resp;
    } catch (e) {
      return false;
    }
  }

  static async remover(item) {
    if (!item || typeof item !== 'string' || item.length === 0) {
      return false;
    }

    try {
      const { uid } = firebase.auth().currentUser;
      const db = firebase.database();
      await db.ref(`users/${uid}/${item}`).remove();
      return true;
    } catch (e) {
      return false;
    }
  }
}
