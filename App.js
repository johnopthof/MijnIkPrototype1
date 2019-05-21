import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginComponent from './components/LoginComponent.js';

type Props = {};
export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state ={ 
      }
  }
  baseURL = 'http://b03zm72.locgov.nl:8080';
  //baseURL = 'http://192.168.2.27:8080';

  render() {
    return (
      <View style={styles.container}>
        <LoginComponent baseURL={this.baseURL}/>
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
