import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import MainNavigator from './MainNavigator';
import DetailBencanaScreen from '../screens/DetailBencanaScreen';
import FormDonasiScreen from '../screens/FormDonasiScreen';
import KonfirmasiDonasiScreen from '../screens/KonfirmasiDonasiScreen';

export type RootStackParamList = {
    Splash: undefined;
    Onboarding: undefined;
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
    Main: undefined;
    DetailBencana: { id: string };
    FormDonasi: undefined;
    KonfirmasiDonasi: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * AppNavigator:
 * Merupakan akar dari seluruh rute navigasi aplikasi (Root Stack).
 * Menangani siklus transisi dari SplashScreen -> Auth (Login/Register) -> MainApp.
 */
const AppNavigator: React.FC = () => {
    const [showSplash, setShowSplash] = useState(true);

    if (showSplash) {
        return <SplashScreen onFinish={() => setShowSplash(false)} />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Main"
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ animation: 'slide_from_right' }}
                />
                <Stack.Screen name="Main" component={MainNavigator} />
                <Stack.Screen name="DetailBencana" component={DetailBencanaScreen} />
                <Stack.Screen name="FormDonasi" component={FormDonasiScreen} />
                <Stack.Screen name="KonfirmasiDonasi" component={KonfirmasiDonasiScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;