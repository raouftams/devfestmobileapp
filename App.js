import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackNavigator from './StackNavigator';

//importing tailwind css
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { AuthProvider } from './hooks/useAuth';

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </NavigationContainer>
    </TailwindProvider>
  );
}

