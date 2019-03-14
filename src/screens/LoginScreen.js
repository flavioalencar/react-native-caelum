import React, {Component} from 'React';
import {View, Button, Text, TextInput, StyleSheet, AsyncStorage} from 'react-native'

class LoginScreen extends React.Component {

    state = {
        login:"rafael",
        senha: "123456",
        erroGenerico: "",
        touchedFields: {
            login: false,
            senha: false
        }
    }



    logar = () => {

        this.setState({
            touchedFields: {
                login: true,
                senha: true
            }
        })

        const url = "https://instalura-api.herokuapp.com/api/public/login"
        const dadosLogin = {
            "login": this.state.login,
            "senha": this.state.senha
        }

        

        const configs = {
            method:'POST',
            body:JSON.stringify(dadosLogin),
            headers:{'Content-Type': 'application/json'}
        }

        fetch(url, configs)
            .then((respostaDoServidor) => {
                if(respostaDoServidor.ok) return respostaDoServidor.text()
                throw new Error('Não foi possível fazer o login :(')
            })
            .then((token) => {
                if(token) {
                    AsyncStorage.setItem('CW_TOKEN', token).then(async () => {
                        await AsyncStorage.setItem('CW_USERLOGIN', dadosLogin.login)
                        this.props.navigation.navigate('AreaDeAutenticar')
                    })
                } else {
                    throw new Error('Ocorrou um erro desconhecido no servidor. Tente mais tarde!')
                }
                
            })
            .catch((err)=> {
                this.setState({
                    erroGenerico: err.message
                });
            })
    }

    render () {
        return(
            <View style={styles.container}>
                <Text>INSTAELUM</Text>
                <TextInput
                    style={styles.formField}
                    placeholder="Login"
                    onChangeText = {login => this.setState({login})}
                    value={this.state.login}
                    onBlur={()=>this.setState({
                        touchedFields: {...this.state.touchedFields, login: true}
                    })}
                />
                
                {
                    this.state.login.length === 0 && this.state.touchedFields.login
                    ? <Text style={styles.errLabel}>Preencha o login ai manolo!</Text> 
                    : null              
                }
                {this.state.erroUsuario == true? <Text>ERRO</Text>: null }
                <TextInput
                    style={styles.formField}
                    placeholder="Senha"
                    onChangeText = {senha => this.setState({senha})}
                    value={this.state.senha}
                    secureTextEntry={true}
                    onBlur={()=>this.setState({
                        touchedFields: {...this.state.touchedFields, senha: true}
                    })}
                />
                {
                    this.state.senha.length === 0 && this.state.touchedFields.senha
                    ? <Text style={styles.errLabel}>Preencha a senha ai manolo!</Text> 
                    : null              
                }

                <Text>{this.state.erroGenerico}</Text>
                <Button
                    style={styles.formBtn}
                    title="Login"
                    onPress={()=>{
                       this.logar()
                    }}
                />
            </View>
        )
    }
    
}

LoginScreen.navigationOptions = {
    title: 'Pagina de Login',
    headerRight: (
        <Button
            onPress={() => alert('Teste de botão!')}
            title="Info"
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    title: {
        fontSize:50,
        color:'black'
    },
    formField: {
        borderBottomColor: 'black',
        borderBottomWidth:2,
        alignSelf:'stretch',
        marginLeft:30,
        marginRight:30,
        marginBottom:15,
    },
    formBtn: {
        width:400,
        backgroundColor:'red'
    },
    errLabel: {
        fontSize: 20,
        color:'red'
    }
})

export default  LoginScreen  