import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';

const logout = async () => {
  const user = await GoogleSignin.currentUserAsync();
  if (user) {
    console.log('deslogou google');
    GoogleSignin.signOut();
  }
  await firebase.auth().signOut();
};

export default logout;
