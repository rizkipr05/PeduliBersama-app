import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Spacing } from '../theme';

const HeroImageBanner = () => {
    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=600' }} 
                style={styles.image} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginHorizontal: Spacing.md, marginBottom: Spacing.xl },
    image: { width: '100%', height: 180, backgroundColor: '#E5E7EB' },
});
export default HeroImageBanner;
