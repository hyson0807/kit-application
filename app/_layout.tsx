import './global.css';
import { Slot } from 'expo-router'
import {ClerkProvider, useAuth} from '@clerk/clerk-expo'
import {tokenCache} from "@clerk/clerk-expo/token-cache";
import {SafeAreaView} from "react-native";
import {ConvexReactClient} from "convex/react";
import {ConvexProviderWithClerk} from "convex/react-clerk";

const PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key')
}

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL! as string);

export default function RootLayout() {
    return (
        <ClerkProvider tokenCache={tokenCache} publishableKey={PUBLISHABLE_KEY}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <SafeAreaView className="flex-1 bg-gray-400">
                    <Slot/>
                </SafeAreaView>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}

