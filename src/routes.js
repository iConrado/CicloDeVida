import HomeScreen from './components/HomeScreen';
import PatrimonioScreen from './components/PatrimonioScreen';
import ReservaScreen from './components/ReservaScreen';
import AposentadoriaScreen from './components/AposentadoriaScreen';
import SegurancaScreen from './components/SegurancaScreen';
import ConsumoScreen from './components/ConsumoScreen';
import ResultadoScreen from './components/ResultadoScreen';
import LoginScreen from './components/LoginScreen';
import CriarConta from './components/login/CriarConta';
import Entrar from './components/login/Entrar';
import Esqueci from './components/login/Esqueci';

export const routesApp = {
  Simulação: { screen: HomeScreen },
  Patrimonio: { screen: PatrimonioScreen },
  Reserva: { screen: ReservaScreen },
  Aposentadoria: { screen: AposentadoriaScreen },
  Seguranca: { screen: SegurancaScreen },
  Consumo: { screen: ConsumoScreen },
  Resultado: { screen: ResultadoScreen },
};

export const routesAuth = {
  SignIn: { screen: LoginScreen },
  SignUp: { screen: CriarConta },
  Entrar: { screen: Entrar },
  Esqueci: { screen: Esqueci },
};
