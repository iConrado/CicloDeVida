// Gráfico de pizza padrão para representação da Distribuição da renda líquida
// Props esperadas:
//
// titulo  (String)    - titulo do gráfico
// nomes   (array)     - nomes das séries
// valores (array)     - valores das séries (deve estar na mesma ordem do array nomes)
//

import React from 'react';
import { View } from 'react-native';
import ChartView from 'react-native-highcharts';

const montaSerie = (nomes, valores) => {
  const serie = [];
  if (nomes.length === valores.length && typeof nomes === 'object' && typeof valores === 'object') {
    nomes.map((value, index) => serie.push({ name: value, y: valores[index] }));
  }
  return serie;
};

export default props => {
  const { titulo = null, nomes = ['Erro'], valores = [1] } = props;

  const serie = montaSerie(nomes, valores);

  const Highcharts = 'Highcharts'; //eslint-disable-line
  const options = {
    global: { useUTC: false },
    lang: {
      decimalPoint: ',',
      thousandsSep: '.',
    },
    credits: { enabled: false },
  };
  const conf = {
    chart: { type: 'pie' },
    title: { text: titulo },
    backgroundColor: '#FFF',
    exporting: { enabled: false },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.percentage:.0f}%',
        },
      },
    },
    series: [
      {
        name: 'Valor',
        data: serie,
      },
    ],
  };

  return (
    <View style={{ width: '100%' }}>
      <ChartView style={{ height: 130, width: '100%' }} config={conf} options={options} />
    </View>
  );
};
