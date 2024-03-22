import React, { useEffect, useState } from "react"
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native'

import styles from "../Appstyles"
import { useFonts, CuteFont_400Regular } from '@expo-google-fonts/cute-font'

import Header from '../components/Header'

export default function Movie({ route, navigation }) {
    const id = route.params.movieId
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [values, setValues] = useState({
        title: '',
        description: '',
        rating: '1'
    })

    let [fontsLoaded] = useFonts({ CuteFont_400Regular })

    let ignore = false
	useEffect(() => {
		if(!ignore){
			getMovie()
		}

		return () => {
			ignore = true
		}
		}, [])

        const getMovie = async () => {
            setLoading(true)
            try {
                await fetch(`https://movie-app-deplyoment-5c3c54d11d03.herokuapp.com/api/v1/movies/${id}`)
                        .then(res => res.json())
                        .then(data => {
                            setValues({
                                title: data.title,
                                description: data.description,
                                rating: data.rating
                            })
                        })
            } catch(error) {
                setError(error.message || "Unexpected Error")
            } finally {
                setLoading(false)
            }
        }

        const deleteMovie = async () => {
            try {
                await fetch(`https://movie-app-deplyoment-5c3c54d11d03.herokuapp.com/api/v1/movies/${id}`, {
                    method: 'DELETE'
                })
                            .then(res => res.json())
                            .then(navigation.navigate('Home'))
                } catch(error) {
                    setError(error.message || "Unexpected Error")
                } finally {
                    setLoading(false)
                }
        }

        const updateMovie = async () => {
            try {
                await fetch(`https://movie-app-deplyoment-5c3c54d11d03.herokuapp.com/api/v1/movies/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                        .then(res => res.json())
            } catch(error) {
                setError(error.message || "Unexpected Error")
            } finally {
                setLoading(false)
            }
        }

        const handleInputChanges = (key, value) => {
            setValues((values) => ({
                ...values,
                [key]: value
            }))
        }

        const handleSubmit = () => {
            updateMovie()
        }

    if (fontsLoaded) {
        return (
            <SafeAreaView style={styles.container}>
                {values && (
                    <View>
                        <Header>{values.title}</Header>

                        <Text style={{
                            fontFamily: 'CuteFont_400Regular',
                            fontSize: 50,
                            textAlign: 'center',
                            color: '#fff'}}>
                                Description:
                        </Text>

                        <Text style={{
                            fontFamily: 'CuteFont_400Regular',
                            fontSize: 50,
                            textAlign: 'center',
                            color: '#fff'}}>
                                {values.description}
                        </Text>

                        <Text style={{
                            fontFamily: 'CuteFont_400Regular',
                            fontSize: 50,
                            textAlign: 'center',
                            color: '#fff'}}>
                                Rating:
                        </Text>

                        <Text style={{
                            fontFamily: 'CuteFont_400Regular',
                            fontSize: 50,
                            textAlign: 'center',
                            color: '#fff'}}>
                                {values.rating}
                        </Text>
                    </View>
                )}

                <View>
                    <TextInput 
                    value={values.title} 
                    onChangeText={(text) => handleInputChanges('title', text)}
                    placeholder='Title' 
                    style={styles.input} />
                </View>

                <View>
                    <TextInput 
                    value={values.description} 
                    onChangeText={(text) => handleInputChanges('description', text)}
                    placeholder='Description' 
                    style={styles.input} />
                </View>


                <View>
                    <TextInput
                    value={values.rating.toString()}
                    onChangeText={(number) => handleInputChanges('rating', number)}
                    placeholder='Rating'
                    keyboardType="numeric"
                    inputMode="numeric"
                    style={styles.input} />
                </View>
    
                <View style={styles.button}>
                    <Button title="Submit" onPress={handleSubmit} color='black' />
                </View>
    
                <View style={styles.button}>
                    <Button title="Delete Movie" onPress={deleteMovie} color='black' />
                </View>
            </SafeAreaView>
        )
    }
}