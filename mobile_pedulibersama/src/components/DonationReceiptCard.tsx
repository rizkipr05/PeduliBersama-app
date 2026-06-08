import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BadgeCheck, HeartHandshake } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

interface DonationReceiptCardProps {
    transactionId: string;
    disasterTitle: string;
    paymentMethod: string;
    amount: number;
}

const DonationReceiptCard: React.FC<DonationReceiptCardProps> = ({
    transactionId,
    disasterTitle,
    paymentMethod,
    amount,
}) => {
    return (
        <View style={styles.card}>
            {/* Header Hijau */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Bukti Donasi</Text>
                <BadgeCheck color={Colors.surface} size={20} />
            </View>

            {/* Konten Kartu */}
            <View style={styles.content}>
                {/* Baris Transaksi & Status */}
                <View style={styles.row}>
                    <View>
                        <Text style={styles.label}>NO. TRANSAKSI</Text>
                        <Text style={styles.transactionId}>{transactionId}</Text>
                    </View>
                    <View style={styles.statusBox}>
                        <Text style={styles.statusLabel}>STATUS</Text>
                        <View style={styles.badgeSuccess}>
                            <Text style={styles.badgeSuccessText}>BERHASIL</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Detail Bencana */}
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Bencana</Text>
                    <Text style={styles.detailValue} numberOfLines={1}>{disasterTitle}</Text>
                </View>

                {/* Detail Metode */}
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Metode</Text>
                    <View style={styles.methodValueContainer}>
                        <View style={styles.methodIcon} />
                        <Text style={styles.detailValue}>{paymentMethod}</Text>
                    </View>
                </View>

                {/* Detail Nominal */}
                <View style={[styles.detailRow, styles.nominalRow]}>
                    <Text style={styles.detailLabel}>Nominal</Text>
                    <Text style={styles.nominalValue}>
                        Rp {amount.toLocaleString('id-ID')}
                    </Text>
                </View>

                {/* Kotak Kutipan Bawah */}
                <View style={styles.quoteBox}>
                    <HeartHandshake color={Colors.primary} size={24} style={styles.quoteIcon} />
                    <Text style={styles.quoteText}>
                        Setiap rupiah yang Anda berikan sangat berarti bagi mereka yang membutuhkan.
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 20,
        marginBottom: Spacing.xl,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        overflow: 'hidden', // Supaya border-radius header rapi
    },
    header: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
    },
    headerText: {
        ...Typography.bodyMd,
        color: Colors.surface,
        fontWeight: '600',
    },
    content: {
        padding: Spacing.lg,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    label: {
        ...Typography.caption,
        color: Colors.textMuted,
        marginBottom: 4,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    transactionId: {
        ...Typography.bodyMd,
        color: Colors.textPrimary,
        fontWeight: '700',
    },
    statusBox: {
        alignItems: 'flex-end',
    },
    statusLabel: {
        ...Typography.caption,
        color: Colors.textMuted,
        marginBottom: 4,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    badgeSuccess: {
        backgroundColor: '#E6F4EA',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeSuccessText: {
        ...Typography.caption,
        color: Colors.primary,
        fontWeight: '700',
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        opacity: 0.5,
        marginVertical: Spacing.lg,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    nominalRow: {
        marginTop: Spacing.sm,
        marginBottom: Spacing.lg,
    },
    detailLabel: {
        ...Typography.body,
        color: Colors.textMuted,
        flex: 1,
    },
    detailValue: {
        ...Typography.bodyMd,
        color: Colors.textPrimary,
        fontWeight: '600',
        flex: 2,
        textAlign: 'right',
    },
    methodValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 2,
    },
    methodIcon: {
        width: 16,
        height: 16,
        backgroundColor: Colors.primary,
        borderRadius: 4,
        marginRight: 8,
        opacity: 0.8,
    },
    nominalValue: {
        ...Typography.h3,
        color: Colors.primary,
    },
    quoteBox: {
        flexDirection: 'row',
        backgroundColor: Colors.background,
        padding: Spacing.md,
        borderRadius: 12,
        alignItems: 'center',
    },
    quoteIcon: {
        marginRight: Spacing.sm,
    },
    quoteText: {
        ...Typography.caption,
        color: Colors.textPrimary,
        flex: 1,
        lineHeight: 18,
    },
});

export default DonationReceiptCard;
