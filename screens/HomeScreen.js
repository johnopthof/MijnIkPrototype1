import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Button, TextInput,} from 'react-native';

import SecureStorage, { ACCESS_CONTROL, ACCESSIBLE, AUTHENTICATION_TYPE } from 'react-native-secure-storage';
import {connect} from 'react-redux';

class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      data: null,
      username: '',
      password: '',
      loaded: true,
      error:null,
      text: '',
      BSN: '',
      }
  }

  
  logUserOut = async (data) => {
  try {
    await SecureStorage.setItem('@bsn', '');
    this.props.ReduxlogUserOut();
  } catch (e) {
    console.log(e);
  }
}


    render(){
        return(
        <View style={{flex: 1, paddingTop:20}}>
          
        <Text>Welkom op het homescreen</Text>
        </View>
        )
    }
}

function mapStateToProps(state){
    return{
        Authorized: state.Authorized,
        bsn: state.bsn
    }
}

 function mapDispatchToProps(dispatch){
   return{
     isAuthorized           : () => dispatch({type: 'LOGGEDIN'}),
     ReduxlogUserOut        : () => dispatch({type: 'LOGOUT'}),
     updateBsn              : (bsn) => dispatch({type: 'val', value: bsn}),
   }
 }

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

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
  err:{
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
  }
});
