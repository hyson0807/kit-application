import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {useClerk} from "@clerk/clerk-expo";
import {router} from "expo-router";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";

const More = () => {
    const user = useQuery(api.users.getUserInfo); //유저정보 (clerk_id, username)
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

    if (!user) {
        return (
            <View className="flex-1 items-center justify-center"><Text>Loading</Text></View>
        )
    }

    return (

        <View className="flex-1 justify-center items-center">
            <View>
                <Text>user : {user.username}</Text>
            </View>
            <TouchableOpacity onPress={handleSignOut}>
                <Text>Sign out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default More
