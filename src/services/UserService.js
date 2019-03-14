import {AsyncStorage} from 'react-native'

const API_URL = 'https://instalura-api.herokuapp.com/api/public/fotos'

export default class UserService {

    static getProfileInfo = async() => {
        const login = await AsyncStorage.getItem('CW_USERLOGIN')
        const publicacoes = await fetch(`${API_URL}/${login}`).then(response => response.json())
        let avatar = ''
        if(publicacoes.length > 0) avatar = publicacoes[0].urlPerfil
        return {
            login,
            publicacoes,
            avatar
        }
    }

}