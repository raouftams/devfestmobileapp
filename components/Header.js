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
        tw("p-4 flex-row items-center justify-between"),
        { paddingTop: Platform.OS === "android" ? 25 : 0 },
      ]}
    >
      <View style={tw("flex-row items-center")}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
        <Text style={[tw("text-2xl font-bold"), { paddingLeft: 5 }]}>
          {title}
        </Text>
      </View>

      {callEnabled && (
        <TouchableOpacity
          style={[
            tw("rounded-full bg-red-200"),
            {
              padding: 10,
              paddingHorizontal: 13,
              marginTop: 10,
              marginRight: 5,
            },
          ]}
        >
          <Foundation style={tw("")} name="telephone" size={24} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
