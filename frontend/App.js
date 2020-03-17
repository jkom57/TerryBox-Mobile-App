/*import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from './components/login';
import Profile from './components/profile';
import Index from './components/index';
import Modules from './components/modules';
import Register from './components/register';
import InicioSesion from './components/sesion';
import { registerRootComponent } from 'expo';
import {View, Text} from 'react-native';

export default class App extends React.Component {
  render(){
    return(
      <NavigationContainer>{
        <View>
          <Text>Este es mi primer proyecto</Text>
        </View>
      }</NavigationContainer>
      //<AppContainer/>
    )
  }
}

const AppNavigator = createStackNavigator({
  'Inicio de Sesión':{
    screen:InicioSesion,
  },
  /*'Inicio de Sesión':{
    screen:Login,
  },
  Registro:{
    screen:Register,
  },
  Inicio:{
    screen:Index
  },
  Perfil:{
    screen:Profile
  },
  Modulos:{
    screen:Modules
  },*/
/*})
const AppContainer = createAppContainer(AppNavigator)*/


import * as React from 'react';
import { Button, View, Text, TextInput, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InicioSesion from './components/sesion';
import Register from './components/register';

const RootStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={InicioSesion} />
        <RootStack.Screen name="Registro" component={Register} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;