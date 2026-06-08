import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { Colors, Spacing, Typography } from '../theme';

const { width } = Dimensions.get('window');

interface SplashScreenProps {
    onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
    const scaleAnim = useRef(new Animated.Value(0.7)).current;
    const fadeLogoAnim = useRef(new Animated.Value(0)).current;
    const fadeTextAnim = useRef(new Animated.Value(0)).current;
    const loadingAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Logo spring scale + fadeIn
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.timing(fadeLogoAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Teks fadeIn setelah logo
            Animated.timing(fadeTextAnim, {
                toValue: 1,
                duration: 400,
                delay: 200,
                useNativeDriver: true,
            }).start();

            // Loading bar
            Animated.timing(loadingAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: false,
            }).start(() => {
                //Setelah loading bar penuh, delay 300ms lalu onFinish
                setTimeout(() => {
                    onFinish();
                }, 300);
            });
        });
    }, []);

    const loadingWidth = loadingAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, width * 0.5],
    });

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Animated.View
                style={[
                    styles.logoWrapper,
                    {
                        opacity: fadeLogoAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}>
                <Image 
                    source={require('../assets/App Logo_ Green circle with heart+hands.png')} 
                    style={styles.logoImage} 
                    resizeMode="contain"
                />
            </Animated.View>

            {/* Nama + Tagline */}
            <Animated.View style={{ opacity: fadeTextAnim, alignItems: 'center' }}>
                <Text style={styles.appName}>PeduliBersama</Text>
                <Text style={styles.tagline}>
                    Bersama kita peduli, bersama kita bantu
                </Text>
            </Animated.View>

            {/* Loading Bar */}
            <View style={styles.loadingTrack}>
                <Animated.View
                    style={[styles.loadingFill, { width: loadingWidth }]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.cardBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoWrapper: {
        marginBottom: Spacing.lg,
    },
    logoImage: {
        width: 120,
        height: 120,
    },
    appName: {
        ...Typography.h1,
        color: Colors.primary,
        marginBottom: Spacing.sm,
    },
    tagline: {
        fontSize: 13,
        color: Colors.textMuted,
        textAlign: 'center',
        paddingHorizontal: Spacing.xl,
    },
    loadingTrack: {
        position: 'absolute',
        bottom: 60,
        width: width * 0.5,
        height: 3,
        backgroundColor: Colors.inputBackground,
        borderRadius: 999,
        overflow: 'hidden',
    },
    loadingFill: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 999,
    },
});

export default SplashScreen;