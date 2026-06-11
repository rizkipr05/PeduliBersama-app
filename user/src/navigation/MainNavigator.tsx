import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Clock, Bell, User } from 'lucide-react-native';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Colors } from '../theme';

/**
 * MainNavigator:
 * Mengatur sistem navigasi bawah (Bottom Tabs) yang menjadi
 * menu utama aplikasi (Beranda, Riwayat, Notifikasi, Profil).
 */
const Tab = createBottomTabNavigator();

const MainNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Beranda') {
                        return <Home color={color} size={size} />;
                    } else if (route.name === 'Riwayat') {
                        return <Clock color={color} size={size} />;
                    } else if (route.name === 'Notifikasi') {
                        return <Bell color={color} size={size} />;
                    } else if (route.name === 'Profil') {
                        return <User color={color} size={size} />;
                    }
                },
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textMuted,
                tabBarStyle: {
                    backgroundColor: Colors.surface,
                    borderTopColor: Colors.border,
                    borderTopWidth: 1,
                    elevation: 0,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
            })}>
            <Tab.Screen name="Beranda" component={HomeScreen} />
            <Tab.Screen name="Riwayat" component={HistoryScreen} />
            <Tab.Screen name="Notifikasi" component={NotificationScreen} />
            <Tab.Screen name="Profil" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default MainNavigator;
