import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";
import { Foundation, Ionicons } from "@expo/vector-icons";

const Header = ({ title, callEnabled }) => {
  const tw = useTailwind();
  const navigation = useNavigation();

  return (
    <View
      style={[
        [tw("p-4 flex-row items-center justify-between border-b border-gray-300")],
        { paddingTop: Platform.OS === "android" ? 25 : 0 },
      ]}
    >
      <View style={tw("flex-row items-center")}>
        <TouchableOpacity
            style={[tw("rounded-full bg-transparent"), {border: "1px solid #4F95FF"}]}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-outline" size={34} color="#4F95FF" />
        </TouchableOpacity>
        <Text style={tw("text-2xl font-bold pl-14")}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Header;