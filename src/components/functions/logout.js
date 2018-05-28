import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

const logout = async () => {
  await firebase.auth().signOut();
  AsyncStorage.removeItem('userToken');
};

export default logout;
