import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';
import ProgressBar from './ProgressBar';
import { formatRupiah } from '../utils/format';
import { Disaster } from '../types';

interface DisasterListItemProps extends Disaster {
    onPress?: () => void;
}

const DisasterListItem: React.FC<DisasterListItemProps> = ({
    title,
    location,
    imageUrl,
    progress,
    collectedAmount,
    onPress,
}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
            <Image source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} style={styles.image} />

            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>

                <View style={styles.locationRow}>
                    <MapPin size={12} color={Colors.textMuted} />
                    <Text style={styles.locationText} numberOfLines={1}>
                        {location}
                    </Text>
                </View>

                <View style={styles.progressContainer}>
                    <ProgressBar progress={progress || 0} />
                </View>

                <View style={styles.footerRow}>
                    <Text style={styles.footerLabel}>Terkumpul</Text>
                    <Text style={styles.amount}>{formatRupiah(collectedAmount || 0)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: Spacing.sm,
        marginBottom: Spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: '#E5E7EB',
    },
    content: {
        flex: 1,
        marginLeft: Spacing.md,
        justifyContent: 'center',
    },
    title: {
        ...Typography.body,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    locationText: {
        ...Typography.caption,
        color: Colors.textMuted,
        marginLeft: 4,
        flex: 1,
    },
    progressContainer: {
        marginBottom: 8,
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footerLabel: {
        ...Typography.caption,
        color: Colors.textMuted,
        fontSize: 10,
    },
    amount: {
        ...Typography.caption,
        fontWeight: '700',
        color: Colors.primary,
    },
});

export default DisasterListItem;
