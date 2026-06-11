import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Spacing } from '../theme';

const HeroImageBanner = () => {
    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/OIP.jpg')} 
                style={styles.image} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginHorizontal: Spacing.md, marginBottom: Spacing.xl },
    image: { width: '100%', height: 180, borderRadius: 16, backgroundColor: '#E5E7EB' },
});
export default HeroImageBanner;
