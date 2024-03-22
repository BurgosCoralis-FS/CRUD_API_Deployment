import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Network from 'expo-network'

import Home from './pages/Home'
import Movie from './pages/Movie'
import Create from './pages/Create'

const Stack = createNativeStackNavigator()

export default function App() {
  Network.getNetworkStateAsync()
  .then(data => {
    console.log('Network data', {data})
  })

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{title: 'Home'}} />
        <Stack.Screen name='Movie' component={Movie} />
        <Stack.Screen name='Create' component={Create} />
      </Stack.Navigator>
      <StatusBar hidden={true} />
    </NavigationContainer>
  )
}
