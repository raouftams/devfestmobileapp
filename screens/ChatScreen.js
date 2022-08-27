import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import ChatList from '../components/ChatList'

const ChatScreen = () => {
  return (
    <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? 15 : 0}}>
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  )
}

export default ChatScreen