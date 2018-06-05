// Dados de mock para abertura mais rápida
import mock from './components/functions/mock';

const routesConfig = {
  App: {
    initialRouteName: 'Simulação',
    initialRouteParams: mock,
    headerMode: 'float',
  },
  Auth: {
    initialRouteName: 'SignIn',
    headerMode: 'none',
  },
  Drawer: {
    initialRouteName: 'Simulação',
  },
};

export default routesConfig;
