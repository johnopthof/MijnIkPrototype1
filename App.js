import React, {Component} from 'react';
import {Platform, StatusBar, NativeModules, LayoutAnimation, StyleSheet, Text, View, Button} from 'react-native';

import { createStackNavigator, createAppContainer } from "react-navigation";
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import SecureStorage, { ACCESS_CONTROL, ACCESSIBLE, AUTHENTICATION_TYPE } from 'react-native-secure-storage';
import Biometrics from 'react-native-biometrics';


import AuthorizationScreen from './screens/AuthorizationScreen.js';
import PinScreen        	from './screens/PinScreen.js';
import HomeScreen        	from './screens/HomeScreen.js';

type Props = {};

const initialState = {
  Authorized: false,
	Loggedin: false
}

 const reducer = (state=initialState, action) =>{
   switch(action.type) {
     case "AUTHORIZED":
        return { 
					//let obj = json.parse state
					//change obj
					//return obj
					Authorized: state.Authorized = true}
     case "UNAUTHORIZE":
        return { Authorized: state.Authorized = false}
     case "LOGIN":
        return { Loggedin: state.Loggedin = true}
		case "LOGOUT":
				return { Loggedin: state.Loggedin = true}
   }
   return state;
 }

const store = createStore(reducer);

const AppNavigator = createStackNavigator(
  {
    Pin: PinScreen,
    DigiD: AuthorizationScreen,
		Home:		HomeScreen,
  }
);

let Navigation = createAppContainer(AppNavigator);

export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state ={}
  }

  render() {
    return (
      <Provider store={store}>
        <Navigation/>
      </Provider>
    );
  }
}

const Colors = { 
  main: '#AF1E82',
  headerLeft: '#FF0D7E',
  headerRight: '#004A91',
  white: '#FFFFFF',
  grey: '#B2B2B2',
  black: '#443456',
}

const styles = EStyleSheet.create({
	container: {
		flex: 1,
	},
	logo:{
		width:'80rem',
		height:'80rem',
	},
	pin:{
		fontFamily: 'zemestro-medium'
	},
	pinview:{
		flex: 1,
		justifyContent: 'center'
	},
	between:{
		justifyContent:'space-between'
	},
	spacer:{
		height:'52rem'
	},
	text: {
		paddingVertical: '20rem',
		color:'#ffffff',
		fontSize: '18rem',
		textAlign: 'center',
		lineHeight:'24rem',
		paddingHorizontal:'50rem',
		fontFamily: 'zemestro-medium',
	},
	bottomButton:{
		bottom:'0rem',
	},
	center:{
		height:'200rem',
		justifyContent: 'center',
		alignItems:'center'
	},
	headerGradient: {
		flex: 1,
		flexDirection:'column',
		justifyContent: 'center',
		alignItems:'center'
	},
});