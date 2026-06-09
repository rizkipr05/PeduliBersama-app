import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Colors, Spacing, Typography } from '../theme';

interface LoadingSpinnerProps {
    message?: string;
    fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Memuat data...', fullScreen = false }) => {
    return (
        <View style={[styles.container, fullScreen && styles.fullScreen]}>
            <ActivityIndicator size="large" color={Colors.primary} />
            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: Spacing.xl,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreen: {
        flex: 1,
        backgroundColor: Colors.surface,
    },
    message: {
        ...Typography.caption,
        color: Colors.textMuted,
        marginTop: Spacing.md,
    },
});

export default LoadingSpinner;
