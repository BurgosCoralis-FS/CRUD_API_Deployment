import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Button, SafeAreaView, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import Header from '../components/Header'
import ListContainer from '../components/ListContainer'
import authService from "../services/auth.service"
import movieService from "../services/movie.service"

import styles from "../Appstyles"

export default function Home({ navigation }) {
    const [movies, setMovies] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)

    useFocusEffect(
        useCallback(() => {
            async function getUser(){
                try {
                    const user = await authService.getCurrentUser()
                    if (user){
                        setCurrentUser(user)
                        privateContent()
                    }
                } catch (err) {
                    console.error("Error fetching user", err)
                }
            }
            getUser()
        }
        , [])
    )

    const privateContent = () => {
        setLoading(true)
        movieService.getAllPrivateMovies().then(
            response => {
                // console.log('movies', response.data)
                setMovies(response.data)
            }
        )
        .catch(err => {
            console.error('Secure page error', err)
            if(err.response && err.response.status === 403){
                authService.logout()
                navigation.navigate('SignIn')
            }
        })
        .finally(() => setLoading(false))
    }

    const handleLogOut = () => {
        authService.logout()
        navigation.navigate('SignIn')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
            <Header>Movie Tracker App</Header>
            </View>
            
            <View>
                { loading ? 
                (<ActivityIndicator size="large" color="#995db5" style={styles.loading} />) 
                : (<ListContainer 
                    data={movies} 
                    onPress={(movieId) =>
                        navigation.navigate('Movie', { movieId })}/>)}
            </View>
            
            <View style={styles.button}>
                <Button 
                title="Add a movie" 
                onPress={() => navigation.navigate('Create')}
                color='black' />
            </View>

            <View style={styles.button}>
                <Button 
                title="Log Out" 
                onPress={handleLogOut}
                color='black' />
            </View>
        </SafeAreaView>
    )
}