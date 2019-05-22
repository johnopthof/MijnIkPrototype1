import React, {Component} from 'react';
import {Platform, StatusBar, NativeModules, LayoutAnimation, StyleSheet, Text, View, Button} from 'react-native';

import { createStackNavigator, createAppContainer } from "react-navigation";
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import SecureStorage, { ACCESS_CONTROL, ACCESSIBLE, AUTHENTICATION_TYPE } from 'react-native-secure-storage'

import AuthorizationScreen from './screens/AuthorizationScreen.js';
import PinScreen        from './screens/PinScreen.js';

type Props = {};

const initialState = {
  Authorized: false,
}

 const reducer = (state=initialState, action) =>{
   switch(action.type) {
     case "LOGGEDIN":
        return { Authorized: state.Authorized = true}
     case "LOGOUT":
        return { Authorized: state.Authorized = false}
     case "val":
        return { bsn: state.bsn = action.value}
   }
   return state;
 }
 
 const store = createStore(reducer);


const AppNavigator = createStackNavigator(
  {
    Home: PinScreen,
    DigiD: AuthorizationScreen,
  }
);

let Navigation = createAppContainer(AppNavigator);

export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state ={}
  }
//  baseURL = 'http://b03zm72.locgov.nl:8080';
  //baseURL = 'http://192.168.2.27:8080';


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