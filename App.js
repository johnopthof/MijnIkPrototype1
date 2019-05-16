import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

  constructor(props){
    super(props);
    this.state ={ 
      data: null,
      loaded: true,
      error:null,
      text: '',
      }
  }

  baseURL = 'http://b03zm72.locgov.nl:8080';



type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
