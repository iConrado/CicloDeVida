import 'react-native';
import renderer from 'react-test-renderer';

import React from 'react';
import SliderGasto from '../src/components/reserva/SliderGasto';

it('renders correctly', () => {
  const rendered = renderer.create(<SliderGasto />).toJSON();
  expect(rendered).toMatchSnapshot();
});
