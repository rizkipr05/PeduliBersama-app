import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

interface DonationSummaryCardProps {
    imageUrl: string;
    title: string;
    location: string;
    isEmergency?: boolean;
}

const DonationSummaryCard: React.FC<DonationSummaryCardProps> = ({ imageUrl, title, location, isEmergency }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.badge}>{isEmergency ? 'DARURAT BENCANA' : 'BENCANA'}</Text>
                <Text style={styles.title} numberOfLines={2}>{title}</Text>
                <View style={styles.locationRow}>
                    <MapPin size={12} color={Colors.textMuted} />
                    <Text style={styles.locationText}>{location}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: { flexDirection: 'row', backgroundColor: '#FFFFFF', padding: Spacing.md, borderRadius: 16, borderWidth: 1, borderColor: '#F1F5F9', marginBottom: Spacing.xl },
    image: { width: 80, height: 80, borderRadius: 12, backgroundColor: '#E5E7EB' },
    info: { flex: 1, marginLeft: Spacing.md, justifyContent: 'center' },
    badge: { ...Typography.caption, color: Colors.primary, fontWeight: '700', fontSize: 9, marginBottom: 4 },
    title: { ...Typography.body, color: Colors.textPrimary, fontWeight: '700', marginBottom: 4, lineHeight: 20 },
    locationRow: { flexDirection: 'row', alignItems: 'center' },
    locationText: { ...Typography.caption, color: Colors.textMuted, marginLeft: 4, fontSize: 11 },
});
export default DonationSummaryCard;
