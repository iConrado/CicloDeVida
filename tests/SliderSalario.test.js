import 'react-native';
import renderer from 'react-test-renderer';

import React from 'react';
import SliderSalario from '../src/components/home/SliderSalario';


it('renders correctly', () => {
  const rendered = renderer.create(<SliderSalario inicial={0} />).toJSON();
  expect(rendered).toMatchSnapshot();
});
