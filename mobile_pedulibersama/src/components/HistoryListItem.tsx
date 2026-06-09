import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Typography, Shadows, BorderRadius } from '../theme';

export type TransactionStatus = 'Berhasil' | 'Diproses' | 'Gagal';

export interface HistoryListItemProps {
    id: string;
    title: string;
    date: string;
    time: string;
    amount: number;
    status: TransactionStatus;
    imageUrl: any; // Using any for require() or string uri
}

const HistoryListItem: React.FC<HistoryListItemProps> = ({
    id,
    title,
    date,
    time,
    amount,
    status,
    imageUrl,
}) => {
    const navigation = useNavigation();
    
    // Status color mapping
    const getStatusStyle = () => {
        switch(status) {
            case 'Berhasil': return { bg: '#A3E4B8', text: Colors.primary }; // Green
            case 'Diproses': return { bg: '#FFF3CD', text: '#856404' }; // Yellow
            case 'Gagal': return { bg: '#F8D7DA', text: '#D13C4B' }; // Red
            default: return { bg: '#E2E3E5', text: '#383D41' };
        }
    };

    const statusStyle = getStatusStyle();
    // Warna nominal disamakan dengan warna teks status
    const amountColor = status === 'Berhasil' ? Colors.primary : statusStyle.text;

    return (
        <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.7}
            onPress={() => (navigation as any).navigate('TrackingDonasi', { id })}
        >
            <Image 
                source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} 
                style={styles.image} 
            />
            
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.dateTime}>{date} • {time}</Text>
                <Text style={[styles.amount, { color: amountColor }]}>
                    Rp {amount.toLocaleString('id-ID')}
                </Text>
            </View>

            <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
                <Text style={[styles.badgeText, { color: statusStyle.text }]}>
                    {status}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginHorizontal: Spacing.lg,
        marginBottom: Spacing.md,
        alignItems: 'center',
        ...Shadows.card,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 12,
        marginRight: Spacing.md,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        ...Typography.bodyMd,
        color: Colors.textPrimary,
        fontWeight: '600',
        marginBottom: 2,
    },
    dateTime: {
        ...Typography.caption,
        color: Colors.textMuted,
        marginBottom: 4,
    },
    amount: {
        ...Typography.bodyMd,
        fontWeight: '700',
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    badgeText: {
        ...Typography.caption,
        fontWeight: '700',
        fontSize: 10,
    },
});

export default HistoryListItem;
