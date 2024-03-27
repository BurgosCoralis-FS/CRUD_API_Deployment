import AsyncStorage from "@react-native-async-storage/async-storage"

const authHeader = async () => {
    try {
        const user = await AsyncStorage.getItem('user')
        // console.log('retrieved user auth header', user)
        

        if(user){
            const parsedUser = JSON.parse(user)
            // console.log('retrieved token auth header', parsedUser.token)
            return { 'Authorization' : parsedUser.token}
        }
        else{
            return {}
        }
    } catch(err) {
        console.error('error getting user from storage', err)
        return {}
    }
}

export default authHeader