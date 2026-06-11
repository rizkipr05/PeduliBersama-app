import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';
import { formatRupiah } from '../utils/format';

interface ConfirmationBottomBarProps {
    totalAmount: number;
    onCancel: () => void;
    onPay: () => void;
}

const ConfirmationBottomBar: React.FC<ConfirmationBottomBarProps> = ({ totalAmount, onCancel, onPay }) => {
    return (
        <View style={styles.container}>
            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Pembayaran</Text>
                <Text style={styles.totalValue}>{formatRupiah(totalAmount)}</Text>
            </View>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                    <Text style={styles.cancelText}>Batalkan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.payButton} onPress={onPay}>
                    <Text style={styles.payText}>Bayar Sekarang</Text>
                    <ArrowRight size={16} color="#FFFFFF" style={{ marginLeft: 8 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', paddingHorizontal: Spacing.md, paddingTop: Spacing.md, paddingBottom: Spacing.xl, borderTopWidth: 1, borderTopColor: '#F1F5F9', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 8 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
    totalLabel: { ...Typography.caption, color: Colors.textMuted, fontSize: 11 },
    totalValue: { ...Typography.h3, color: Colors.primary },
    buttonRow: { flexDirection: 'row', gap: Spacing.sm },
    cancelButton: { flex: 1, paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
    cancelText: { ...Typography.body, color: Colors.textPrimary, fontWeight: '700' },
    payButton: { flex: 2, flexDirection: 'row', backgroundColor: Colors.primary, paddingVertical: 14, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    payText: { ...Typography.body, color: '#FFFFFF', fontWeight: '700' },
});
export default ConfirmationBottomBar;
