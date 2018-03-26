import renderer from 'react-test-renderer';

import React from 'react';
import ResultadoScreen from '../src/components/ResultadoScreen';


it('renders without crashing', () => {
  const rendered = renderer.create(<ResultadoScreen />).toJSON();
  expect(rendered).toMatchSnapshot();
});
