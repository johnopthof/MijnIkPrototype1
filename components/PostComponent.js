import React from 'react';
import { Text, View, StyleSheet, Button, TextInput,} from 'react-native';
import SecureStorage, { ACCESS_CONTROL, ACCESSIBLE, AUTHENTICATION_TYPE } from 'react-native-secure-storage'

class PostComponent extends React.Component {

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

  postData = (ev)=>{
    this.setState({loaded:false, error: null});

    let url = this.props.baseURL + '/digid/login';

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

    fetch(req)
    .then(response=>response.json())  //Eerst vertalen naar je taal
    .then(this.showData)
    .catch(this.badCall)
  }

  showData = (data) =>{
    this.setState({data, loaded:true, text:''});
    //dataB = JSON.stringify(data);
    SecureStorage.setItem('key', 'lamara por vida');
    //alert(dataB); 
  }

  async function calldata(){
    data = await SecureStorage.getItem('key');
    alert(data);
    console.log(data);
  }

  badCall = (err) =>{
    this.setState({loaded:true, error: err.message, text:''}); 
  }

    render(){
        return(
        <View style={{flex: 1, paddingTop:20}}>
          
          <Text>{this.props.baseURL + '/digid/login'}</Text>
        <Text>---------------------------------------------------</Text>
          {!this.state.loaded && (
            <Text>Loading</Text>
          )}
          <TextInput placeholder="firstName" onChangeText={(username) => this.setState({username})} value={this.state.username}></TextInput>
          <TextInput placeholder="lastName" onChangeText={(password) => this.setState({password})} value={this.state.password}></TextInput>
          <Text style={{fontSize: 24}}>POST some data!</Text>
          <Button title="Post request" onPress={this.postData}></Button>
          <Button title="Call Data" onPress={this.calldata}></Button>
          {this.state.error &&(
            <Text style={styles.err}>{this.state.error}</Text>
          )}
          {
            this.state.data &&(
              <Text>{this.state.data.bsn}</Text>
            )
          }
        </View>
        )
    }
}
export default PostComponent;

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
