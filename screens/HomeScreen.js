import { View, Text } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'

const HomeScreen = () => {
    const tw = useTailwind()
    return (
        <View style={tw("flex-1 justify-center items-center")}>
            <Text style={tw('text-blue-400')}>HomeScreen</Text>
        </View>
    )
}

export default HomeScreen