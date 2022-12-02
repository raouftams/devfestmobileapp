import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons"
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { useNavigation } from '@react-navigation/native'

const Navbar = () => {

    const tw = useTailwind()
    const navigation = useNavigation()

    return (
        <View>
            <View style={tw("absolute bottom-0 w-full bg-white flex-1 flex-row justify-between items-center px-10 py-2 h-16")}>
                <TouchableOpacity 
                  style={tw("flex justify-center items-center")}
                  onPress={() => navigation.navigate("Home")}
                >
                    <Ionicons name='home-outline' size={26} color={"#4F95FF"}/>
                    <Text 
                        style={[tw("text-center font-semibold"), {color: "#4F95FF"}]} 
                    >
                        Home
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={tw("flex justify-center items-center")}
                  onPress={() => navigation.navigate("Help")}
                >
                    <Ionicons name='call-outline' size={26} color={"#4F95FF"}/>
                    <Text 
                        style={[tw("text-center font-semibold"), {color: "#4F95FF"}]} 
                    >
                        Help
                    </Text>
                </TouchableOpacity>    
            </View>
            <TouchableOpacity 
              style={[tw("absolute rounded-full p-4 z-50 bottom-4 mx-40 "), {border: "1px solid #4F95FF", backgroundColor: "#4F95FF"}]}
              onPress={() => navigation.navigate("Chat")}
            >
                <Ionicons name='chatbubble-outline' size={40} color={"#FFFFFF"}/>
                
            </TouchableOpacity>
        </View>
    )
}

export default Navbar

const styles = StyleSheet.create({
    button: {
        shadowColor: 'rgba(0,0,0)', // IOS
        shadowOffset: { height: 10, width: 5 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    }

})