import React, {Component} from 'React';
import {View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native'
import LikeButton from './LikeButton'
import FotosService from '../services/FotosService';


export default class CardPost extends Component {
    
    constructor(props) {
        super()
        this.state = {
            foto: props.foto,
        }
    }

    like = async() => {

        const usuario = await AsyncStorage.getItem('CW_USERLOGIN')
        
        let likersAtualizado = [
            ...this.state.foto.likers
        ]

        if(!this.state.foto.likeada) {
            likersAtualizado.push({login: usuario})
        } else {
            likersAtualizado = likersAtualizado.filter((liker) => {
                return liker.login !== usuario
            })
        }

        

        const fotoAtualizada = {
            ...this.state.foto,
            likeada: !this.state.foto.likeada,
            likers: likersAtualizado
        }

        this.setState({
            foto: fotoAtualizada,
        })
        
        FotosService.like(this.state.foto.id)
    }
    

    render() {

        
        const foto = this.state.foto;
        

        return (
            
            <View style={styles.container}> 
               
                <View style={ styles.header}>
                    <Image style={ styles.headerImage }  source={ { uri:foto.urlPerfil}} />
                    <Text>@{foto.loginUsuario}</Text>
            </View>
           
            <Image style={ styles.imagePost } source={ { uri:foto.urlFoto}} />

            <View>
                <LikeButton onPress={this.like} likeActive={foto.likeada}></LikeButton>      
                <Text>{foto.likers.length} Likes</Text>     
                <Text>Curtida por: {
                    foto.likers.length && foto.likers[0].login
                }</Text>     
                <Text>Descricao da foto</Text>
            </View>
            </View> 
        )
        
    }
      
}

const larguraTotal = Dimensions.get('screen').width
const styles = StyleSheet.create({
    container: {marginBottom:20},
    header: {flexDirection:'row', alignItems:'center', paddingTop:15, paddingBottom:15, paddingLeft:5 },
    headerImage: { width:50, height: 50, borderRadius:50, marginRight:10 },
    imagePost: { width:larguraTotal, height: larguraTotal },
    
})