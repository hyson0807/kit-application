import {View, Text, TouchableOpacity} from 'react-native'
import React, {useEffect} from 'react'
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

    // 🟨 유저가 없고 에러로 판단되는 경우 회원가입 페이지로 이동
    useEffect(() => {
        if (user === undefined) return; // 아직 로딩 중
        if (user === null) {
            // 에러로 인해 null 반환된 경우 → 회원가입 화면으로 이동
            router.replace('/sign-in');
        }
    }, [user]);

    if (user === undefined) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Loading...</Text>
            </View>
        );
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
