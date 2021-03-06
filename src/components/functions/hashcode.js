const hashCode = s =>
  s.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0); //eslint-disable-line
    return a & a; //eslint-disable-line
  }, 0);

export default hashCode;
