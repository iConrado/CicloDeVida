import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

// Rodapé padrão. EXPORT PADRÃO
// PROPS
// children     = componente de texto com style rodape para renderizar as alteraçõe 
//                do comprometimento de renda
// funcProxTela = função do componente originador da chamada para mudar a tela ao clicar no botão 
//                (deve possuir bind)
// tela         = nome da tela a ser chamada

export default props => {
  const { valor, funcProxTela, tela } = props;
  return (
    <View style={styles.viewRodape}>
      <View style={styles.viewRodapeResumo}>
        <View style={styles.viewRodapeResumoLabel}>
          <Text style={styles.rodape}>Comprometimento de renda atual:</Text>
        </View>
        <View style={styles.viewRodapeResumoValor}>
          <Text style={styles.rodape}>{valor}%</Text>
        </View>
      </View>

      <View style={styles.viewRodapeBotao}>
        <TouchableOpacity 
          style={styles.botao}
          onPress={() => funcProxTela(tela)}
        >
          <Text style={styles.txtBotao}>PRÓXIMA ETAPA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// export default class Rodape extends React.Component {
//   constructor(props) {
//     super(props);
//     this.funcao = _.debounce(this.funcao, 250);
//   }

//   funcao() {
//     const { funcProxTela, tela } = this.props;
//     funcProxTela(tela);
//   }

//   render() {
//     const { valor } = this.props;
//     return (
//       <View style={styles.viewRodape}>
//         <View style={styles.viewRodapeResumo}>
//           <View style={styles.viewRodapeResumoLabel}>
//             <Text style={styles.rodape}>Comprometimento de renda atual:</Text>
//           </View>
//           <View style={styles.viewRodapeResumoValor}>
//             <Text style={styles.rodape}>{valor}%</Text>
//           </View>
//         </View>

//         <View style={styles.viewRodapeBotao}>
//           <TouchableOpacity 
//             style={styles.botao}
//             onPress={() => {
//               this.funcao();
//             }}
//           >
//             <Text style={styles.txtBotao}>PRÓXIMA ETAPA</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }
