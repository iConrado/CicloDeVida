import React from 'react';
import { TouchableNativeFeedback, ScrollView, View, Text, Image } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';

import styles from './styles';
import logout from './logout';
import { getUser } from './conectar';

const imgFotoPadrao = require('../../imgs/person.png');

const MenuDrawer = props => {
  const { displayName, photoURL } = getUser();
  const foto = photoURL ? { uri: photoURL } : imgFotoPadrao;
  const nome = displayName || 'Novo usuário';

  return (
    <ScrollView alwaysBounceVertical={false}>
      <SafeAreaView style={styles.tela} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawer_viewCabecalho}>
          <Text style={styles.drawer_txTitulo}>Menu</Text>
          <View style={styles.drawer_viewFoto}>
            <Image style={styles.drawer_imgFoto} source={foto} />
          </View>
          <Text style={styles.drawer_txNome}>{nome}</Text>
        </View>
        <DrawerItems {...props} />
        <TouchableNativeFeedback
          onPress={() => {
            logout();
          }}
        >
          <View style={styles.drawer_viewItem}>
            <Text style={styles.drawer_txItem}>Sair</Text>
          </View>
        </TouchableNativeFeedback>
      </SafeAreaView>
    </ScrollView>
  );
};

export default MenuDrawer;
