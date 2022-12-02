import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { useTailwind } from 'tailwind-rn/dist'
import Navbar from '../components/Navbar'

const HelpScreen = () => {
  const tw = useTailwind()
  return (
    <SafeAreaView
        style={[tw(""), { paddingTop: Platform.OS === "android" ? 15 : 0 }]}
      >
        <Header
          title="Help"
        />

        <View style={[tw('mt-10 ')]}>
          <View style={[tw("mx-8 mt-4 w-5/6 h-32 rounded-xl px-5 py-2"), {backgroundColor:"#D9EDFF"}]}>
              <Text style={tw("text-2xl font-bold text-gray-700")}>Are you in an Emergency ?</Text>
              <Text style={tw("font-semibold text-gray-500")}>Press the button below to call for help</Text>
              <TouchableOpacity style={tw("border w-20 py-1 mt-4 rounded-lg bg-gray-900")}>
                <Text style={tw("text-center text-white")}>
                  SOS
                </Text>
              </TouchableOpacity>
          </View>
          <View style={tw("flex-row justify-around mx-8 mt-5")}>
            <View style={[tw("mx-8 mt-5 w-40 h-40 rounded-xl px-5 py-2 text-center"), {backgroundColor:"#AEB9CB"}]}>
                <Text style={tw("text-xl font-bold text-center text-gray-700")}>Need to contact security ?</Text>
                <TouchableOpacity style={tw("border border-white w-32 py-2 px-1 mt-4 rounded-lg bg-white")}>
                  <Text style={tw("text-center text-gray-800")}>
                    Call the police
                  </Text>
                </TouchableOpacity>
            </View>
            <View style={[tw("mx-8 mt-5 w-40 h-40 rounded-xl px-5 py-2 text-center"), {backgroundColor:"#D9EDFF"}]}>
              <Text style={tw("text-xl font-bold text-center text-gray-700")}>Book an ambulance</Text>
              <TouchableOpacity style={tw("border border-white w-32 py-2 px-1 mt-11 rounded-lg bg-gray-900")}>
                <Text style={tw("text-center text-white")}>
                  Call
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[tw("mx-8 mt-4 w-5/6 h-32 rounded-xl px-5 py-2 mt-10"), {backgroundColor:"#AEB9CB"}]}>
              <Text style={tw("text-2xl font-bold text-gray-700")}>Car problem ? Call for help</Text>
              <Text style={tw("font-semibold text-gray-500")}>Press the button below to call insurance company</Text>
              <TouchableOpacity style={tw("border border-white w-20 py-1 mt-4 rounded-lg bg-white")}>
                <Text style={tw("text-center text-gray-800")}>
                  Call
                </Text>
              </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  )
}

export default HelpScreen