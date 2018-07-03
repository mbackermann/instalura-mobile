/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions
} from 'react-native';

import Post from './src/components/Post';

const width = Dimensions.get('screen').width;

export default class InstaluraMobile extends Component {

  constructor(props){
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount(){
    fetch('http://10.0.2.2:8080/api/public/fotos/rafael')
      .then( response => response.json())
      .then( json => this.setState({fotos: json}))
  }

  render() {

    return (
      <FlatList style={styles.container}
        keyExtractor={item => String(item.id)}
        data={this.state.fotos}
        renderItem={ ({item}) =>
        <Post foto={item}/>
      }
      />
  );
}
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  }
})
