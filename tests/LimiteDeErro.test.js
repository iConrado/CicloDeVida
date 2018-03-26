import { Text } from 'react-native';
import renderer from 'react-test-renderer';

import React from 'react';
import LimiteDeErro from '../src/components/functions/LimiteDeErro';

it('renders correctly', () => {
  const rendered = renderer.create(
    <LimiteDeErro>
      <Text>Teste</Text>
    </LimiteDeErro>
  ).toJSON();
  expect(rendered).toBeTruthy();
});
