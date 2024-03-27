import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

const signup = (email, password) => {
    return axios.post('https://movie-app-deplyoment-5c3c54d11d03.herokuapp.com/api/v1/auth', {
        email, password
    })
    .then(response => {
        if(response.data.token){
            AsyncStorage.setItem('user', JSON.stringify({
                userId: response.data.user_id,
                token: response.data.token
            }))
        }
        return response.data
    })
}

const login = (email, password) => {
    return axios.post(`https://movie-app-deplyoment-5c3c54d11d03.herokuapp.com/api/v1/auth/signin`, {
        email, password
    })
    .then(response => {
        // console.log('login data', response.data)
        if(response.data.token){
            AsyncStorage.setItem('user', JSON.stringify({
                userId: response.data.user_id,
                token: response.data.token
            }))
        }
        return response.data
    })
}

const logout = () => {
    AsyncStorage.removeItem('user')
}

const getCurrentUser = async () => {
    try {
        const user = await AsyncStorage.getItem('user')
        // console.log('get current user', user)
        return user ? JSON.parse(user) : null
    } catch (err) {
        console.error('Error getting user', err)
    }
}

const authService = {
    signup,
    login,
    logout,
    getCurrentUser
}

export default authService