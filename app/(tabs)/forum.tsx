import {View, Text, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import {router} from "expo-router";

const Forum = () => {



    return (
        <View className="flex-1">
            <TouchableOpacity className="absolute bottom-20 right-8 bg-blue-500 px-4 py-4 rounded-full"
                              onPress={() => router.push('/chatbot')}
            >
                <Text className='text-white'>Chat Bot</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Forum
