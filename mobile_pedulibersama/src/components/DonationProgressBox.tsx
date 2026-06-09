import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapPin, Calendar, Users, Clock } from 'lucide-react-native';
import { Colors, Spacing, Typography, Shadows, BorderRadius } from '../theme';
import ProgressBar from './ProgressBar';
import { formatRupiah } from '../utils/format';
import { getDaysLeft } from '../utils/date';
import { Disaster } from '../types';

interface DonationProgressBoxProps {
    disaster: Disaster;
}

const DonationProgressBox: React.FC<DonationProgressBoxProps> = ({ disaster }) => {
    return (
        <View style={styles.card}>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{disaster.isEmergency ? 'BENCANA DARURAT' : 'BENCANA'}</Text>
            </View>
            <Text style={styles.title}>{disaster.title}</Text>
            
            <View style={styles.row}>
                <View style={styles.iconText}>
                    <MapPin size={14} color={Colors.primary} />
                    <Text style={styles.iconLabel}>{disaster.location}</Text>
                </View>
                <View style={[styles.iconText, { marginLeft: Spacing.md }]}>
                    <Calendar size={14} color={Colors.primary} />
                    <Text style={styles.iconLabel}>{disaster.endDate || 'N/A'}</Text>
                </View>
            </View>

            <View style={styles.progressBox}>
                <View style={styles.progressHeader}>
                    <View>
                        <Text style={styles.progressLabel}>Terkumpul</Text>
                        <Text style={styles.collectedAmount}>{formatRupiah(disaster.collectedAmount || 0)}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.progressLabel}>Target</Text>
                        <Text style={styles.targetAmount}>{formatRupiah(disaster.targetAmount || 0)}</Text>
                    </View>
                </View>
                <ProgressBar progress={disaster.progress || 0} />
                <View style={styles.progressFooter}>
                    <View style={styles.iconText}>
                        <Users size={14} color={Colors.primary} />
                        <Text style={styles.footerText}>{disaster.donatorsCount || 0} Donatur</Text>
                    </View>
                    <View style={styles.iconText}>
                        <Clock size={14} color={Colors.primary} />
                        <Text style={styles.footerText}>{getDaysLeft(disaster.endDate)} Hari Lagi</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: { backgroundColor: '#FFFFFF', borderRadius: BorderRadius.xl, padding: Spacing.lg, marginTop: -60, marginHorizontal: Spacing.md, ...Shadows.float },
    badge: { alignSelf: 'flex-start', backgroundColor: '#D1FAE5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: Spacing.sm },
    badgeText: { ...Typography.caption, color: '#059669', fontWeight: '700', fontSize: 10 },
    title: { ...Typography.h2, color: Colors.textPrimary, marginBottom: Spacing.sm },
    row: { flexDirection: 'row', marginBottom: Spacing.md },
    iconText: { flexDirection: 'row', alignItems: 'center' },
    iconLabel: { ...Typography.caption, color: Colors.textMuted, marginLeft: 4 },
    progressBox: { backgroundColor: '#F8FAFC', borderRadius: 16, padding: Spacing.md },
    progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
    progressLabel: { ...Typography.caption, color: Colors.textMuted, fontSize: 10 },
    collectedAmount: { ...Typography.body, color: Colors.primary, fontWeight: '700' },
    targetAmount: { ...Typography.caption, color: Colors.textPrimary, fontWeight: '600' },
    progressFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.sm },
    footerText: { ...Typography.caption, color: Colors.textPrimary, marginLeft: 4, fontSize: 10 },
});
export default DonationProgressBox;
