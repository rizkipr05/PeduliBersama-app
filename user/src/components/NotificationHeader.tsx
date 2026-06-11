import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

interface NotificationHeaderProps {
    onBack: () => void;
    onMarkAllRead: () => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({ onBack, onMarkAllRead }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconButton} onPress={onBack} activeOpacity={0.7}>
                <ArrowLeft color="#8A92A6" size={24} />
            </TouchableOpacity>
            
            <Text style={styles.title}>Notifikasi</Text>
            
            <TouchableOpacity onPress={onMarkAllRead} activeOpacity={0.7}>
                <Text style={styles.actionText}>Tandai semua dibaca</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        backgroundColor: Colors.surface,
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    title: {
        ...Typography.h3,
        color: Colors.textPrimary,
        fontWeight: '700',
    },
    actionText: {
        ...Typography.bodyMd,
        color: Colors.primary,
        fontWeight: '600',
    },
});

export default NotificationHeader;
