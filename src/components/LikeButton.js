import React, {Component} from 'React';
import {TouchableOpacity, StyleSheet} from 'react-native'
import * as Animatable from 'react-native-animatable';

export default class LikeButton extends Component {
    render() {
    
    const props = this.props
    return(
        <TouchableOpacity
            onPress={ () => {
                
                props.likeActive ? this.btnImage.bounceIn(800) : this.btnImage.jello(800)
                props.onPress() 
            }}>
            <Animatable.Image 
                style={ styles.likeButton } 
                source={ props.likeActive ? require('../assets/s2-checked.png') : require('../assets/s2.png') } 
                ref={(referenciaParaImagem) => {
                    this.btnImage = referenciaParaImagem
                }}
            />
        </TouchableOpacity>
    )
    }
}


const styles = StyleSheet.create({
    likeButton: { width:50, height: 50 }
})