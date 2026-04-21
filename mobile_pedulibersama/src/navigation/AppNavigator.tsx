import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
    Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    const [showSplash, setShowSplash] = useState(true);

    if (showSplash) {
        return <SplashScreen onFinish={() => setShowSplash(false)} />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ animation: 'slide_from_right' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;