import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import {
    GoogleAuthProvider, 
    onAuthStateChanged,
    signInWithCredential,
    signOut
} from "@firebase/auth";

import { auth } from '../firebase'


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

    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false)

    useEffect(() => 
        onAuthStateChanged(auth, (user) => {
            if(user){
                //User logged in
                setUser(user)
            }else{
                //Not logged in
                setUser(null)
            }

            setLoadingInitial(false)
        }), 
        []
    );


    const [request, response, promptAsync] = Google.useAuthRequest(config);
    const signInWithGoogle = async () => {
        setLoading(true)
        await promptAsync({ useProxy: true }).then(async (response) => {
            if (response?.type === 'success') {
                const { idToken, accessToken } = response.authentication;
                const credential = GoogleAuthProvider.credential(idToken, accessToken);
                await signInWithCredential(auth, credential);
            }
            return Promise.reject()
        })
        .catch(error => setError(error))
        .finally(setLoading(false))
    }
        

    const logout = async () =>{
        setLoading(true)
        signOut(auth).catch(error => setError(error)).finally(setLoading(false));
    }


    const memoedValue = useMemo(() => ({
        user,
        loading,
        error,
        signInWithGoogle,
        logout
    }), [user, loading, error])

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
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
