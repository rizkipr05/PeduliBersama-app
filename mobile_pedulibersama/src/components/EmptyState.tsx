import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FileQuestion } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
    title, 
    description, 
    icon = <FileQuestion color={Colors.textMuted} size={48} /> 
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                {icon}
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xxl,
        marginTop: Spacing.xl,
    },
    iconContainer: {
        marginBottom: Spacing.lg,
        opacity: 0.8,
    },
    title: {
        ...Typography.h3,
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
        textAlign: 'center',
    },
    description: {
        ...Typography.bodyMd,
        color: Colors.textMuted,
        textAlign: 'center',
        lineHeight: 22,
    },
});

export default EmptyState;
