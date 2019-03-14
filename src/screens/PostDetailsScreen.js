import React, {Component} from 'react'
import { View, Text, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Transition } from 'react-navigation-fluid-transitions'

export default class PostDetailsScreen extends Component {
    render() {
        const foto = this.props.navigation.getParam('foto', {})
        return(
            <ScrollView>
                <Transition shared={`fotoImage${foto.id}`}>
                <Image
                    style={{flex: 1, height:400}}
                    source={{uri:foto.urlFoto}}
                />
                </Transition>
                <Transition appear='horizontal' disappear='bottom'>
                    <Text>OLA MUNDO</Text>
                </Transition>
            </ScrollView>
        )
    }
}