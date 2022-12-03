import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import Header from '../components/Header'

const DetailsScreen = ({ route, navigation }) => {
    
    const { name, description, img } = route.params;

    const tw = useTailwind()
  return (
    <SafeAreaView
        style={{ paddingTop: Platform.OS === "android" ? 15 : 0 }}
    >
        <Header
          title="Help"
        />

        <View>
            <Image source={{uri: img}} style={[tw("mx-auto rounded-xl mt-5"), {width: 360, height: 300}]} />
            <Text style={tw("text-2xl font-bold mx-4 mt-4 text-gray-800")}>{name}</Text>
            <Text style={tw("mx-4 mt-4 text-gray-600 font-semibold text-justify")}>{description}</Text>
            <TouchableOpacity style={[tw("w-4/5 py-2 rounded-lg mx-auto mt-5"), {backgroundColor: "#4F95FF"}]}>
                <Text style={tw("text-xl font-bold text-white text-center")}>Participer</Text>
            </TouchableOpacity>
        </View>
        
    </SafeAreaView>
  )
}

export default DetailsScreen