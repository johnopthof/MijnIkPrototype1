import React, {Component} from 'react';
import {TouchableOpacity, Button, Platform, StyleSheet, Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { createStackNavigator, createAppContainer } from "react-navigation";
import PinView from 'react-native-pin-view'


export default class PinScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.text}>Login met je pincode</Text>
        <PinView
          style={styles.pin} buttonTextColor="#443456" inputActiveBgColor="#443456"
          onComplete={(val, clear)=> {
              if (val === '0000') {
                this.props.navigation.navigate('Details')
              } else {
                Alert.alert('Foutje bedankt');
                clear();
              }
            }
          }
          pinLength={4}
        />
        <Text>PinScreen</Text>
         <Button title="Go to Details" onPress={() => this.props.navigation.navigate('Details')}/>
      </View>
    );
  }
}
