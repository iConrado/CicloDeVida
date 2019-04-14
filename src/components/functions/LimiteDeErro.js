import React from 'react';
import { Text } from 'react-native';

import styles from './styles';

export default class LimiteDeErro extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
    // console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Text style={styles.label}>Um erro aconteceu...</Text>;
    }
    return this.props.children; //eslint-disable-line
  }
}
