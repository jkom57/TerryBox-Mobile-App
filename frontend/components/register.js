import React, { Component } from 'react';
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  Image,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import axios from 'axios';
const logo = require('../assets/icon.png')

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

//const USER_COOL = require('../../../assets/images/user-cool.png');
//const USER_STUDENT = require('../../../assets/images/user-student.png');
//const USER_HP = require('../../../assets/images/user-hp.png');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const FormInput = props => {
  const { icon, refInput, ...otherProps } = props;
  return (
    <Input
      {...otherProps}
      ref={refInput}
      inputContainerStyle={styles.inputContainer}
      leftIcon={
        <Icon name={icon} type={'simple-line-icon'} color="#7384B4" size={18} />
      }
      inputStyle={styles.inputStyle}
      autoFocus={false}
      autoCapitalize="none"
      keyboardAppearance="dark"
      errorStyle={styles.errorInputStyle}
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor="#7384B4"
    />
  );
};

export const UserTypeItem = props => {
          const { image, label, labelColor, selected, ...attributes } = props;
          return (
            <TouchableOpacity {...attributes}>
              <View
                style={[
                  styles.userTypeItemContainer,
                  selected && styles.userTypeItemContainerSelected,
                ]}
              >
                <Text style={[styles.userTypeLabel, { color: labelColor }]}>
                  {label}
                </Text>
                <Image
                  source={image}
                  style={[
                    styles.userTypeMugshot,
                    selected && styles.userTypeMugshotSelected,
                  ]}
                />
              </View>
            </TouchableOpacity>
          );
        };

export default class register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      selectedType: null,
      username: '',
      email: '',
      password: '',
      confirmationPassword: '',
      emailValid: true,
      passwordValid: true,
      usernameValid: true,
      confirmationPasswordValid: true,
    };

    this.setSelectedType = this.setSelectedType.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateConfirmationPassword = this.validateConfirmationPassword.bind(
      this
    );
    this.signup = this.signup.bind(this);
  }

  async signup() {
    LayoutAnimation.easeInEaseOut();
    const usernameValid = this.validateUsername();
    const emailValid = this.validateEmail();
    const passwordValid = this.validatePassword();
    const confirmationPasswordValid = this.validateConfirmationPassword();
    if (
      emailValid &&
      passwordValid &&
      confirmationPasswordValid &&
      usernameValid
    ) {
      this.setState({ isLoading: true });
        await axios.post('http://198.168.1.167:4000/api', {
        username: this.state.username,     
        email: this.state.email,
        password: this.state.password
      })

      /*
      https://stackoverflow.com/questions/54108848/network-error-with-axios-and-android-emulator
      */
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        this.setState({ isLoading: false });
        Alert.alert('🎸', 'You rock');
      }, 1500);
    }
  }

  validateUsername() {
    const { username } = this.state;
    const usernameValid = username.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ usernameValid });
    usernameValid || this.usernameInput.shake();
    return usernameValid;
  }

  validateEmail() {
    const { email } = this.state;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    LayoutAnimation.easeInEaseOut();
    this.setState({ emailValid });
    emailValid || this.emailInput.shake();
    return emailValid;
  }

  validatePassword() {
    const { password } = this.state;
    const passwordValid = password.length >= 6;
    LayoutAnimation.easeInEaseOut();
    this.setState({ passwordValid });
    passwordValid || this.passwordInput.shake();
    return passwordValid;
  }

  validateConfirmationPassword() {
    const { password, confirmationPassword } = this.state;
    const confirmationPasswordValid = password === confirmationPassword;
    LayoutAnimation.easeInEaseOut();
    this.setState({ confirmationPasswordValid });
    confirmationPasswordValid || this.confirmationPasswordInput.shake();
    return confirmationPasswordValid;
  }

  setSelectedType = selectedType =>
    LayoutAnimation.easeInEaseOut() || this.setState({ selectedType });

  componentDidMount(){
    
  }
  
  render(){
    const {
      isLoading,
      selectedType,
      confirmationPassword,
      email,
      emailValid,
      password,
      passwordValid,
      confirmationPasswordValid,
      username,
      usernameValid,
    } = this.state;

        return(
          <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.container}
          >
            <KeyboardAvoidingView
            behavior="position"
            contentContainerStyle={styles.formContainer}
            >
              <Image source={logo} style={styles.logo} />
              <Text style={styles.is}>Registro</Text>
              <View style={{ width: '80%', alignItems: 'center' }}>
            <FormInput
              refInput={input => (this.usernameInput = input)}
              icon="user"
              value={username}
              onChangeText={username => this.setState({ username })}
              placeholder="Nombre de Usuario"
              returnKeyType="next"
              errorMessage={
                usernameValid ? null : "Your username can't be blank"
              }
              onSubmitEditing={() => {
                this.validateUsername();
                this.emailInput.focus();
              }}
            />
            <FormInput
              refInput={input => (this.emailInput = input)}
              icon="envelope"
              value={email}
              onChangeText={email => this.setState({ email })}
              placeholder="Correo"
              keyboardType="email-address"
              returnKeyType="next"
              errorMessage={
                emailValid ? null : 'Please enter a valid email address'
              }
              onSubmitEditing={() => {
                this.validateEmail();
                this.passwordInput.focus();
              }}
            />
            <FormInput
              refInput={input => (this.passwordInput = input)}
              icon="lock"
              value={password}
              onChangeText={password => this.setState({ password })}
              placeholder="Contraseña"
              secureTextEntry
              returnKeyType="next"
              errorMessage={
                passwordValid ? null : 'Please enter at least 6 characters'
              }
              onSubmitEditing={() => {
                this.validatePassword();
                this.confirmationPasswordInput.focus();
              }}
            />
            <FormInput
              refInput={input => (this.confirmationPasswordInput = input)}
              icon="lock"
              value={confirmationPassword}
              onChangeText={confirmationPassword =>
                this.setState({ confirmationPassword })
              }
              placeholder="Confirmar Contraseña"
              secureTextEntry
              errorMessage={
                confirmationPasswordValid
                  ? null
                  : 'The password fields are not identics'
              }
              returnKeyType="go"
              onSubmitEditing={() => {
                this.validateConfirmationPassword();
                this.signup();
              }}
            />
          </View>
          <Button
            loading={isLoading}
            title="REGISTRARSE"
            containerStyle={{ flex: -1 }}
            buttonStyle={styles.signUpButton}
            titleStyle={styles.signUpButtonText}
            onPress={() => this.signup()}
            disabled={isLoading}
          />
          </KeyboardAvoidingView>
          <View style={styles.loginHereContainer}>
          <Text style={styles.alreadyAccountText}>
            ¿Ya tiene cuenta?
          </Text>
          <Button
            title="Inicie Sesión"
            titleStyle={styles.loginHereText}
            containerStyle={{ flex: -1 }}
            buttonStyle={{ backgroundColor: 'transparent' }}
            underlayColor="transparent"
            onPress={() => /*Alert.alert('🔥', 'You can login here')*/this.props.navigation.navigate("Main")}
          />
        </View>
          </ScrollView>
        )

        /*
                        <View style={styles.h}>
                  <Text style={styles.text}>TerryBOX</Text>
                </View>
                <View style={styles.sesion}>
                  <Text style={styles.is}>Registro</Text>
                  <View style={styles.form}>
                    <Text style={styles.d}>Usuario:</Text>
                    <TextInput style={styles.dat} autoCapitalize='none' returnKeyType='next' name='name' ></TextInput>
                  </View>
                  <View style={styles.form}>
                    <Text style={styles.d}>Correo:</Text>
                    <TextInput style={styles.dato} autoCapitalize='none' returnKeyType='next' name='email'></TextInput>
                  </View>
                  <View style={styles.form3}>
                  <Text style={styles.d}>Contraseña:</Text>
                  <TextInput style={styles.da} secureTextEntry={true} returnKeyType='next' name='password'></TextInput>
                  </View>
                  <View style={styles.form2}>
                  <Text style={styles.d}>Confirmar Contraseña:</Text>
                  <TextInput style={styles.con} secureTextEntry={true} returnKeyType='go' name='confirm_password'></TextInput>
                  </View>
                  <View style={styles.btn}>
                  <Button style={styles.btn} title="Registrarse" onPress={() => this.props.navigation.navigate("Inicio de Sesión")} />
                </View>
              </View>
        */
    }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: 'white',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  signUpText: {
    color: 'white',
    fontSize: 28,
  },
  whoAreYouText: {
    color: '#7384B4',
    fontSize: 14,
  },
  userTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  userTypeItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  userTypeItemContainerSelected: {
    opacity: 1,
  },
  userTypeMugshot: {
    margin: 4,
    height: 70,
    width: 70,
  },
  userTypeMugshotSelected: {
    height: 100,
    width: 100,
  },
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'black',
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
  signUpButtonText: {
    fontSize: 13,
  },
  signUpButton: {
    width: 250,
    borderRadius: Math.round(45 / 2),
    height: 45,
  },
  loginHereContainer: {
    //flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyAccountText: {
    marginTop: 5,
    fontSize: 12,
    color: 'black',
  },
  loginHereText: {
    color: 'rgb(7,89,212)',
    fontSize: 12,
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
      marginTop: 50,
    },
    form:{
      flexDirection: 'row',
    },
    form3:{
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
      marginLeft: 94,
      paddingLeft: 5,
      height: 38,
      width: 170,
      borderColor: 'black',
      borderWidth: 1,
    },
    con:{
        marginLeft: 20,
        paddingLeft: 5,
        height: 38,
        width: 170,
        borderColor: 'black',
        borderWidth: 1,
      },
    dat:{
      marginLeft: 119,
      paddingLeft: 5,
      height: 38,
      width: 170,
      borderColor: 'black',
      borderWidth: 1,
    },
    dato:{
        marginLeft: 126,
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
    logo:{
      marginTop: 50,
      width: 200,
      height: 200,
    },
  });