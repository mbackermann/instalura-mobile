import { AsyncStorage, Platform } from 'react-native';

export default class InstaluraFetchService {

  static getHost(){
    return Platform.OS === 'ios' ?
    'http://localhost:8080/api' :
    'http://10.0.2.2:8080/api'
  }

  static get(recurso){
    const uri = this.getHost() + recurso;

    return AsyncStorage.getItem('token')
    .then(token => {
      return {
        headers: new Headers({
          "Content-type": "application/json",
          "X-AUTH-TOKEN": token
        })
      }
    })
    .then(requestInfo => fetch(uri, requestInfo))
    .then(response => response.json());
  }


  static post(recurso, dados) {
    const uri = this.getHost() + recurso;

    return AsyncStorage.getItem('token')
    .then(token => {
      return {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: new Headers({
          "Content-type": "application/json",
          "X-AUTH-TOKEN": token
        })
      };
    })
    .then(requestInfo => fetch(uri, requestInfo))
    .then(resposta => {
      if(resposta.ok)
        return resposta.json()

      throw new Error('Não foi possível completar a operação');
    });
  }

}
