import renderer from 'react-test-renderer';

import React from 'react';
import ConsumoScreen from '../src/components/ConsumoScreen';


it('renders without crashing', () => {
  const rendered = renderer.create(<ConsumoScreen />).toJSON();
  expect(rendered).toMatchSnapshot();
});
