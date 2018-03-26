import 'react-native';
import renderer from 'react-test-renderer';

import React from 'react';
import Rodape from '../src/components/functions/Rodape';

it('renders correctly', () => {
  const rendered = renderer.create(<Rodape />).toJSON();
  expect(rendered).toMatchSnapshot();
});
