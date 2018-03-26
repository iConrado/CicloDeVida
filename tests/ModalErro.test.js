import 'react-native';
import renderer from 'react-test-renderer';

import React from 'react';
import ModalErro from '../src/components/functions/ModalErro';

it('renders correctly', () => {
  const rendered = renderer.create(<ModalErro />).toJSON();
  expect(rendered).toMatchSnapshot();
});
