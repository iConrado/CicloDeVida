import renderer from 'react-test-renderer';

import React from 'react';
import PatrimonioScreen from '../src/components/PatrimonioScreen';


it('renders without crashing', () => {
  const rendered = renderer.create(<PatrimonioScreen />).toJSON();
  expect(rendered).toMatchSnapshot();
});
