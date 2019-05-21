import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import { createStackNavigator, createAppContainer } from "react-navigation";
import { createStore } from 'redux';
import {Provider} from 'react-redux';

import LoginComponent from './components/LoginComponent.js';

type Props = {};

const initialState = {
  counter: 0
}

 const reducer = (state=initialState, action) =>{
   switch(action.type) {
     case "INCREASE_COUNTER": 
        return { counter: state.counter + 1}
     case "DECREASE_COUNTER":
        return { counter: state.counter - 1}
   }
   return state;
 }
 
 const store = createStore(reducer);

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
      <Provider store={store}>
        <View style={styles.container}>
          <LoginComponent baseURL={this.baseURL}/>
        </View>
      </Provider>
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
