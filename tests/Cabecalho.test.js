import 'react-native';
import renderer from 'react-test-renderer';

import Cabecalho from '../src/components/functions/Cabecalho';

it('renders correctly', () => {
  const rendered = renderer.create(Cabecalho('teste')).toJSON();
  expect(rendered).toMatchSnapshot();
});
