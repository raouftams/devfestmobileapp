import { SafeAreaView, View, Text, TextInput, Button, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
//import useAuth from '../hooks/useAuth'
import { useTailwind } from 'tailwind-rn/dist'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons"
import ScrollingButtonMenu from 'react-native-scroll-menu';
import { whitespace } from 'tailwind-rn/unsupported-core-plugins'

const HomeScreen = () => {
    //const { signInWithGoogle, loading } = useAuth();
    const tw = useTailwind();
    const navigation = useNavigation();

    const [selectedItem, setSelectedItem] = useState("1")

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    
    return (
        <SafeAreaView style={[tw("flex-1"), {paddingTop: Platform.OS === 'android' ? 30 : 0}]}>
            <View style={tw("flex-row items-center justify-between px-5")}>
                <Text
                    style={tw("font-bold text-2xl")}
                >
                    Hello Abdelhak !

                </Text>
                <TouchableOpacity style={tw("")}>
                    <Ionicons name='person-circle-outline' size={55} color="#AEB9CB" />
                </TouchableOpacity>
            </View>
            <TextInput
              style={tw("mx-4 text-md mt-2 py-3 px-2 border border-gray-300 rounded-2xl")}
              placeholder='Search'
            />

            <ScrollingButtonMenu
                items={[
                  {
                    id: "1",
                    name: 'Suggested',
                    backgroundColor: '#4F95FF',
                    borderColor: '#4F95FF',
                  },
                  {
                    id: "2",
                    name: 'Restaurants',
                  },
                  {
                    id: "3",
                    name: 'Hotels',
                  },
                  {
                    id: "4",
                    name: 'Museum',
                  },
                  {
                    id: "5",
                    name: 'Festivals',
                  },
                ]}
                onPress={(e) => {
                  setSelectedItem(e.id)
                }}
                selected={selectedItem}
                buttonStyle={{
                    backgroundColor: "transparent",
                    borderColor: '#4F95FF',
                }}
                textStyle={{
                    color: "#4F95FF",
                }}
                activeColor="white"
                activeBackgroundColor="#4F95FF"
            />

            <Text style={tw("text-xl font-semibold text-gray-700 mx-4 mt-4")}>
                What you may like this week
            </Text>
            
            <ScrollView>
                {recommendedData.map(recommendation => {
                    return (
                        <View>
                            <Text style={[tw("text-lg font-bold mx-4"),{color:"#4F95FF"}]}>{recommendation.type}</Text>
                            <View style={tw("flex-1 flew-row mx-4")}>
                                {recommendation.data.map(element => {
                                    return (
                                        <Text>{element.name}</Text>
                                    )
                                })}
                            </View>
                        </View>
                        
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

const recommendedData = [
    {
        type: 'restaurants',
        data: [
            {
                name: "Casbah Istanbul",
                location: "Bab ezzouar",
                image: "",
                score: 5
            },
            {
                name: "MIM Restaurant",
                location: "Draria",
                image: "",
                score: 4.5
            }
        ]
    },
    {
        type: 'Hotels',
        data: [
            {
                name: "El Djaouhara hotel",
                location: "Bab zzouar",
                image: "",
                score: 5
            },
            {
                name: "MIM Hotel",
                location: "Draria",
                image: "",
                score: 4.5
            }
        ]
    },
    {
        type: 'Activities',
        data: [
            {
                name: "Hiking",
                location: "Alger Centre",
                image: "",
                score: null
            },
            {
                name: "Marathon",
                location: "Draria",
                image: "",
                score: null
            }
        ]
    }
]

export default HomeScreen