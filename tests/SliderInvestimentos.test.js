import 'react-native';
import renderer from 'react-test-renderer';

import React from 'react';
import SliderInvestimentos from '../src/components/patrimonio/SliderInvestimentos';


it('renders correctly', () => {
  const rendered = renderer.create(<SliderInvestimentos />).toJSON();
  expect(rendered).toMatchSnapshot();
});
