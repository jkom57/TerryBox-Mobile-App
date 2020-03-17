import React, {Component} from 'react'
import axios from 'axios';
import {Button, View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView} from 'react-native'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import { Constants } from 'react-native-navigation';

export default class Login extends Component{
  
  state={
    correo: '',
    contraseña: ''
  }

  async componentDidMount(){
    
    this.props.navigation.navigate("Inicio")
  }

  onChangeCor = (e) =>{
    this.state({
      correo: e
    })
  }
  onChangePass = (e) =>{
    this.state({
      contraseña: e.target.value
    })
  }

  onPressLogIn = async (e) => {
    await axios.post('http://localhost:4000/api/signin', {
      correo: this.state.correo,
      contraseña: this.state.contraseña
    })
    e.preventDefault()
  }
  
  render(){
        return(
            <SafeAreaView style={styles.container}>
              <ScrollView style={styles.scroll}>
                <View style={styles.h}>
                    <Text style={styles.text}>TerryBOX</Text>
                </View>
                <View style={styles.sesion}>
                    <Text style={styles.is}>Inicio de Sesión</Text>
                    <View style={styles.form}>
                        <Text style={styles.d}>Correo:</Text>
                        <TextInput style={styles.dat} autoCapitalize='none' returnKeyType='next' value={this.correo} onChangeText={this.onChangeCor}></TextInput>
                    </View>
                    <View style={styles.form2}>
                    <Text style={styles.d}>Contraseña:</Text>
                    <TextInput style={styles.da} secureTextEntry={true} returnKeyType='go' onKeyPress={this.onChangePass}></TextInput>
                    </View>
                    <View style={styles.btn}>
                    <Button style={styles.btn} title="Iniciar Sesión" onPress={this.onPressLogIn} />
                    </View>
                    <Text style={styles.o}>ó</Text>
                    <View style={styles.btn}>
                    <Button style={styles.btn} title="Registrarse" onPress={() => this.props.navigation.navigate("Registro")} />
                    </View>
                </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      marginTop: Constants.statusBarHeight,
    },
    scroll:{
      marginHorizontal: 0,
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
    btn:{
      alignSelf: 'center',
    },
    sesion:{
      borderWidth: 2,
      borderColor: 'rgb(7,89,212)',
      marginTop: 100,
      alignSelf: 'center',
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    is:{
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 25,
      marginBottom: 20,
    },
    form:{
      flexDirection: 'row',
    },
    form2:{
      flexDirection: 'row',
      marginBottom: 30,
    },
    d:{
      marginLeft: 10,
      marginBottom: 25,
      fontWeight: 'bold',
    },
    da:{
      marginLeft: 20,
      paddingLeft: 5,
      height: 38,
      width: 170,
      borderColor: 'black',
      borderWidth: 1,
    },
    dat:{
      marginLeft: 53,
      paddingLeft: 5,
      height: 38,
      width: 170,
      borderColor: 'black',
      borderWidth: 1,
    },
    o:{
      alignSelf: 'center',
      fontSize: 16,
      marginVertical: 15
    },
  });