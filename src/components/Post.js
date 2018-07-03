import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';

import InputComentario from './InputComentario'
import Likes from './Likes'

const width = Dimensions.get('screen').width;

export default class Post extends Component {

  constructor(props){
    super(props);
    this.state = {
      foto: this.props.foto,
    }
  }


  like() {
    const {foto} = this.state
    let novaLista = [];

    if(!foto.likeada){
      novaLista = [
        ...foto.likers,
        {login: 'meuUsuário'}
      ]
    }else{
      novaLista = foto.likers.filter((liker) => {
        liker.login !== 'meuUsuário'
      })
    }

    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista
    }

    this.setState({foto: fotoAtualizada});
  }



  exibeLegenda(foto){
    if(foto.comentario === '') return;

    return (
      <View style={styles.comentario}>
        <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
        <Text>{foto.comentario}</Text>
      </View>
    )
  }

  adicionaComentario(valorComentario, inputComentario){
    if(valorComentario === '')
    return;

    const novaLista = [...this.state.foto.comentarios, {
      id: valorComentario,
      login: 'meuUsuario',
      texto: valorComentario,
    }];

    const fotoAtualizada = {
      ...this.state.foto,
      comentarios: novaLista,
    }

    this.setState({foto: fotoAtualizada});
    inputComentario.clear();
  }

  render() {

    const {foto} = this.state;

    return (
      <View>
        <View style={styles.cabecalho}>
          <Image source={{uri: foto.urlPerfil}}
            style={styles.fotoPerfil} />
          <Text>{foto.loginUsuario}</Text>
        </View>
        <Image source={{uri: foto.urlFoto}}
          style={styles.fotoPost} />

        <View style={styles.rodape}>

          <Likes
            likeCallback={this.like.bind(this)}
            foto={foto}
            />

          {this.exibeLegenda(foto)}

          {foto.comentarios.map(comentario =>
            <View style={styles.comentario} key={comentario.id}>
              <Text style={styles.tituloComentario}>{comentario.login}</Text>
              <Text>{comentario.texto}</Text>
            </View>
          )}

          <InputComentario
            comentarioCallback={this.adicionaComentario.bind(this)}/>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  fotoPerfil: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20
  },
  fotoPost: {
    width: width,
    height: width
  },
  rodape: {
    margin: 10
  },
  likes: {
    fontWeight: 'bold'
  },
  comentario: {
    flexDirection: 'row'
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5
  },

})
