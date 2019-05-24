import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Button, TextInput,} from 'react-native';

import SecureStorage, { ACCESS_CONTROL, ACCESSIBLE, AUTHENTICATION_TYPE } from 'react-native-secure-storage';
import {connect} from 'react-redux';

class AuthorizationScreen extends React.Component {

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

  /** This method constructs the request to the API */
  postData = (ev)=>{
    this.setState({loaded:false, error: null});

    let url = 'http://b03zm72.locgov.nl:8080/digid/login';
    //let url = 'http://192.168.43.17:8080/digid/login';


    let h = new Headers();
    h.append('Accept', 'application/json');
    h.append('Content-Type', 'application/json')
    let req = new Request(url, {
      headers: h,
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    });

    this.fetchMethod(req);
  }

  //This async method calls the API
  fetchMethod = async(req) =>{
    try {
    await fetch(req)
      .then(response=>response.json())  //Eerst vertalen naar je taal
      .then(this.succesCall)
      .catch(this.badCall)
    } catch (e) {
      console.log(e);
    }
  }

  //If succesfol API call, this method wil show result and save BSN
  succesCall = async (data) =>{
    //checkReturn(data);
    if(!data.bsn){
      this.setState({loaded:true, text: 'Gebruikersnaam of wachtwoord is niet juist'})
      return;
    }
    this.setState({data, loaded:true, text:''});
    bsn = JSON.stringify(data.bsn);
    this.authorizeUser(bsn);
    this.props.navigation.replace("Pin", {action: "createPin"});
  }

  //Secure Store BSN
  authorizeUser = async (data) => {
  try {
    await SecureStorage.setItem('@bsn', data);
    this.props.isAuthorized();
  } catch (e) {
    console.log(e);
  }
}

  logUserOut = async (data) => {
    try {
      await SecureStorage.setItem('@bsn', '');
      await SecureStorage.setItem('@userPin', '');
      this.props.ReduxlogUserOut();
      saveUserBiometricsPref(null, false);
    } catch (e) {
      console.log(e);
    }
  }


	saveUserBiometricsPref = async (value, boolBiometric=true) => {
		await SecureStorage.setItem("@biometricsType", value);
		await SecureStorage.setItem("@boolBiometric", boolBiometric.toString());
	}

  badCall = (err) =>{
    this.setState({loaded:true, error: err.message, text:''}); 
  }

    render(){
        return(
        <View style={{flex: 1, paddingTop:20}}>
          
        {/*        <Text>{this.props.baseURL + '/digid/login'}</Text> 
        <Text>---------------------------------------------------</Text>*/}
          {!this.state.loaded && (
            <Text>Loading</Text>
          )}
          <Text>{this.state.text}</Text>
          <TextInput placeholder="Naam" onChangeText={(username) => this.setState({username})} value={this.state.username}></TextInput>
          <TextInput placeholder="Wachtwoord" secureTextEntry={true} onChangeText={(password) => this.setState({password})} value={this.state.password}></TextInput>
          <Button title="Login" onPress={this.postData}></Button>
          {this.state.error &&(
            <Text style={styles.err}>{this.state.error}</Text>
          )}
          {
            this.state.data &&(
              <Text>{this.state.data.bsn}</Text>
            )
          }

          <Text>---------------------------------------------------</Text>
          <Text>{this.props.Authorized.toString()}</Text>
          <TouchableOpacity onPress={()=> this.logUserOut()}><Text style={{fontSize:20}}>Machtiging intrekken</Text></TouchableOpacity>
          <Button title="Pincode invoeren" onPress={() => this.props.navigation.navigate('Pin')}/>
          {/*<TouchableOpacity onPress={()=> this.props.logUserIn()}><Text style={{fontSize:20}}>ReduxLogin</Text></TouchableOpacity>*/}
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
     isAuthorized           : () => dispatch({type: 'AUTHORIZED'}),
     ReduxlogUserOut        : () => dispatch({type: 'UNAUTHORIZE'}),
   }
 }

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationScreen);

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
