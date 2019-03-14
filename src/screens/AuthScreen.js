import React, {Component} from 'React';
import {Text, AsyncStorage} from 'react-native'

export default class AuthScreen extends React.Component {

    componentDidMount() {
        AsyncStorage.getItem('CW_TOKEN')
            .then((token)=> {
                const isUserAuth = Boolean(token)
                this.props.navigation.navigate(isUserAuth ? 'AreaLogado' : 'AreaDeslogado')
            })
    }

    render() {
        return (
            <Text>Aguarde...</Text>
        )
    }
}

