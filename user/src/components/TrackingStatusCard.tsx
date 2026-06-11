import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../theme';

interface TrackingStatusCardProps {
    title: string;
    amount: number;
    date: string;
    transactionId: string;
    status: 'SUCCESS' | 'PENDING' | 'FAILED';
}

const TrackingStatusCard: React.FC<TrackingStatusCardProps> = ({
    title,
    amount,
    date,
    transactionId,
    status
}) => {
    return (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <Text style={styles.campaignLabel}>CAMPAIGN</Text>
                <View style={[styles.badge, status === 'SUCCESS' && styles.badgeSuccess]}>
                    <Text style={[styles.badgeText, status === 'SUCCESS' && styles.badgeTextSuccess]}>
                        {status}
                    </Text>
                </View>
            </View>

            <Text style={styles.title}>{title}</Text>

            <Text style={styles.amountLabel}>Jumlah Donasi</Text>
            <Text style={styles.amount}>Rp {amount.toLocaleString('id-ID')}</Text>

            <View style={styles.divider} />

            <View style={styles.footerRow}>
                <View style={styles.footerCol}>
                    <Text style={styles.footerLabel}>Tanggal Transaksi</Text>
                    <Text style={styles.footerValue}>{date}</Text>
                </View>
                <View style={styles.footerCol}>
                    <Text style={styles.footerLabel}>ID Transaksi</Text>
                    <Text style={styles.footerValue}>{transactionId}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 24,
        padding: Spacing.xl,
        marginHorizontal: Spacing.lg,
        marginTop: Spacing.md,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    campaignLabel: {
        ...Typography.caption,
        color: Colors.textMuted,
        fontWeight: '600',
        letterSpacing: 1,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: '#E2E3E5',
    },
    badgeSuccess: {
        backgroundColor: '#E6F4EA',
    },
    badgeText: {
        ...Typography.caption,
        fontWeight: '700',
        fontSize: 10,
        color: '#383D41',
    },
    badgeTextSuccess: {
        color: Colors.primary,
    },
    title: {
        ...Typography.h3,
        color: Colors.textPrimary,
        marginBottom: Spacing.lg,
        lineHeight: 24,
    },
    amountLabel: {
        ...Typography.caption,
        color: Colors.textMuted,
        marginBottom: 4,
    },
    amount: {
        ...Typography.h1,
        color: Colors.primary,
        marginBottom: Spacing.lg,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        opacity: 0.5,
        marginBottom: Spacing.lg,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerCol: {
        flex: 1,
    },
    footerLabel: {
        ...Typography.caption,
        color: Colors.textMuted,
        fontSize: 10,
        marginBottom: 4,
    },
    footerValue: {
        ...Typography.bodyMd,
        color: Colors.textPrimary,
        fontWeight: '600',
    },
});

export default TrackingStatusCard;
