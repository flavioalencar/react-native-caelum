

import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import CardPost from '../components/CardPost'
import FotosService from '../services/FotosService';
import CommentsArea from '../components/CommentsArea';


export default class App extends Component {

  state = {
    fotos: [],
    refreshando: false,
  }

  componentDidMount() {
      this.pegaDados()
      
  }
  
  pegaDados() {
    FotosService.pegaOFeedComAsFotos().then((respostaCovnertidaEmObjeto) => {
      this.setState({
        fotos: respostaCovnertidaEmObjeto
      })
    })
  }

  render() {
    
    const fotos = this.state.fotos

    return (
      
      <View>

        <FlatList
          data={fotos}
          onRefresh={() => {
            this.setState({
              refreshando: false
            }, () => {
              this.pegaDados()
            })
          }}
          refreshing={this.state.refreshando}
          renderItem={({item}) => {
            return(<CardPost foto={item} />)
          }}
          keyExtractor={(item,index) => `index-${item}`}
        />
        {
          // fotos.map(function (foto, indice) {
          //   return(<CardPost key={indice} foto={foto} />)
          // })
        }
                <CommentsArea />
      </View>
    );
  }
}
