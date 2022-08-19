import React, { createContext, useContext } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'


const AuthContext = createContext({})

WebBrowser.maybeCompleteAuthSession()

const config = {
    androidClientId: '1086391481912-clsm2uuliqve41ndi0r6b76b4vhgrihv.apps.googleusercontent.com',
    expoClientId: '1086391481912-c1ed9jqoiaiho52t2t78qmnch94o6na1.apps.googleusercontent.com',
    iosClientId: '1086391481912-eqf9fqm9cj2mo20qrbjo1t8nksqlgiap.apps.googleusercontent.com',
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "birthday", "location"]
}

export const AuthProvider = ({ children }) => {


    const [request, response, promptAsync] = Google.useAuthRequest(config);

    const signInWithGoogle = async () => {
        promptAsync({ useProxy: true })

        if (response?.type === 'success') {
            console.log('success')
        }
    }

    return (
        <AuthContext.Provider value={{
            user: null,
            signInWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}
