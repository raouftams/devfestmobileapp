import { SafeAreaView, View, Text, TextInput, Button, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
//import useAuth from '../hooks/useAuth'
import { useTailwind } from 'tailwind-rn/dist'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons"

const LoginScreen = () => {
    //const { signInWithGoogle, loading } = useAuth();
    const tw = useTailwind();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    
    return (
        <SafeAreaView style={[tw("flex-1"), {paddingTop: Platform.OS === 'android' ? 30 : 0}]}>
            <View style={tw("flex-row items-baseline justify-between px-5 pt-10")}>
                <Text
                    style={tw("font-bold text-2xl mt-10")}
                >
                    logo

                </Text>
                <TouchableOpacity style={[
                    tw("p-4 rounded-md"), 
                    { backgroundColor: "#4F95FF"}
                    ]}
                >
                    <Text 
                        style={tw("text-center font-semibold text-white w-24")} 
                    >
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
            <Text
                style={tw("mx-4 font-bold text-3xl mt-10 text-gray-700")}
            >
                    Login
            </Text>
            <Text style={tw("mx-4 mt-4 text-gray-700")}>
                Welcome back!
            </Text>
            <Text style={tw("mx-4 text-gray-700")}>
                Please enter your login information to continue
            </Text>
            <TextInput
              style={tw("mx-4 text-md mt-8 py-4 px-2 border border-gray-400 rounded-md")}
              placeholder='Username or Email'
            />
            <TextInput
              
              style={tw("mx-4 text-md mt-4 py-4 px-2 border border-gray-400 rounded-md")}
              placeholder='Password'
            />

            <TouchableOpacity style={[
                    tw("p-4 rounded-md mx-4 mt-12"), 
                    { backgroundColor: "#4F95FF"}
                    ]}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text 
                        style={tw("text-center text-2xl font-semibold text-white")} 
                    >
                        Login
                    </Text>
            </TouchableOpacity>


        </SafeAreaView>
    )
}

export default LoginScreen