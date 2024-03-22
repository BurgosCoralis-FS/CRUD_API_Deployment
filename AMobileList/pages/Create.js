import React, { useState } from "react"
import { Button, SafeAreaView, TextInput, View } from 'react-native'

import Header from '../components/Header'

import styles from "../Appstyles"

export default function Create({ navigation }) {
    const [values, setValues] = useState({
        title: '',
        description: '',
        rating: '1'
    })
    const [error, setError] = useState(null)

    const addMovie = async () => {
        try {
            await fetch(`https://movie-app-deplyoment-5c3c54d11d03.herokuapp.com/api/v1/movies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then(navigation.navigate('Home', { ignore: true }))
        } catch(error) {
                setError(error.message || "Unexpected Error")
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        addMovie()
    }

    const handleInputChanges = (key, value) => {

        setValues((values) => ({
            ...values,
            [key]: value
        }))
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Header>New Movie</Header>
            </View>
            
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
                value={values.rating}
                onChangeText={(number) => handleInputChanges('rating', number)}
                placeholder='Rating'
                keyboardType="numeric"
                inputMode="numeric"
                style={styles.input} />
            </View>

            <View style={styles.button}>
                <Button title="Submit" onPress={handleSubmit} color='black' />
            </View>
        </SafeAreaView>
    )
}