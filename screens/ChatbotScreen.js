import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    Button,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList,
    TouchableOpacity,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons"
  import Header from "../components/Header";
  import { useTailwind } from "tailwind-rn/dist";
  import SenderMessage from "../components/SenderMessage";
  import ReceiverMessage from "../components/ReceiverMessage";
  
  const MessageScreen = () => {
    const tw = useTailwind();

    const messages = [
        {
            id: 1,
            sender: "bot",
            text: "Hello, I am Fennec your touristic assistant Here are instructions you can make: Find Hospital nearby, Call the police",
        }
    ]

     
    return (
      <SafeAreaView
        style={[tw("flex-1"), { paddingTop: Platform.OS === "android" ? 15 : 0 }]}
      >
        <Header
          title="Tourist Assistant"
        />
  
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={tw("flex-1")}
          keyboardVerticalOffset={10}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList
              data={messages}
              inverted={-1}
              style={tw("pl-0")}
              keyExtractor={(item) => item.id}
              renderItem={({ item: message }) =>
                message.sender !== "bot" ? (
                  <SenderMessage Key={message.id} message={message} />
                ) : (
                  <ReceiverMessage key={message.id} message={message} />
                )
              }
            />
          </TouchableWithoutFeedback>
          <View
            style={[
              tw(
                "flex-row justify-between items-center bg-white border-t border-gray-200 px-5 py-2"
              ),
            ]}
          >
            <TouchableOpacity 
                  style={tw("flex justify-center items-center")}
                  onPress={() => navigation.navigate("Help")}
                >
                    <Ionicons name='mic-outline' size={30} color={"#4F95FF"}/>
            </TouchableOpacity> 
            <TextInput
              style={tw("h-10 w-4/5 text-md font-semibold")}
              placeholder="Send Message..."
            />
            <TouchableOpacity 
                  style={tw("flex justify-center items-center")}
                  onPress={() => navigation.navigate("Help")}
                >
                    <Ionicons name='send-outline' size={30} color={"#4F95FF"}/>
            </TouchableOpacity>  
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default MessageScreen;