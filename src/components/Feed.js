import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  FlatList,
  Platform,
  AsyncStorage
} from 'react-native';
import Post from './Post';

import InstaluraFetchService from './../services/InstaluraFetchService';

import Notificacao from '../api/Notificacao';

export default class Feed extends Component {

  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    const recurso = '/fotos'
    InstaluraFetchService.get(recurso)
    .then(json => this.setState({fotos: json}))
  }

  buscaPorId(idFoto) {
    return this.state.fotos
    .find(foto => foto.id === idFoto)
  }

  atualizaFotos(fotoAtualizada) {
    const fotos = this.state.fotos
    .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada: foto)
    this.setState({fotos})
  }

  like(idFoto) {
    const foto = this.buscaPorId(idFoto);
    const fotosAntes = this.state.fotos;

    AsyncStorage.getItem('usuario')
    .then(usuarioLogado => {

      let novaLista = [];
      if(!foto.likeada) {
        novaLista = [
          ...foto.likers,
          {login: usuarioLogado}
        ];
      } else {
        novaLista = foto.likers.filter(liker => {
          return liker.login !== usuarioLogado
        });
      }

      return novaLista;
    })
    .then(novaLista => {
      const fotoAtualizada = {
        ...foto,
        likeada: !foto.likeada,
        likers: novaLista
      };

      this.atualizaFotos(fotoAtualizada);
    });

    const recurso = `/fotos/${idFoto}/like`;
    InstaluraFetchService.post(recurso)
      .catch(e => {
        Notificacao.exibe("Ops...", "Algo deu errado em sua solicitação");
        this.setState({fotos: fotosAntes});
      });

  }

  adicionaComentario(idFoto, valorComentario, inputComentario) {
    if(valorComentario === '')
    return;

    const foto = this.buscaPorId(idFoto);

    const recurso = `/fotos/${idFoto}/comment`;

    const comentario = {
    texto: valorComentario
  };

  InstaluraFetchService.post(`/fotos/${idFoto}/comment`, comentario)
    .then(comentario => [...foto.comentarios, comentario])
    .then(novaLista => {
      const fotoAtualizada = {
        ...foto,
        comentarios: novaLista
      }

      this.atualizaFotos(fotoAtualizada);
      inputComentario.clear();
    });
  }

  render() {
    return (
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={this.state.fotos}
        renderItem={ ({item}) =>
        <Post foto={item}
          likeCallback={this.like.bind(this)}
          comentarioCallback={this.adicionaComentario.bind(this)}/>
      }
      />
  );
}
}
