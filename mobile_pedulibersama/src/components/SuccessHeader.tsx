import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

const SuccessHeader = () => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Check color={Colors.surface} size={48} strokeWidth={3} />
            </View>
            <Text style={styles.title}>Donasi Berhasil!</Text>
            <Text style={styles.subtitle}>
                Terima kasih telah berdonasi untuk membantu saudara kita yang tertimpa musibah.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
        marginTop: Spacing.xxl,
        marginBottom: Spacing.xl,
    },
    iconContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.lg,
        elevation: 8,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    title: {
        ...Typography.h2,
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
        textAlign: 'center',
    },
    subtitle: {
        ...Typography.body,
        color: Colors.textMuted,
        textAlign: 'center',
        lineHeight: 22,
    },
});

export default SuccessHeader;
