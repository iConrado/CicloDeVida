// VALIDAÇÃO DA DATA 

const verificaData = (digData) => {
  let bissexto = 0;
  const data = digData;
  const tam = data.length;

  if (tam === 10) {
    const dia = parseInt(data.substr(0, 2), 10);
    const mes = parseInt(data.substr(3, 2), 10);   
    const ano = parseInt(data.substr(6, 4), 10); 

    if ((ano > 1900) && (ano < 2100)) {
      switch (mes) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          if (dia <= 31) {
            return true;
          }
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          if (dia <= 30) {
            return true;
          }
          break;
        case 2:
          /* Validando ano Bissexto / fevereiro / dia */          
          if ((ano % 4 === 0) || (ano % 100 === 0) || (ano % 400 === 0)) {
            bissexto = 1;
          }

          if ((bissexto === 1) && (dia <= 29)) {
            return true;
          }
          if ((bissexto !== 1) && (dia <= 28)) {
            return true;
          }  
          break;
        default:
          return false;
        }
      }
    }
    return false;
  };

export default verificaData;
