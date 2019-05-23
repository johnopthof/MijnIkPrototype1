import React, {Component} from 'react';
import {TouchableOpacity, Button, Platform, StyleSheet, Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PinView from 'react-native-pin-view';
import LinearGradient from 'react-native-linear-gradient';

import SecureStorage, { ACCESS_CONTROL, ACCESSIBLE, AUTHENTICATION_TYPE } from 'react-native-secure-storage';
import {connect} from 'react-redux';
import Biometrics from 'react-native-biometrics';

class PinScreen extends React.Component {
	
  constructor(props){
    super(props);
    this.state ={ 
      text: '',
      BSN: '',
			newUser: false,
			inputPin: '',
			userPin: '',
      }
  }

	/**
	This is the first function runned when startin the app
	 */
  checkAuthorization = async() => {
    try {
			//Lets check if the app has a bsn & pincode, then it will be authorized for a person,
      bsn = await SecureStorage.getItem('@bsn');
			userPin = await SecureStorage.getItem("@userPin");
			if(bsn != '' && userPin != ''){
				this.props.isAuthorized();
				this.setState({userPin: userPin});
			}else if(this.props.navigation.getParam("action") == "createPin"){
				this.setState({newUser: true})
			}else{
				this.props.navigation.replace("DigiD");
			}
    } catch (e) {
      console.log(e);
    }
		if(!this.props.Authorized){alert("IS ALERT VANUIT CHECKAUTORIZATION IN PINSCREEN.JS JE MOET WETEN")}
  }

/**Check if this works! */
	checkBiometrics = () => {
		Biometrics.isSensorAvailable()
		.then((biometryType) => {
			if (biometryType === Biometrics.TouchID) {
				alert('TouchID is supported')
			} else if (biometryType === Biometrics.FaceID) {
				alert('FaceID is supported')
			} else {
				alert('Biometrics not supported')
			}
  })
	}

	ownSetState = async(state) => {
		this.setState(state);
	}

  componentWillMount(){
		this.checkAuthorization();
		this.checkBiometrics();
  }
	
	/**This method wil run after the user has typed in a pincode */
	onCompletePin(val){
		//Check if the user is making a new pincode
		if(this.state.newUser){
			//Save this code as a new code
			this.saveUserPin(val);
			//Change state to user has a code
			this.setState({newUser: false});
		}else{
			//Attempt to log the user in
			this.logUserIn(val);	
		}
	}

	/** This method saves the users pin  */
	saveUserPin = async (value)=>{
		await SecureStorage.setItem("@userPin", value);
	}

/** This method checks if the correct pincode has been inserted, then sets redux var to loggedin and changes view */
 comparePins = async (stored) => {
	 console.log("STORED: " + stored);
	 console.log("inputPin: " + this.state.inputPin);

	 if(stored == this.state.inputPin){
			console.log("Deze zwiempie is ingelogd a niffauw");
			this.props.login();
			this.props.navigation.replace("Home");
	 }
 }

 logUserIn = async (val) =>{
	 this.setState({inputPin: val})
	 result = await SecureStorage.getItem("@userPin")
			.then(this.comparePins)
			.catch(console.log);
 }

  render() {
    return (
			<LinearGradient style={[styles.pinview]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[Colors.headerRight, Colors.headerLeft]}>
        <Text style={styles.text}>Login met je pincode</Text>
        <PinView
          style={styles.pin} buttonTextColor="#443456" inputActiveBgColor="#443456"
          onComplete={(val, clear)=> {
							this.onCompletePin(val)
              clear();
            }
          }
          pinLength={4}
        />
      
			<Button title="Van burger verwisselen" onPress={() => this.props.navigation.navigate('DigiD')}/>
			</LinearGradient>
    );
  }
}

function mapStateToProps(state){
    return{
        Authorized: state.Authorized,
				Logedin:	state.Logedin,
    }
}

 function mapDispatchToProps(dispatch){
   return{
     login              		: () => dispatch({type: 'LOGIN'}),
     isAuthorized           : () => dispatch({type: 'AUTHORIZED'}),
   }
 }

export default connect(mapStateToProps, mapDispatchToProps)(PinScreen);

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
