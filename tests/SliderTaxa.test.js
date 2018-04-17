import React from 'react';
import { shallow } from 'enzyme';
import SliderTaxa from '../src/components/aposentadoria/SliderTaxa';
import Slider from 'react-native-slider';

describe('SliderTaxa', () => {
  let ret;
  const retorno = valor => { ret = valor; };
  const app = shallow(<SliderTaxa inicial={50} retorno={retorno} />);
  const app2 = shallow(<SliderTaxa retorno={retorno} />);

  it('renders correctly', () => {  
    expect(app).toMatchSnapshot();
  });

  it('slider sem o valor inicial', () => {  
    app2.find(Slider).at(0).simulate('valueChange', 30);
    expect(app2.state('tmpRentab')).toBe(30);
  });

  it('zera o slider', () => {  
    app.find(Slider).at(0).simulate('valueChange', 0);
    expect(app.state('tmpRentab')).toBe(0);
  });

  it('altera o valor do slider', () => {  
    app.find(Slider).at(0).simulate('valueChange', 70);
    expect(app.state('tmpRentab')).toBe(70);
  });

  it('retorna valor do slider', () => {  
    app.find(Slider).at(0).simulate('slidingComplete', 70);
    expect(ret).toBe(70);
  });
});
