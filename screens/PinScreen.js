import React, {Component} from 'react';
import {TouchableOpacity, Button, Platform, StyleSheet, Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PinView from 'react-native-pin-view';
import LinearGradient from 'react-native-linear-gradient';

import SecureStorage, { ACCESS_CONTROL, ACCESSIBLE, AUTHENTICATION_TYPE } from 'react-native-secure-storage';
import {connect} from 'react-redux';

class PinScreen extends React.Component {
	
  constructor(props){
    super(props);
    this.state ={ 
      text: '',
      BSN: '',
      }
  }

  checkAuthorization = async() => {
    try {
      bsn = await SecureStorage.getItem('@bsn');
			console.log("First show result bsn:" + bsn);
			if(bsn != ''){
				console.log("!bsn");
				this.props.isAuthorized();
			}else{
				this.props.navigation.replace("DigiD");
			}

			console.log("Updated bsn vanuit checkauthorization naar redux store");
    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount(){
    this.checkAuthorization();
  }

  render() {
    return (
			<LinearGradient style={[styles.pinview]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[Colors.headerRight, Colors.headerLeft]}>
        <Text style={styles.text}>Login met je pincode</Text>
        <PinView
          style={styles.pin} buttonTextColor="#443456" inputActiveBgColor="#443456"
          onComplete={(val, clear)=> {
              if (val === '0000') {
                alert(' bedankt');
								clear();
              } else {
                alert('Foutje bedankt');
                clear();
              }
            }
          }
          pinLength={4}
        />
      
			<Button title="Go to Details" onPress={() => this.props.navigation.navigate('DigiD')}/>
			</LinearGradient>
    );
  }
}

function mapStateToProps(state){
    return{
        login: state.login,
        bsn: state.bsn
    }
}

 function mapDispatchToProps(dispatch){
   return{
     isAuthorized              : () => dispatch({type: 'LOGGEDIN'}),
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