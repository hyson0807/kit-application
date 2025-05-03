import './global.css';
import { Slot } from 'expo-router'
import { ClerkProvider } from '@clerk/clerk-expo'
import {tokenCache} from "@clerk/clerk-expo/token-cache";
import {SafeAreaView} from "react-native";

export default function RootLayout() {
    return (
        <ClerkProvider tokenCache={tokenCache}>
            <SafeAreaView className="flex-1 bg-gray-400">
                <Slot/>
            </SafeAreaView>
        </ClerkProvider>
    );
}
