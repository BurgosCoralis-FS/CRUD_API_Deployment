import { FlatList, SafeAreaView, View } from 'react-native'
import ListItem from './ListItem'

export default function ListContainer({ data, onPress }) {
    const renderItem = ({ item }) => (
        <ListItem 
        onPress={onPress} 
        movieId={item._id}>
            { item.title }
        </ListItem>
    )

    return (
        <SafeAreaView>
            <View>
                <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                />
            </View>
        </SafeAreaView>
    )
}