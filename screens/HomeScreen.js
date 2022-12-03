import { SafeAreaView, View, Text, TextInput, Button, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
//import useAuth from '../hooks/useAuth'
import { useTailwind } from 'tailwind-rn/dist'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons"
import ScrollingButtonMenu from 'react-native-scroll-menu';
import { whitespace } from 'tailwind-rn/unsupported-core-plugins'
import Navbar from '../components/Navbar'

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
              style={tw("mx-4 mt-2 py-3 px-2 border border-gray-300 rounded-2xl")}
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
                    name: 'Activites',
                  },
                  {
                    id: "3",
                    name: 'Hotels',
                  },
                  {
                    id: "4",
                    name: 'Restaurants',
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

            <ScrollView style={tw("mb-20")}>
                <Text style={tw("text-xl font-semibold text-gray-700 mx-4 mt-4")}>
                    What you may like this week
                </Text>
                {selectedItem === "1" ?
                    recommendedData.map(recommendation => {
                        return (
                            <View style={tw("mt-4")} >
                                <Text style={[tw("text-lg font-bold mx-4"),{color:"#4F95FF"}]}>{recommendation.type}</Text>
                                <View style={tw("flex-1 flex-row justify-between mx-4")}>
                                    {recommendation.data.map(element => {
                                        return (
                                            <TouchableOpacity style={tw("border border-transparent bg-white rounded-xl p-2 w-44 h-52")}>
                                                <Image source={{uri: element.image}} style={[tw("rounded-md mx-auto"),{ width: 160, height: 120 }]} />
                                                <View style={tw("flex-1 flex-row justify-between items-center")}>
                                                    <View>
                                                        <Text style={tw("")}>{element.name}</Text>
                                                        <Text style={tw("text-sm text-gray-500")}>{element.location}</Text>
                                                    </View>
                                                    <Text style={tw("text-2xl font-bold text-yellow-300")}>{element.score ? element.score : null}</Text>
    
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </View>
                            
                        )
                    })
                
                :
                activitiesData.map(activity => {
                    return (
                        <View style={tw("mt-4 border border-white bg-white rounded-xl mx-4")} >
                            <View style={tw("flex-1 flex-row justify-between items-center mx-2")}>
                                <Image source={{uri: activity.image}} style={[tw("rounded-md mx-auto"),{ width: 160, height: 120 }]} />
                                <View style={tw("flex-1 flex-row justify-between items-center ml-2")}>
                                    <View>
                                        <Text style={tw("text-lg font-bold")}>{activity.name}</Text>
                                        <Text style={tw("text-sm text-gray-500")}>{activity.location}</Text>
                                        <TouchableOpacity onPress={() => navigation.navigate("Details", {name: activity.name, description: activity.description, img: activity.image})} style={[tw("px-2 py-2 mt-4 mb-2 bg-white w-24 rounded-md ml-20"), {backgroundColor: "#4F95FF"}]}>
                                            <Text style={tw("text-sm text-white text-center")}>Read more</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                        </View>
                    )
                })

                }
                
            </ScrollView>

            <Navbar/>
        </SafeAreaView>
    )
}

const recommendedData = [
    {
        type: 'Restaurants',
        data: [
            {
                id: 1,
                name: "Casbah Istanbul",
                location: "Bab ezzouar",
                image: "https://assets.airtrfx.com/media-em/af/cities/Argel-ALG.jpg",
                score: 5
            },
            {
                id: 2,
                name: "MIM Restaurant",
                location: "Draria",
                image: "https://www.sissi-traveltips.com/wp-content/uploads/2019/09/IMG_0088.jpg",
                score: 4.5
            }
        ]
    },
    {
        type: 'Hotels',
        data: [
            {
                id: 3,
                name: "El Djaouhara hotel",
                location: "Bab zzouar",
                image: "https://assets.airtrfx.com/media-em/af/cities/Argel-ALG.jpg",
                score: 5
            },
            {
                id: 4,
                name: "MIM Hotel",
                location: "Draria",
                image: "https://www.sissi-traveltips.com/wp-content/uploads/2019/09/IMG_0088.jpg",
                score: 4.5
            }
        ]
    },
    {
        type: 'Activities',
        data: [
            {
                id: 5,
                name: "Hiking",
                location: "Alger Centre",
                image: "https://assets.airtrfx.com/media-em/af/cities/Argel-ALG.jpg",
                score: null
            },
            {
                id: 6,
                name: "Marathon",
                location: "Draria",
                image: "https://www.sissi-traveltips.com/wp-content/uploads/2019/09/IMG_0088.jpg",
                score: null
            }
        ]
    }
]

const activitiesData = [
    {
        id: 1,
        name: "Guided visit to Casbah",
        location: "Casbah",
        image: "https://www.sissi-traveltips.com/wp-content/uploads/2019/09/IMG_0088.jpg",
        score: null,
        description: "Visit the nest of the Algerian revolution and discover the mythical places where the scene of the film 'The Battle of Algiers' was shot. Discover the places of the revolution as well as the magnificent Ottoman palace and the marvelous narrow streets full of stories and legends Guided by our guide islem genuine autochthonous Algiers "
    },
    {
        id: 2,
        name: "How to spend two days in Algiers",
        location: "Alger centre",
        image: "https://assets.airtrfx.com/media-em/af/cities/Argel-ALG.jpg",
        score: null,
        description: "This 2-day Algiers itinerary involves walking, so be sure to wear comfortable walking shoes."
    },
    {
        id: 3,
        name: "A visit in Algiers",
        location: "Bab zzouar",
        image: "https://assets.airtrfx.com/media-em/af/cities/Argel-ALG.jpg",
        score: null,
        description: "Visit the nest of the Algerian revolution and discover the mythical places where the scene of the film 'The Battle of Algiers' was shot. Discover the places of the revolution as well as the magnificent Ottoman palace and the marvelous narrow streets full of stories and legends Guided by our guide islem genuine autochthonous Algiers "
    },
    {
        id: 4,
        name: "Hiking and Camping",
        location: "Draria",
        image: "https://www.sissi-traveltips.com/wp-content/uploads/2019/09/IMG_0088.jpg",
        score: null,
        description: "Visit the nest of the Algerian revolution and discover the mythical places where the scene of the film 'The Battle of Algiers' was shot. Discover the places of the revolution as well as the magnificent Ottoman palace and the marvelous narrow streets full of stories and legends Guided by our guide islem genuine autochthonous Algiers "
    }
]

export default HomeScreen