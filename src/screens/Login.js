import React, { Component } from 'react';
import {
  Dimensions,
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  AsyncStorage,
  Platform
} from 'react-native';

const width = Dimensions.get('screen').width;

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      usuario: '',
      senha: '',
      mensagem: '',
    }
  }

  efetuaLogin() {
    const uri = Platform.OS === 'ios' ?
      'http://localhost:8080/api/public/login' :
      'http://10.0.2.2:8080/api/public/login'

    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({
        login: this.state.usuario,
        senha: this.state.senha
      }),
      headers: new Headers({
        'Content-type': 'application/json'
      })
    };

    fetch(uri, requestInfo)
    .then(response => {
      if (response.ok)
      return response.text();

      throw new Error('Não foi possível efetuar login');
    })
    .then(token => {
      AsyncStorage.setItem('token',token)
      AsyncStorage.setItem('usuario',this.state.usuario)
      this.props.navigator.resetTo({
        screen: 'Feed',
        title: 'Instalura'
      })
    })
    .catch(error => this.setState({mensagem: error.message}))

  }

  render(){

    return(
      <View style={styles.container}>
        <Text style={styles.title}>Instalura</Text>
        <View style={styles.form}>
          <TextInput placeholder="Usuário..."
            onChangeText={texto => this.setState({usuario: texto})}
            style={styles.input}
            autoCapitalize="none"
            underlineColorAndroid='transparent' />
          <TextInput placeholder="Senha..."
            onChangeText={texto => this.setState({senha: texto})}
            style={styles.input}
            secureTextEntry={true}
            underlineColorAndroid='transparent' />
          <Button title="Login"
            onPress={this.efetuaLogin.bind(this)} />
        </View>
        <Text style={styles.mensagem}>
          {this.state.mensagem}
        </Text>
      </View>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24
  },
  form: {
    width: width * 0.8
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 5,
  },
  mensagem: {
    marginTop: 15,
    color: '#e74c3c',
  },
})
