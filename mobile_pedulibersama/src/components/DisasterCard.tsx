import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { Colors, Spacing, Typography, Shadows, BorderRadius } from '../theme';
import ProgressBar from './ProgressBar';
import { formatRupiah } from '../utils/format';
import { Disaster } from '../types';

interface DisasterCardProps {
    title: string;
    location: string;
    imageUrl: any;
    progress: number;
    collectedAmount: number;
    isEmergency?: boolean;
    onPress?: () => void;
    onDonate?: () => void;
}

const DisasterCard: React.FC<DisasterCardProps> = ({
    title,
    location,
    imageUrl,
    progress,
    collectedAmount,
    isEmergency = false,
    onPress,
    onDonate,
}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
            <View style={styles.imageContainer}>
                <Image source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} style={styles.image} />
                {isEmergency && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>DARURAT</Text>
                    </View>
                )}
            </View>

            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {title}
                </Text>

                <View style={styles.locationRow}>
                    <MapPin size={12} color={Colors.textMuted} />
                    <Text style={styles.locationText} numberOfLines={1}>
                        {location}
                    </Text>
                </View>

                <View style={styles.progressContainer}>
                    <ProgressBar progress={progress} />
                </View>

                <View style={styles.footerRow}>
                    <Text style={styles.amount}>{formatRupiah(collectedAmount)}</Text>
                    <TouchableOpacity style={styles.donateButton} onPress={onDonate}>
                        <Text style={styles.donateButtonText}>Donasi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 260,
        backgroundColor: '#FFFFFF',
        borderRadius: BorderRadius.lg,
        marginRight: Spacing.md,
        marginBottom: Spacing.sm,
        ...Shadows.card,
        overflow: 'hidden',
    },
    imageContainer: {
        height: 120,
        width: '100%',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E5E7EB',
    },
    badge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: Colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    badgeText: {
        ...Typography.caption,
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 10,
    },
    content: {
        padding: Spacing.md,
    },
    title: {
        ...Typography.body,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
        height: 40, // fix height for 2 lines
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    locationText: {
        ...Typography.caption,
        color: Colors.textMuted,
        marginLeft: 4,
        flex: 1,
    },
    progressContainer: {
        marginBottom: Spacing.md,
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    amount: {
        ...Typography.caption,
        fontWeight: '700',
        color: Colors.primary,
    },
    donateButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 8,
    },
    donateButtonText: {
        ...Typography.caption,
        color: '#FFFFFF',
        fontWeight: '600',
    },
});

export default DisasterCard;
