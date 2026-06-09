import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { HeartHandshake, Megaphone, History, Shield, BadgeCheck } from 'lucide-react-native';
import { Colors, Spacing, Typography, Shadows, BorderRadius } from '../theme';

export type NotificationType = 'donation' | 'campaign' | 'report' | 'security' | 'verification';

export interface NotificationItemProps {
    id: string;
    type: NotificationType;
    title: string;
    description: string;
    time: string;
    isRead: boolean;
    onPress?: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
    type,
    title,
    description,
    time,
    isRead,
    onPress
}) => {
    const getIcon = () => {
        const size = 20;
        const color = isRead ? '#8A92A6' : Colors.primary;
        
        switch (type) {
            case 'donation': return <HeartHandshake size={size} color={color} />;
            case 'campaign': return <Megaphone size={size} color={color} />;
            case 'report': return <History size={size} color={color} />;
            case 'security': return <Shield size={size} color={color} />;
            case 'verification': return <BadgeCheck size={size} color={color} />;
            default: return <Megaphone size={size} color={color} />;
        }
    };

    return (
        <TouchableOpacity 
            style={[styles.card, !isRead && styles.cardUnread]} 
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={[styles.iconBox, !isRead && styles.iconBoxUnread]}>
                {getIcon()}
            </View>

            <View style={styles.content}>
                <View style={styles.titleRow}>
                    <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    <Text style={styles.time}>{time}</Text>
                </View>
                <Text style={styles.description} numberOfLines={3}>{description}</Text>
            </View>

            {!isRead && <View style={styles.unreadDot} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: Colors.cardBackground,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginHorizontal: Spacing.lg,
        marginBottom: Spacing.md,
        ...Shadows.card,
    },
    cardUnread: {
        backgroundColor: '#F3FAF5', // Light green bg for unread
        elevation: 0,
        shadowOpacity: 0,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#F0F2F5', // Grey icon bg for read
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    iconBoxUnread: {
        backgroundColor: '#D1EEDB', // Darker green icon bg for unread
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        ...Typography.bodyMd,
        color: Colors.textPrimary,
        fontWeight: '700',
        flex: 1,
    },
    time: {
        ...Typography.caption,
        color: '#8A92A6',
        fontSize: 10,
        marginLeft: Spacing.sm,
    },
    description: {
        ...Typography.caption,
        color: Colors.textMuted,
        lineHeight: 18,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.primary,
        position: 'absolute',
        right: Spacing.md,
        top: '50%',
        marginTop: -4,
    },
});

export default NotificationItem;
