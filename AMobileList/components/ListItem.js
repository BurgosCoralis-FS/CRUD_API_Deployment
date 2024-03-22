import { Button, View } from 'react-native'

import styles from '../Appstyles';

export default function ListItem({ children, onPress, movieId }) {
    return (
        <View style={styles.listItem}>
            <Button title={children} color={'yellow'} onPress={() => onPress(movieId)} />
        </View>
    )
}