import React, { useState } from "react"
import { Button, Text, TextInput, TouchableOpacity, SafeAreaView, View } from 'react-native'

import authService from "../services/auth.service"

import Header from '../components/Header'
import styles from "../Appstyles"

import { useFonts, CuteFont_400Regular } from '@expo-google-fonts/cute-font'

export default function SignIn({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ signIn, setSignIn] = useState(true)
    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false)

    let [fontsLoaded] = useFonts({ CuteFont_400Regular })

    const handleSignUp = async (event) => {
        event.preventDefault()
        try{
            await authService.signup(email, password).then(
                response => {
                    navigation.navigate('Home')
                }
            )
        } catch(err) {
            console.error(err)
            setError(err)
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            await authService.login(email, password).then(
                response => {
                    navigation.navigate('Home')
                }
            )
        } catch(err) {
            console.error(err)
            setError(err)
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    if(fontsLoaded){
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Header>Sign In</Header>
                </View>
    
                <View>
                    <Text style={{
                        fontFamily: 'CuteFont_400Regular',
                        fontSize: 50,
                        textAlign: 'center',
                        color: '#fff'}}>
                            {signIn ? 'Sign Up' : 'Log In'}
                        </Text>
                    <View>
                        <TextInput 
                        value={email} 
                        inputMode='email'
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                        placeholder='Your email address' 
                        style={styles.input}
                        autoCapitalize='none' />
                    </View>
    
                    <View>
                        <TextInput 
                        value={password} 
                        onChangeText={(text) => setPassword(text)}
                        placeholder={signIn ? 'Create a password' : 'Password'} 
                        style={styles.input}
                        secureTextEntry={!showPassword} 
                        textContentType={signIn ? 'newPassword' : 'password'}
                        autoCapitalize='none' />
                        <TouchableOpacity onPress={toggleShowPassword}>
                            <Text style={{ color: 'white' }}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
                        </TouchableOpacity>
                    </View>
    
                    <View style={styles.button}>  
                        <Button 
                        onPress={signIn ? handleSignUp : handleLogin}
                        title={signIn ? 'Sign Up' : 'Log in'}
                        color='black' />
                    </View>
                    
                    <Text style={{
                        fontFamily: 'CuteFont_400Regular',
                        fontSize: 30,
                        textAlign: 'center',
                        color: '#fff'}}>
                            Already have an account?
                        </Text>
                    <View style={styles.button}>
                        <Button onPress={() => setSignIn(!signIn)} 
                        title={signIn ? 'Switch to Log In' : 'Switch to Sign Up'}
                        color='black' />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}