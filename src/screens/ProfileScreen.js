import React, {Component} from 'react'
import { View, Text, Button, Image, StyleSheet, TouchableOpacity} from 'react-native'
import UserService from '../services/UserService';
import { Transition } from 'react-navigation-fluid-transitions'

export default class ProfileScreen extends Component {

    logoutHandler = () => {
        this.props.navigation.navigate('Logout')
    }

    state = {
        login: "",
        avatar: 'https://placehold.it/500x500',
        publicacoes: [],
        quantidadeDePosts: 0,
        isCarregando: true
    }

    async componentDidMount() {
        const userProfileInfo = await UserService.getProfileInfo()
        this.setState({
            login: userProfileInfo.login,
            avatar: userProfileInfo.avatar,
            publicacoes: userProfileInfo.publicacoes,
            quantidadeDePosts: userProfileInfo.publicacoes.length,
            isCarregando: false
        })
    }

    render() {
        return(
            <View>
                <View style={styles.userInfoContainer}>
                    <Image style={styles.userAvatar}
                        source={{uri:this.state.avatar}}
                    />
                    <View>
                        <Text style={styles.userLogin}>@{this.state.login}</Text>
                        <Text style={styles.userLoginPubs}>{this.state.quantidadeDePosts} Publicações</Text>
                    </View>
                </View>
                <Button title="Logout!" onPress={this.logoutHandler} />

                {
                    (this.state.isCarregando) && <Text>Carregando...</Text>
                }

                <View style={styles.userGalleryContainer}>
                {
                    this.state.publicacoes.map((foto) => {
                        return (
                            <TouchableOpacity key={foto.id} onPress={() => {
                              this.props.navigation.navigate('PostDetails', {
                                  foto: foto
                              })
                            }}> 
                                <Transition shared={`fotoImage${foto.id}`}>
                                <Image
                                    style={styles.userGalleryImage}
                                    source={{uri:foto.urlFoto}}
                                />
                                </Transition>
                            </TouchableOpacity>
                        )
                    })

                }
                </View>
                <Text></Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    userInfoContainer: {
        flexDirection:'row',
        alignItems:'center',
        padding:15
    },
    userLogin: {
        fontSize:25,
        fontWeight:'bold',
        marginLeft:15,
    },
    userLoginPubs: {
        fontSize:15,
        fontWeight:'bold',
        marginLeft:15,
    },
    userAvatar: {
        width:120,
        height:120,
        borderRadius:100,
    },
    userGalleryContainer: {
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-start',
        marginTop:15,
    },
    userGalleryImage: {
        width:120,
        height:120,
        margin:1,
    }
})