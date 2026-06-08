import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Heart } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

interface DonationSummaryWidgetProps {
    totalAmount: number;
    campaignCount: number;
}

const DonationSummaryWidget: React.FC<DonationSummaryWidgetProps> = ({ totalAmount, campaignCount }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Total Donasi Anda</Text>
            <Text style={styles.amount}>
                Rp {totalAmount.toLocaleString('id-ID')}
            </Text>
            <View style={styles.footerRow}>
                <Heart color={Colors.surface} size={14} fill={Colors.surface} />
                <Text style={styles.footerText}>
                    Membantu {campaignCount} kampanye sosial
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        padding: Spacing.xl,
        marginHorizontal: Spacing.lg,
        marginBottom: Spacing.md,
        elevation: 6,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    label: {
        ...Typography.body,
        color: Colors.surface,
        opacity: 0.9,
        marginBottom: 4,
    },
    amount: {
        ...Typography.h1,
        color: Colors.white,
        marginBottom: Spacing.md,
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.9,
    },
    footerText: {
        ...Typography.caption,
        color: Colors.surface,
        marginLeft: 6,
    },
});

export default DonationSummaryWidget;
