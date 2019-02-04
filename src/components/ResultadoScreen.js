import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Timer from 'react-native-timer';

import styles from './functions/styles';
import Cabecalho from './functions/Cabecalho';
import MensagemResultado from './resultado/MensagemResultado';
import GraficoPizza from './resultado/GraficoPizza';
import GraficoBarra from './resultado/GraficoBarra';
import CarregandoResultado from './functions/CarregandoResultado';
import ModalMsg from './functions/ModalMsg';
// import Controle from './functions/Controle';
import Ciclo from './functions/Ciclo';

const C = new Ciclo();
const objErro = {};

export default class ResultadoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => Cabecalho(navigation, 'Consultoria Ciclo de Vida');

  constructor(props) {
    super(props);
    this.state = {
      carregado: false,
      modalMsg: false,
      resultado: false,
    };
    this.fechaErro = this.fechaErro.bind(this);
    this.abreErro = this.abreErro.bind(this);

    this.proxTela = this.proxTela.bind(this);
  }

  componentDidMount() {
    this.montagem();
  }
  componentWillUnmount() {
    Timer.clearTimeout('resultado');
  }

  montagem() {
    C.addVisualizacaoResultado();
    C.salvar();
    this.analise = C.resultadoAnalise();
    const { gastos, reserva, aposentadoria, seguranca, patrimonio, comprometimentoTotal, resultado } = this.analise;
    this.comprometimentoTotal = parseInt(comprometimentoTotal * 100, 10);
    this.nomes = ['Reserva', 'Patrimônio', 'Segurança', 'Aposentadoria', 'Gastos', comprometimentoTotal < 1 ? 'Salário não utilizado' : null];
    this.valores = [
      reserva.valor,
      patrimonio.valor,
      seguranca.valor,
      aposentadoria.valor,
      gastos.valor,
      comprometimentoTotal < 1 ? parseInt(C.getSalLiq() * (1 - comprometimentoTotal), 10) : null,
    ];
    this.max = parseInt(Math.max(...this.valores, gastos.meta) * 1.1, 10);
    // this.max = parseInt(Math.ceil(Math.max(...this.valores) / 2000) * 2000, 10) + 1000;

    Timer.setTimeout(
      'resultado',
      () => {
        this.setState({ carregado: true, resultado });
      },
      2000,
    );
  }

  abreErro() {
    // objErro = e;
    this.setState({ modalMsg: true });
  }

  fechaErro() {
    this.setState({ modalMsg: false });
    // objErro = {};
  }

  proxTela() {
    // Função que valida os campos e submete os dados para registro na classe de negócio.
    // Em caso de algum retorno com erro, executa a abertura da tela de erros.
    // Validação das regras de negócio, registro e gravação de log
    const { navigate } = this.props.navigation;
    navigate('SaibaMais');

    return true;
  }

  render() {
    const corMeta = '#787885';
    const corSimulacaoPos = '#42B1F2';
    const corSimulacaoNeg = '#D14949';

    if (!this.state.carregado) {
      return <CarregandoResultado />;
    }
    return (
      <View style={styles.tela}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.container} keyboardDismissMode="none" keyboardShouldPersistTaps="always">
          {/* Camada Modal que intercepta erros e exibe uma mensagem personalizada na tela */}
          <ModalMsg visivel={this.state.modalMsg} fechar={this.fechaErro} objErro={objErro} />
          {/* **************************************************************************** */}

          <View style={styles.viewTitulo}>
            <Text style={styles.titulo}>Resultado</Text>
          </View>

          {/* Componente que exibe a mensagem do resultado */}
          <View style={[styles.result_viewComponente, styles.result_viewResultado]}>
            {this.state.resultado ? <MensagemResultado resultado /> : <MensagemResultado />}
          </View>

          <View style={styles.result_viewComponente}>
            <Text style={styles.result_txResultado}>Distribuição da renda líquida</Text>
            <GraficoPizza nomes={this.nomes} valores={this.valores} />
            {this.comprometimentoTotal > 100 ? (
              <View>
                <Text style={styles.result_txComprometimento}>Nesta simulação você comprometeu:</Text>
                <Text style={styles.result_txComprometimento}>{`${this.comprometimentoTotal}% de sua renda líquida.`}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.result_viewComponente}>
            <Text style={styles.result_txResultado}>Sua performance</Text>
            <Text style={styles.result_txGrafico}>Gastos</Text>
            {this.analise.gastos.resultado ? (
              <Text style={styles.result_txAnalisePos}>Um importante passo para alcançar o equilíbrio financeiro!</Text>
            ) : (
              <Text style={styles.result_txAnaliseNeg}>Consumir é bom. Mas é necessário equilíbrio para conseguir manter.</Text>
            )}
            <GraficoBarra
              nomes={['Meta', 'Simulação']}
              valores={[this.analise.gastos.meta, this.analise.gastos.valor]}
              corMeta={corMeta}
              corSimulacao={this.analise.gastos.resultado ? corSimulacaoPos : corSimulacaoNeg}
              max={this.max}
            />

            <Text style={styles.result_txGrafico}>Reserva</Text>
            {this.analise.reserva.resultado ? (
              <Text style={styles.result_txAnalisePos}>Parabéns! Em tempos de crise você não terá dor de cabeça!</Text>
            ) : (
              <Text style={styles.result_txAnaliseNeg}>Você não está poupando para uma possível emergência...</Text>
            )}
            <GraficoBarra
              nomes={['Meta', 'Simulação']}
              valores={[this.analise.reserva.meta, this.analise.reserva.valor]}
              corMeta={corMeta}
              corSimulacao={this.analise.reserva.resultado ? corSimulacaoPos : corSimulacaoNeg}
              max={this.max}
            />

            <Text style={styles.result_txGrafico}>Aposentadoria</Text>
            {this.analise.aposentadoria.resultado ? (
              <Text style={styles.result_txAnalisePos}>Muito bem! No futuro isso fará a diferença!</Text>
            ) : (
              <Text style={styles.result_txAnaliseNeg}>Você não está poupando para sua aposentadoria...</Text>
            )}
            <GraficoBarra
              nomes={['Meta', 'Simulação']}
              valores={[this.analise.aposentadoria.meta, this.analise.aposentadoria.valor]}
              corMeta={corMeta}
              corSimulacao={this.analise.aposentadoria.resultado ? corSimulacaoPos : corSimulacaoNeg}
              max={this.max}
            />

            <Text style={styles.result_txGrafico}>Segurança</Text>
            {this.analise.seguranca.resultado ? (
              <Text style={styles.result_txAnalisePos}>É isso aí! Mais importante do que ter é manter!</Text>
            ) : (
              <Text style={styles.result_txAnaliseNeg}>Cuidado, você não estará protegido se houver algum incidente...</Text>
            )}
            <GraficoBarra
              nomes={['Meta', 'Simulação']}
              valores={[this.analise.seguranca.meta, this.analise.seguranca.valor]}
              corMeta={corMeta}
              corSimulacao={this.analise.seguranca.resultado ? corSimulacaoPos : corSimulacaoNeg}
              max={this.max}
            />

            <Text style={styles.result_txGrafico}>Formação de patrimônio</Text>
            {this.analise.patrimonio.resultado ? (
              <Text style={styles.result_txAnalisePos}>Evoluir sempre!</Text>
            ) : (
              <Text style={styles.result_txAnaliseNeg}>Talvez seria interessante aumentar seu patrimônio...</Text>
            )}
            <GraficoBarra
              nomes={['Meta', 'Simulação']}
              valores={[this.analise.patrimonio.meta, this.analise.patrimonio.valor]}
              corMeta={corMeta}
              corSimulacao={this.analise.patrimonio.resultado ? corSimulacaoPos : corSimulacaoNeg}
              max={this.max}
            />
          </View>
        </ScrollView>

        <View style={styles.result_viewLegenda}>
          <Text style={styles.result_txLegenda}>Legenda:</Text>
          <View style={styles.result_viewItemLegenda}>
            <View style={{ height: 8, width: 20, backgroundColor: corMeta }} />
            <Text style={styles.result_txLegenda}>Meta</Text>
          </View>

          <View style={styles.result_viewItemLegenda}>
            <View style={{ height: 8, width: 20, backgroundColor: corSimulacaoPos }} />
            <Text style={styles.result_txLegenda}>Dentro do esperado</Text>
          </View>

          <View style={styles.result_viewItemLegenda}>
            <View style={{ height: 8, width: 20, backgroundColor: corSimulacaoNeg }} />
            <Text style={styles.result_txLegenda}>Fora do esperado</Text>
          </View>
        </View>
        <View style={styles.result_viewRodape}>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => {
              this.proxTela();
            }}
          >
            <Text style={styles.txtBotao}>SAIBA MAIS</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
