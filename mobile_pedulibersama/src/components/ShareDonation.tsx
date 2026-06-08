import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Share2, Copy, LayoutGrid } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

const ShareDonation = () => {
    return (
        <View style={styles.container}>
            <View style={styles.dividerContainer}>
                <View style={styles.line} />
            </View>

            <Text style={styles.title}>Ajak temanmu untuk ikut berbagi</Text>

            <View style={styles.iconRow}>
                <TouchableOpacity style={styles.iconButton}>
                    <Share2 color={Colors.textPrimary} size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Copy color={Colors.textPrimary} size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <LayoutGrid color={Colors.textPrimary} size={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: Spacing.xl,
        marginBottom: Spacing.xxl,
    },
    dividerContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.border,
        opacity: 0.5,
    },
    title: {
        ...Typography.caption,
        color: Colors.textPrimary,
        marginBottom: Spacing.lg,
    },
    iconRow: {
        flexDirection: 'row',
        gap: Spacing.lg,
    },
    iconButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E8EAF6', // Warna biru muda
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ShareDonation;
