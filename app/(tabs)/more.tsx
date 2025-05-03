import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {useClerk} from "@clerk/clerk-expo";
import {router} from "expo-router";

const More = () => {
    const { signOut } = useClerk()
    const handleSignOut = async () => {
        try {
            await signOut()
            // Redirect to your desired page
            router.replace('/sign-in');
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }

    return (

        <View className="flex-1 justify-center items-center">

            <TouchableOpacity onPress={handleSignOut}>
                <Text>Sign out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default More
