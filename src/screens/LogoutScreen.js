import React, {Component} from 'react'
import { View, Text, Button, AsyncStorage} from 'react-native'

export default class LogoutScreen extends Component {

    componentDidMount() {
        AsyncStorage.setItem('CW_TOKEN', '').then(() => {
        }).then(() => {
            AsyncStorage.setItem('CW_USERLOGIN', '')
        }).then(() => {
            this.props.navigation.navigate('AreaDeAutenticar')
        })
    }

    render() {
        return(
            <View>
                <Text>Saindo....</Text>
            </View>
        )
    }

}