import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TrendingUp, Heart } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

const NotificationHeroBanner = () => {
    return (
        <View style={styles.container}>
            {/* Watermark/Background Icon */}
            <View style={styles.watermarkContainer}>
                <Heart size={160} color="rgba(255, 255, 255, 0.15)" fill="rgba(255, 255, 255, 0.15)" strokeWidth={0} />
            </View>

            <Text style={styles.title}>Terima Kasih, #OrangBaik</Text>
            
            <Text style={styles.description}>
                Minggu ini, kontribusi Anda telah membantu menyalurkan 1.250 paket makanan kepada warga terdampak erupsi.
            </Text>

            <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Lihat Dampak Sosial</Text>
                <TrendingUp color={Colors.surface} size={16} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        borderRadius: 24,
        padding: Spacing.xl,
        marginHorizontal: Spacing.lg,
        marginTop: Spacing.lg,
        marginBottom: Spacing.xxl,
        position: 'relative',
        overflow: 'hidden',
    },
    watermarkContainer: {
        position: 'absolute',
        right: -30,
        bottom: -40,
        zIndex: 0,
    },
    title: {
        ...Typography.h2,
        color: Colors.surface,
        marginBottom: Spacing.sm,
        zIndex: 1,
    },
    description: {
        ...Typography.caption,
        color: Colors.surface,
        opacity: 0.9,
        lineHeight: 20,
        marginBottom: Spacing.xl,
        zIndex: 1,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: Spacing.lg,
        paddingVertical: 10,
        borderRadius: 20,
        alignSelf: 'flex-start',
        zIndex: 1,
    },
    buttonText: {
        ...Typography.bodyMd,
        color: Colors.surface,
        fontWeight: '600',
        marginRight: Spacing.sm,
    },
});

export default NotificationHeroBanner;
