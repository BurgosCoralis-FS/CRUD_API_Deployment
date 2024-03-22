import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Button, SafeAreaView, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import Header from '../components/Header'
import ListContainer from '../components/ListContainer'

import styles from "../Appstyles"

export default function Home({ navigation }) {
    const [movies, setMovies] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    useFocusEffect(
        useCallback(() => {
            let ignore = false

            if(!ignore) {
                getMovies()
            }

            return () => {
                ignore = true
            }
        }, [])
    )

    const getMovies = async () => {
        setLoading(true)
        try {
            await fetch(`https://movie-app-deplyoment-5c3c54d11d03.herokuapp.com/api/v1/movies`)
                    .then(res => res.json())
                    .then(data => {
                        // console.log({data})
                        setMovies(data)
                    })
        } catch(error){
            setError(error.message || 'Unexpected Error')
        } finally {
            setLoading(false)
        }
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
        </SafeAreaView>
    )
}