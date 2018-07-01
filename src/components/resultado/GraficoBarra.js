// Gráfico de barras para comparação de benchmark
// Props esperadas:
//
// titulo       (string)    - titulo do gráfico
// nomes        (array)     - nomes das séries
// valores      (array)     - valores das séries (deve estar na mesma ordem do array nomes)
// corMeta      (string)    - cor para a barra de meta - padrão #626272
// corSimulacao (string)    - cor para a barra de meta - padrão #42B1F2
// max          (integer)   - valor máximo do gráfico, define a área de plotagem
//

import React from 'react';
import { View } from 'react-native';
import ChartView from 'react-native-highcharts';

const montaSerie = (nomes, valores) => {
  const serie = { nomes: [], valores: [] };
  if (nomes.length === valores.length && typeof nomes === 'object' && typeof valores === 'object') {
    nomes.map(value => serie.nomes.push(value));
    valores.map(value => serie.valores.push(value));
  }
  return serie;
};

export default props => {
  const { titulo = null, nomes = ['Erro'], valores = [1], corMeta = '#626272', corSimulacao = '#42B1F2', max = 1000 } = props;
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
    chart: { type: 'bar' },
    title: { text: titulo, align: 'left', style: { fontSize: 14, fontWeight: 'bold', color: '#666' } },
    backgroundColor: '#FFF',
    exporting: { enabled: false },
    legend: { enabled: false },
    tooltip: { enabled: false },
    plotOptions: {
      series: {
        pointPadding: 0.05,
        borderWidth: 0,
        shadow: true,
        colorByPoint: true,
        colors: [corMeta, corSimulacao],
        dataLabels: { enabled: true, align: 'outside' },
      },
    },
    xAxis: { categories: serie.nomes, tickLength: 0, labels: { enabled: false } },
    yAxis: { max, gridLineWidth: 0, labels: { enabled: false }, title: { text: null } },
    series: [
      {
        name: 'Valor',
        data: serie.valores,
      },
    ],
  };

  return (
    <View style={{ width: '100%' }}>
      <ChartView style={{ height: 70, width: '100%' }} config={conf} options={options} />
    </View>
  );
};
