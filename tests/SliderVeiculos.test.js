import 'react-native';
import renderer from 'react-test-renderer';

import React from 'react';
import SliderVeiculos from '../src/components/patrimonio/SliderVeiculos';


it('renders correctly', () => {
  const rendered = renderer.create(<SliderVeiculos />).toJSON();
  expect(rendered).toMatchSnapshot();
});
