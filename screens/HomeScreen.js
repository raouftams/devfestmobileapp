import { 
    View, 
    Text, 
    Button, 
    SafeAreaView, 
    TouchableOpacity, 
    Image, 
    Platform,
    StyleSheet
} from 'react-native'
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons"
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
import Swiper from "react-native-deck-swiper"
import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { db } from '../firebase'
import generateId from '../lib/generateId'


const HomeScreen = () => {
    const tw = useTailwind()
    const navigation = useNavigation()
    const {user, logout} = useAuth()
    const [profiles, setProfiles] = useState([])
    const swipeRef = useRef(null)


    useLayoutEffect(() => 
        onSnapshot(doc(db, 'users', user.uid), (snapShot) => {
            if (!snapShot.exists()){
                navigation.navigate("Modal")
            }
        })
    ,[]);

    
    
    useEffect(() => {
        let unsub;

        const fetchCards = async () => {

            const passes = await getDocs(collection(db, 'users', user.uid, 'passes')).then(
                (snapShot) => snapShot.docs.map((doc) => doc.id)
            )
            const passedUserIds = passes.length > 0 ? passes : ['test']

            
            const swipes = await getDocs(collection(db, 'users', user.uid, 'swipes')).then(
                (snapShot) => snapShot.docs.map((doc) => doc.id)
            )
            const swipedUserIds = swipes.length > 0 ? swipes : ['test']

            unsub = onSnapshot(
                query(
                    collection(db, 'users'), 
                    where('id', 'not-in', [...passedUserIds, ...swipedUserIds])
                ), 
                (snapShot) =>  {
                    setProfiles(
                        snapShot.docs
                        .filter(doc => doc.id !== user.uid )
                        .map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }))
                    )
                }
            )
        }

        fetchCards();
        return unsub;
    }, [db])



    const swipeLeft = async(cardIndex) => {
        if(!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        setDoc(doc(db, 'users', user.uid, 'passes', userSwiped.id), userSwiped)
    }

    const swipeRight = async(cardIndex) => {
        if(!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        const loggedInProfile = await(
            await getDoc(doc(db, 'users', user.uid))
        ).data();

        console.log("dagi bien")
        
        //check if the swiped-user swiped already on the current user
        getDoc(doc(db, 'users', userSwiped.id, 'swipes', user.uid)).then(
            (documentSnapshot) => {
                if(documentSnapshot.exists()){
                    // swiped-user has matched with the current user
                    // Record the swap
                    setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), userSwiped)

                    console.log(`Your are a match with ${userSwiped.displayName}`)

                    // Create the match
                    setDoc(doc(db, 'matches', generateId(user.uid, userSwiped.id)), {
                        users: {
                            [user.uid]: loggedInProfile,
                            [userSwiped.id]: userSwiped
                        },
                        usersMatched: [user.uid, userSwiped.id],
                        timestamp: serverTimestamp()
                    })

                    navigation.navigate("Match", {
                        loggedInProfile, userSwiped
                    })


                }else{
                    // current user is the first to swipe between the two 
                    console.log(`Your are the first to swipe ${userSwiped.displayName}`)
                }
            }
        )

        setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), userSwiped)
    }


    return (
        <SafeAreaView style={[tw("flex-1"), {paddingTop: Platform.OS === 'android' ? 25 : 0}]}>
            {/* Header */}
            <View style={tw("flex-row items-center justify-between px-5")}>
                <TouchableOpacity onPress={logout}>
                    <Image 
                        source={{uri: user.photoURL }} 
                        style={tw("h-10 w-10 rounded-full")} 
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Modal")}
                >
                    <Image 
                        style={tw("h-20 w-20")} 
                        source={require("../assets/tinder-logo.png")} 
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                    <Ionicons name='chatbubbles-sharp' size={30} color="#FF5864" />
                </TouchableOpacity>
            </View>

            {/* End of Header */}
            
            {/* Cards */}
            
            <View style={tw("flex-1 -mt-6")}>
                <Swiper
                    ref={swipeRef}
                    containerStyle={{backgroundColor: "transparent"}}
                    cards={profiles}
                    stackSize={5}
                    cardIndex={0}
                    animateCardOpacity
                    verticalSwipe={false}
                    onSwipedLeft={ (cardIndex) => {
                        swipeLeft(cardIndex)
                    }}
                    onSwipedRight={ (cardIndex) => {
                        swipeRight(cardIndex);
                    }}
                    overlayLabels={{
                        left: {
                            title: "NOPE",
                            style: {
                                label: {
                                    textAlign: "right",
                                    color: "red"
                                }
                            }
                        },
                        right: {
                            title: "MATCH",
                            style: {
                                label: {
                                    color: "#4DED30",
                                }
                            }
                        }
                    }}
                    renderCard={(card) => card ? (
                            <View 
                                key={card.id} 
                                style={tw("bg-white h-3/4 rounded-xl relative")}
                            >
                                <Image 
                                    style={tw("absolute top-0 h-full w-full rounded-xl")} 
                                    source={{uri: card.photoURL}}
                                />
                                <View style={[tw(
                                    "absolute bottom-0 bg-white w-full h-20 flex-row justify-between items-center px-6 py-2 rounded-b-xl"
                                ), styles.cardShadow]}>
                                    <View>
                                        <Text style={tw("text-xl font-bold")}>
                                            {card.displayName}
                                        </Text>
                                        <Text>
                                            {card.job}
                                        </Text>
                                    </View>
                                    <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
                                </View>

                            </View>
                        ) 
                        
                        :
                        (
                            <View
                                style={[
                                    tw("relative bg-white h-3/4 rounded-xl justify-center items-center"),
                                    styles.cardShadow,
                                ]}
                            >
                                <Text style={tw("font-bold pb-5")}>
                                    No more profiles
                                </Text>
                                <Image 
                                    style={tw("h-20 w-20")}
                                    height={100}
                                    width={100}
                                    source={{ uri: "https://links.papareact.com/6gb" }}
                                />

                            </View>
                        )
                    }
                />

            </View>    

            <View style={tw("flex-row justify-evenly bottom-4")}>
                <TouchableOpacity 
                    onPress={() => swipeRef.current.swipeLeft()}
                    style={tw(
                        'items-center justify-center rounded-full w-16 h-16 bg-red-200'
                    )}
                >
                    <Entypo name='cross' size={24} />
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => swipeRef.current.swipeRight()}
                    style={tw(
                        'items-center justify-center rounded-full w-16 h-16 bg-green-200'
                    )}
                >
                    <AntDesign name="heart" size={24}/>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
});