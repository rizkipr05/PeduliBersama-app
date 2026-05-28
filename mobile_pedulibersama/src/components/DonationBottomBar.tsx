import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography } from '../theme';
import { formatRupiah } from '../utils/format';

interface DonationBottomBarProps {
    totalAmount: number;
    onContinue: () => void;
}

const DonationBottomBar: React.FC<DonationBottomBarProps> = ({ totalAmount, onContinue }) => {
    return (
        <View style={styles.container}>
            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total Donasi</Text>
                <Text style={styles.totalValue}>{formatRupiah(totalAmount)}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={onContinue}>
                <Text style={styles.buttonText}>LANJUTKAN</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md, paddingTop: Spacing.md, paddingBottom: Spacing.xl, borderTopWidth: 1, borderTopColor: '#F1F5F9', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 8 },
    totalContainer: { flex: 1 },
    totalLabel: { ...Typography.caption, color: Colors.textMuted, fontSize: 10, marginBottom: 2 },
    totalValue: { ...Typography.h2, color: Colors.textPrimary },
    button: { backgroundColor: Colors.primary, paddingHorizontal: Spacing.xl, paddingVertical: 14, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    buttonText: { ...Typography.body, color: '#FFFFFF', fontWeight: '700' },
});
export default DonationBottomBar;
