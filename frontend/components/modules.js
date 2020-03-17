import React, {Component} from 'react';
import {Button, View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class About extends Component{
  render(){
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.h}>
              <Text style={styles.text}>TerryBOX</Text>
            </View>
            <View style={styles.modulos}>
              <View style={styles.modulos}>
                  <Text style={styles.mod}>Módulo 1</Text>
                  <Text style={styles.info}>Usuario: </Text>
                  <Text style={styles.info}>Token: </Text>
                  <Button color={'rgb(0,230,0)'} title="Status: Ok" style={styles.stat}/>
              </View>
              <View style={styles.modulos}>
                  <Text style={styles.mod}>Módulo 2</Text>
                  <Text style={styles.info}>Usuario: </Text>
                  <Text style={styles.info}>Token: </Text>
                  <Button color={'rgb(0,230,0)'} title="Status: Ok" style={styles.stat}/>
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
    modulos:{
        borderWidth: 1,
        margin: 25,
    },
    mod:{
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 5,
    },
    info:{
        marginLeft: 5,
    },
    stat:{
        textDecorationColor: 'black',
    }
});