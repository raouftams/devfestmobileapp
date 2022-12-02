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
  import { Audio } from 'expo-av';
  

  const messages = [
    {
        id: 1,
        sender: "bot",
        text: "Hello, I am Fennec your touristic assistant Here are instructions you can make: Find Hospital nearby, Call the police",
    }
]


  const MessageScreen = () => {
    const tw = useTailwind();

    const [recording, setRecording] = useState();
    const [input, setInput] = useState()
    const [data, setData] = useState(messages)
    const [vocalURI, SetVocalURI] = useState(null)

    async function startRecording() {
      try {
        console.log('Requesting permissions..');
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
  
        console.log('Starting recording..');
        const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
        console.log('Recording started');
      } catch (err) {
        console.error('Failed to start recording', err);
      }
    }
  
    async function stopRecording() {
      console.log('Stopping recording..');
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      const uri = recording.getURI();
      SetVocalURI(recording.getURI())
      console.log('Recording stopped and stored at', uri);
      const response = await uploadAudioAsync(uri);
      fetchedData = JSON.parse(response.data);
      if(fetchedData.text === ""){
        let botResponse = {
            id: data.length + 1,
            sender: "bot",
            text: "Sorry i didn't understand"
        }
        setData([...data, botResponse])
      }else{
        let botResponse = {
            id: data.length + 1,
            sender: "bot",
            text: fetchedData.text
        }
        setData([...data, botResponse])
      }
      
    }

    async function uploadAudioAsync(uri) {
        console.log("Uploading " + uri);
        let apiUrl = 'http://YOUR_SERVER_HERE/upload';
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
      
        let formData = new FormData();
        formData.append('file', {
          uri,
          name: `recording.${fileType}`,
          type: `audio/x-${fileType}`,
        });
      
        let options = {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        };
      
        console.log("POSTing " + uri + " to " + apiUrl);
        return fetch(apiUrl, options);
      }


    const sendMessage = () => {
        console.log(input)
        let tempData = data
        tempData.push({
            id: data.length + 1,
            sender: "user",
            text: input
        })
        setInput("")
        console.log(tempData)
        setData(tempData)
    }
  

     
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
              data={data}
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
                  onPress={recording ? stopRecording : startRecording}
                >
                    { recording ?
                        <Ionicons name='mic-off-outline' size={30} color={"#FF3131"}/>
                    :
                        <Ionicons name='mic-outline' size={30} color={"#4F95FF"}/>
                    }
                    
            </TouchableOpacity> 
            <TextInput
              style={tw("h-10 w-4/5 font-semibold")}
              placeholder="Send Message..."
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
              value={input}
            />
            <TouchableOpacity 
                  style={tw("flex justify-center items-center")}
                  onPress={() => sendMessage()}
                >
                    <Ionicons name='send-outline' size={30} color={"#4F95FF"}/>
            </TouchableOpacity>  
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default MessageScreen;