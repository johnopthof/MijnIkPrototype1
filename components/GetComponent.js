import React from 'react';
import { Text, View, StyleSheet, Button, TextInput,} from 'react-native';

class GetComponent extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      data: null,
      loaded: true,
      error:null,
      username: '',
      }
  }    

  getData = (ev)=>{
    this.setState({loaded:false, error: null});

    let url = this.props.baseURL + '/digid/login?' + this.state.username;

    let h = new Headers();
    h.append('Atuhorization', 'Bearer biglongstringvaluedklasjdfklajsdfljasdf');
    h.append('X-Client', 'John')
    let req = new Request(url, {
      headers: h,
      method: 'GET'
    });

    fetch(req)
    .then(response=>response.json())  //Eerst vertalen naar je taal
    .then(this.showData)
    .catch(this.badCall)
  }


  showData = (data) =>{
    this.setState({data, loaded:true, username:''});
    console.log(data); 
  }

  badCall = (err) =>{
    this.setState({loaded:true, error: err.message, username:''}); 
  }

    render(){
        return(
        <View style={{flex: 1, paddingTop:20}}>
          {!this.state.loaded && (
            <Text>Loading</Text>
          )}
          <TextInput placeholder="Name" onChangeText={(username) => this.setState({username})} value={this.state.username}></TextInput>
          <Text style={{fontSize: 24}}>Gimme some data!</Text>
          <Button title="Get request" onPress={this.getData}></Button>
          {this.state.error &&(
            <Text style={styles.err}>{this.state.error}</Text>
          )}
          {
            this.state.data &&(
              <Text>{"Hij doet het: " + this.state.data.userName + " " + this.state.data.firstName}</Text>
            )
          }
        </View>
        )
    }
}
export default GetComponent;

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
