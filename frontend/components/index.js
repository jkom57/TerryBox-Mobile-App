import React, {Component} from 'react';
import {Button, View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class About extends Component{
  render(){
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.h}>
              <Text style={styles.text}>TerryBox</Text>
            </View>
            <View style={styles.menu}>
              <View style={styles.opc}>
              <Button style={styles.opcbtn} title="Perfil" onPress={() => this.props.navigation.navigate("Perfil")}/>
              </View>
              <View style={styles.opc}>
                <Button style={styles.opcbtn} title="Módulos" onPress={() => this.props.navigation.navigate("Modulos")}/>
              </View>
            </View>
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    h: {
      flex: 0,
      backgroundColor: 'rgb(7,89,212)',
      alignItems: 'flex-start',
      paddingTop: 15,
      paddingLeft: 5,
    },
    text:{
      color: 'black',
      margin: 10,
      fontSize: 30,
      textAlign: 'center',
    },
    menu:{
      borderWidth: 1,
      marginTop: 100,
      marginHorizontal: 50,
      padding: 10,
    },
    opc:{
      margin: 5,
    },
    opcbtn:{
      
    }
});