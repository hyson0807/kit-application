import { Redirect } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function Index() {
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) return null;

    return isSignedIn
        ? <Redirect href="/(tabs)/home" /> //로그인상태면 홈으로
        : <Redirect href="/(auth)/sign-in" />; //로그인상태가 아니면 로그인페지로
}
