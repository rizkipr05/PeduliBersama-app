import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import { Spacing, Typography } from '../theme';

const PaymentWarningAlert = () => {
    return (
        <View style={styles.container}>
            <View style={styles.iconBox}>
                <AlertTriangle size={20} color="#B45309" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Peringatan Pembayaran</Text>
                <Text style={styles.desc}>Mohon selesaikan pembayaran Anda dalam waktu 24 jam untuk memastikan bantuan segera tersalurkan.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', backgroundColor: '#FEF3C7', padding: Spacing.md, marginHorizontal: Spacing.md, borderRadius: 12, marginBottom: Spacing.xl },
    iconBox: { marginRight: Spacing.sm },
    textContainer: { flex: 1 },
    title: { ...Typography.body, color: '#92400E', fontWeight: '700', marginBottom: 4 },
    desc: { ...Typography.caption, color: '#92400E', lineHeight: 18 },
});
export default PaymentWarningAlert;
