import { View, Text, Button } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const tw = useTailwind()
    const navigation = useNavigation()
    return (
        <View style={tw("flex-1 justify-center items-center")}>
            <Text style={tw('text-blue-400')}>HomeScreen</Text>
            <Button title="Go to ChatScreen" onPress={() => navigation.navigate('Chat')} />
        </View>
    )
}

export default HomeScreen