import React, {Component} from 'react'
import {View, Text, Button, AsyncStorage} from 'react-native'
import {createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation'
import * as Animatable from 'react-native-animatable';
import LoginScreen from './screens/LoginScreen';
import AuthScreen from './screens/AuthScreen';
import FeedScreen from './screens/FeedScreen';
import ProfileScreen from './screens/ProfileScreen';
import LogoutScreen from './screens/LogoutScreen';
import PostDetailsScreen from './screens/PostDetailsScreen';
import { FluidNavigator } from 'react-navigation-fluid-transitions';



class SplashScreen extends Component {
    componentDidMount() {
        setTimeout(() => {
            const isUserAuth = false
            this.props.navigation.navigate(isUserAuth ? 'AreaLogado' : 'AreaDeslogado')
        }, 1)
    }
    render() {
        return(
            <View style={{
                flex:1,
                backgroundColor:'gold',
                justifyContent:'center',
                alignItems:'center'
            }}>
                <Animatable.Text style={{
                    color:'black', fontSize:40 }}
                    animation="pulse"
                    iterationCount="infinite"
                >
                    Instaelum
                </Animatable.Text>
            </View>
        )
    }
}


const DeslogadoStack = createStackNavigator({
    Login: { screen: LoginScreen }
}, { initialRouteName : 'Login'})


const LogadoTabNavigation = createBottomTabNavigator({
    Feed: { screen: FeedScreen, },
    Profile: FluidNavigator({
        ProfileHome: { screen: ProfileScreen },
        PostDetails: { screen: PostDetailsScreen },
    })
})
const AppNavigator = createSwitchNavigator({
        Splash: SplashScreen,
        AreaDeAutenticar: AuthScreen,
        AreaLogado: LogadoTabNavigation,
        AreaDeslogado: DeslogadoStack,
        Logout: LogoutScreen
    }, {
    initialRouteName: 'AreaDeAutenticar'
});

export default createAppContainer(AppNavigator) ;

