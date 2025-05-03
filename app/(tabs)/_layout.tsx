import { Tabs } from 'expo-router'
import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                // tabBarShowLabel: false,
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "grey",
                tabBarStyle: {
                    backgroundColor: "white",
                    borderTopWidth: 1,
                    position: 'absolute',
                    elevation: 0,
                    height: 48,
                    paddingBottom: 8,
                    paddingHorizontal: 16,
                    borderTopColor: '#E5E7EB'
                }
            }}>

            <Tabs.Screen
                name='home'
                options={{
                    title: 'Home',
                    tabBarIcon: ({size, color})=> <Ionicons name='home' size={size} color={color}/>
                }}
            />
            <Tabs.Screen
                name='forum'
                options={{
                    title: 'Q&A Forum',
                    tabBarIcon: ({size, color})=> <MaterialIcons name='question-answer' size={size} color={color}/>
                }}
            />
            <Tabs.Screen
                name='store'
                options={{
                    title: 'Store',
                    tabBarIcon: ({size, color})=> <MaterialIcons name='store' size={size} color={color}/>
                }}
            />
            <Tabs.Screen
                name='more'
                options={{
                    title: 'More',
                    tabBarIcon: ({size, color})=> <MaterialCommunityIcons name='dots-grid' size={size} color={color}/>
                }}
            />



        </Tabs>
    )
}