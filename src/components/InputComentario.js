import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';

export default class InputComentario extends Component {

  constructor(){
    super();
    this.state = {
      valorComentario: ''
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <TextInput style={styles.input}
          placeholder="Adicione um comentário..."
          underlineColorAndroid='transparent'
          ref={input => this.inputComentario = input}
          onChangeText={texto => this.setState({valorComentario: texto})}/>
        <TouchableOpacity onPress={() => {
            this.props.comentarioCallback(this.props.foto.id, this.state.valorComentario, this.inputComentario);
          }}>
          <Image style={styles.icone}
            source={require('../../resources/imgs/send.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    flex: 1
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  icone: {
    width: 30,
    height: 30
  }
})
