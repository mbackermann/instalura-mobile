import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class Post extends Component {

  constructor(props){
    super(props);
    this.state = {
      foto: this.props.foto
    }
  }

  exibeLikes(likers) {
    if(likers.length <= 0)
    return;

    return (
      <Text style={styles.likes}>
        {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
      </Text>
    );
  }

  carregaIcone(likeada){
    return likeada ? require('../../resources/imgs/s2-check.png') :
    require('../../resources/imgs/s2.png')
  }

  render(){

    const { foto, likeCallback } = this.props;

    return(
      <View>
        <TouchableOpacity onPress={likeCallback} >
          <Image source={this.carregaIcone(foto.likeada)}
            style={styles.botaoDeLike} />
        </TouchableOpacity>
        {this.exibeLikes(foto.likers)}
      </View>
    )

  }

}

const styles = StyleSheet.create({
  botaoDeLike: {
    width: 40,
    height: 40
  },
  likes: {
    fontWeight: 'bold'
  },

});
