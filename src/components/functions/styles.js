import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scroll: {
    flexShrink: 1,
  },
  container: {
    // flex: 1, // Não permite a scroolview rolar a tela
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  loading: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  viewTitulo: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 5,
  },
  viewBotoes: {
    width: '100%',
    alignItems: 'center',
    marginTop: 0,
  },
  viewRodape: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    alignItems: 'center',
    marginTop: 0,
    borderTopColor: '#D0D0D0',
    borderTopWidth: 1,
  },
  viewRodapeResumo: {
    flexDirection: 'row',
    flex: 6,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  viewRodapeResumoLabel: {
    flex: 7,
    alignItems: 'center',
  },
  viewRodapeResumoValor: {
    flex: 3,
    alignItems: 'center',
  },
  viewRodapeBotao: {
    flex: 4,
    alignItems: 'center',
  },
  viewHorizontal: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewVertical: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  viewCentral: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCompHoriz: {
    width: '50%',
  },
  viewIcone: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 13,
    backgroundColor: '#48AEB5',
  },
  viewPosIcone: {
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  viewLogo: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: '#0EDF29', // '#E7A730'
  },
  viewPosLogo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
  },
  viewSplash: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
  splash: {
    width: '100%',
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#14567A',
    textAlign: 'center',
  },
  label: {
    color: '#666',
  },
  rodape: {
    textAlign: 'center',
    color: '#666',
    fontWeight: 'bold',
  },
  espacador: {
    marginTop: 15,
  },
  separador: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#14567A',
  },
  botao: {
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '80%',
    maxWidth: '90%',
    paddingVertical: 4,
    borderRadius: 2,
    elevation: 4,
    backgroundColor: '#5C86F5',
  },
  negrito: {
    fontWeight: 'bold',
  },
  txtBotao: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    marginHorizontal: 5,
  },
  txValor: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  txValorPos: {
    alignSelf: 'center',
    textAlign: 'center',
    color: 'green',
  },
  txValorNeg: {
    alignSelf: 'center',
    textAlign: 'center',
    color: 'red',
  },
  imgIcone: {
    height: 35,
    width: 35,
  },
  imgLogo: {
    height: 24,
    width: 24,
  },
  // ***********************************
  // * CarregandoRsultado              *
  // ***********************************
  carregando_txResultado: {
    width: '100%',
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A2955',
  },
  // ***********************************
  // * MenuDrawer                      *
  // ***********************************
  drawer_container: {
    flex: 1,
    width: '100%',
  },
  drawer_viewCabecalho: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A2955',
    paddingVertical: 20,
    marginBottom: 10,
  },
  drawer_viewItem: {
    height: 50,
    marginTop: 20,
    paddingVertical: 4,
    paddingLeft: 16,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#DEDADA',
  },
  drawer_viewFoto: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 5,
    backgroundColor: '#FFF',
    elevation: 1,
  },
  drawer_imgFoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  drawer_txTitulo: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawer_txNome: {
    color: '#FFF',
    fontSize: 16,
  },
  drawer_viewVersao: {
    marginTop: 60,
    paddingLeft: 16,
  },
  drawer_txItem: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000DE',
  },
  // ***********************************
  // * LOGIN_SCREEN                    *
  // ***********************************
  login_viewContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  login_viewPrincipal: {
    flexShrink: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login_viewRodape: {
    height: 40,
    marginBottom: 5,
    width: '100%',
    alignItems: 'center',
  },
  login_viewTitulo: {
    width: '90%',
    marginBottom: 30,
  },
  login_viewOpcoes: {
    width: '90%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  login_botao: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  login_facebook: {
    backgroundColor: '#2561C7',
  },
  login_google: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
  },
  login_cadastrar: {
    backgroundColor: '#5BA849',
  },
  login_imgGoogle: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  login_imgFacebook: {
    height: 26,
    width: 13,
    marginRight: 10,
  },
  login_textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  login_textoBotaoGoogle: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  login_textoLink: {
    color: '#2561C7',
    fontSize: 14,
    fontWeight: 'bold',
  },
  login_textoErro: {
    width: '90%',
    marginBottom: 20,
    textAlign: 'center',
    color: '#E10404',
    fontWeight: 'bold',
  },
  login_textoTitulo: {
    textAlign: 'center',
    color: '#052F76',
    fontSize: 36,
    fontWeight: 'bold',
  },
  login_textoSubTitulo: {
    textAlign: 'center',
    color: '#052F76',
    fontSize: 24,
    fontWeight: 'bold',
  },
  login_texto: {
    width: '90%',
    color: '#666',
    textAlign: 'center',
  },
  // ***********************************
  // * Cadastro                        *
  // ***********************************
  cadastro_viewContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  cadastro_botao: {
    width: '90%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 5,
  },
  cadastro_criarConta: {
    backgroundColor: '#2561C7',
  },
  cadastro_cancelar: {
    marginTop: 0,
    backgroundColor: '#B7B6B6',
  },
  cadastro_textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cadastro_input: {
    width: '90%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#AAA',
    paddingHorizontal: 5,
  },
  cadastro_label: {
    width: '90%',
    marginTop: 15,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  cadastro_textoErro: {
    width: '90%',
    marginBottom: 20,
    textAlign: 'center',
    color: '#E10404',
    fontWeight: 'bold',
  },
  cadastro_textoSucesso: {
    width: '90%',
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
    fontWeight: 'bold',
  },
  // ***********************************
  // * MODALMSG                        *
  // ***********************************
  modalMsg_viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalMsg_viewFundo: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    opacity: 0.8,
    zIndex: 1,
  },
  modalMsg_viewCaixa: {
    position: 'absolute',
    width: '80%',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    zIndex: 2,
  },
  modalMsg_viewBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalMsg_titulo: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  modalMsg_descricao: {
    fontSize: 14,
    marginBottom: 5,
  },
  modalMsg_solucao: {
    fontSize: 14,
  },
  modalMsg_textoBotao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginHorizontal: 5,
  },
  modalMsg_botao: {
    alignSelf: 'center',
    alignItems: 'center',
    minWidth: '30%',
    paddingVertical: 4,
    marginTop: 10,
    borderRadius: 2,
    elevation: 4,
    backgroundColor: '#5C86F5',
  },
  // ***********************************
  // * HOME_SCREEN                     *
  // ***********************************
  home_txFilhos: {
    width: '20%',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  home_txSalLiq: {
    width: '20%',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  home_slFilhos: {
    width: '80%',
    height: 40,
  },
  home_slSalLiq: {
    width: '80%',
    height: 40,
  },
  home_inpNome: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C1C1C1',
    paddingHorizontal: 5,
  },
  home_inpSal: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C1C1C1',
    paddingHorizontal: 5,
  },
  home_inpEmail: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C1C1C1',
    paddingHorizontal: 5,
  },
  home_pkEstCiv: {
    width: '100%',
    height: 38,
  },
  home_pkItemEstCiv: {
    color: '#5E5E5E',
  },
  home_viewEstCiv: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C1C1C1',
  },
  home_dtNasc: {
    width: '85%',
  },
  home_dtIniCarr: {
    width: '42.5%',
  },
  // ***********************************
  // * PATRIMONIO_SCREEN               *
  // ***********************************
  patrim_slIcone: {
    width: '65%',
    height: 40,
  },
  patrim_txIcone: {
    width: '35%',
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  // ***********************************
  // * RESERVA_SCREEN                  *
  // ***********************************
  reserva_viewCalculo: {
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reserva_viewCentral: {
    width: '30%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reserva_slider: {
    width: '70%',
    height: 40,
  },
  reserva_txDireita: {
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  reserva_txPositivo: {
    width: '100%',
    color: 'green',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  reserva_txNegativo: {
    width: '100%',
    color: 'red',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  reserva_lbGasto: {
    width: '70%',
    textAlignVertical: 'center',
  },
  reserva_lbCalculo: {
    alignSelf: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  // ***********************************
  // * APOSENTADORIA_SCREEN            *
  // ***********************************
  aposent_viewCentral: {
    width: '30%',
    height: 40,
    justifyContent: 'center',
  },
  aposent_vinheta: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  aposent_viewCalculo: {
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aposent_viewReserva: {
    width: '50%',
    paddingTop: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aposent_txDireita: {
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  aposent_txResTotal: {
    height: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  aposent_lbCalculo: {
    alignSelf: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  aposent_lbReserva: {
    height: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  aposent_slider: {
    width: '70%',
    height: 40,
  },
  aposent_input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#AAA', // #5BA849
    paddingHorizontal: 5,
  },
  // ***********************************
  // * SEGURANCA_SCREEN                *
  // ***********************************
  segur_viewEsquerda: {
    width: 40,
  },
  segur_txDireita: {
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  segur_txValor: {
    width: '30%',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  segur_lbSeguridade: {
    width: '40%',
  },
  segur_lbCalculo: {
    alignSelf: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  segur_lbTotal: {
    height: 35,
    fontWeight: 'bold',
  },
  segur_input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#AAA', // #5BA849
    paddingHorizontal: 5,
  },
  // ***********************************
  // * CONSUMO_SCREEN                  *
  // ***********************************
  consumo_viewLabel: {
    width: '70%',
  },
  consumo_viewPicker: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C1C1C1',
  },
  consumo_viewValor: {
    width: '30%',
  },
  consumo_vinheta: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  consumo_txValor: {
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  consumo_pkEstCiv: {
    width: '100%',
    height: 38,
    borderColor: '#5E5E5E',
    borderWidth: 1,
  },
  consumo_pkItemEstCiv: {
    color: '#5E5E5E',
  },
  // ***********************************
  // * RESULTADO_SCREEN                *
  // ***********************************
  result_viewRodape: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    borderTopColor: '#D0D0D0',
    borderTopWidth: 1,
  },
  result_viewLegenda: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    borderTopColor: '#D0D0D0',
    borderTopWidth: 1,
  },
  result_viewItemLegenda: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  result_viewComponente: {
    width: '100%',
    alignContent: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  result_viewLogo: {
    marginLeft: 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#0EDF29',
  },
  result_viewLogoNeg: {
    marginLeft: 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 15,
  },
  result_viewPosLogo: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 10,
  },
  result_viewResultado: {
    borderTopWidth: 0,
  },
  result_espacador: {
    marginTop: 5,
  },
  result_imgLogoNeg: {
    height: 40,
    width: 40,
  },
  result_txResultado: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  result_txComprometimento: {
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
    color: '#611414',
  },
  result_txGrafico: {
    fontSize: 14,
    color: '#666',
  },
  result_txLegenda: {
    paddingLeft: 2,
    fontSize: 10,
    color: '#666',
  },
  result_txAnalisePos: {
    fontSize: 12,
    color: '#5BA849',
    textAlign: 'center',
  },
  result_txAnaliseNeg: {
    fontSize: 12,
    color: '#E10404',
    textAlign: 'center',
  },
});

export default styles;
