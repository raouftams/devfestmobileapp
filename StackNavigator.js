import React from "react";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ChatbotScreen from "./screens/ChatbotScreen";
import HelpScreen from "./screens/HelpScreen";
import DetailsScreen from "./screens/DetailsScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatbotScreen} />
            <Stack.Screen name="Help" component={HelpScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} initialParams={{ name: "", description: "", img: ""}} />
        </Stack.Navigator>
    
  );
};

export default StackNavigator;
