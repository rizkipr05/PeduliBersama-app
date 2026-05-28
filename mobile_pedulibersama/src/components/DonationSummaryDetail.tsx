import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Building2, HeartHandshake } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';
import { formatRupiah } from '../utils/format';

interface DonationSummaryDetailProps {
    title: string;
    amount: number;
    paymentMethod: string;
    donatorName: string;
    isAnonymous: boolean;
}

const DonationSummaryDetail: React.FC<DonationSummaryDetailProps> = ({ title, amount, paymentMethod, donatorName, isAnonymous }) => {
    const initials = isAnonymous ? 'AN' : donatorName.substring(0, 2).toUpperCase() || 'US';
    const displayName = isAnonymous ? 'Hamba Allah (Anonim)' : donatorName || 'User';

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>Ringkasan Donasi</Text>
                <Text style={styles.verifyBadge}>VERIFIKASI</Text>
            </View>

            <View style={styles.card}>
                {/* Tujuan */}
                <View style={styles.row}>
                    <View style={styles.left}>
                        <Text style={styles.label}>TUJUAN DONASI</Text>
                        <Text style={styles.valueTitle}>{title}</Text>
                    </View>
                    <HeartHandshake size={32} color="#E2E8F0" />
                </View>
                <View style={styles.divider} />

                {/* Nominal */}
                <View style={styles.row}>
                    <View style={styles.left}>
                        <Text style={styles.label}>NOMINAL DONASI</Text>
                        <Text style={styles.amountValue}>{formatRupiah(amount)}</Text>
                    </View>
                    <View style={styles.idrBadge}>
                        <Text style={styles.idrText}>IDR</Text>
                    </View>
                </View>
                <View style={styles.divider} />

                {/* Metode */}
                <View style={styles.row}>
                    <View style={styles.left}>
                        <Text style={styles.label}>METODE PEMBAYARAN</Text>
                        <View style={styles.methodRow}>
                            <Building2 size={16} color={Colors.textPrimary} />
                            <Text style={styles.methodValue}>{paymentMethod}</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.changeLink}>Ubah</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.divider} />

                {/* Nama */}
                <View style={styles.row}>
                    <View style={styles.left}>
                        <Text style={styles.label}>DONASI ATAS NAMA</Text>
                        <View style={styles.methodRow}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{initials}</Text>
                            </View>
                            <Text style={styles.methodValue}>{displayName}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { paddingHorizontal: Spacing.md, marginBottom: Spacing.xl },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
    sectionTitle: { ...Typography.h2, color: Colors.textPrimary },
    verifyBadge: { ...Typography.caption, color: Colors.primary, fontWeight: '700', fontSize: 10 },
    card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: Spacing.md, borderWidth: 1, borderColor: '#F1F5F9', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    left: { flex: 1, paddingRight: Spacing.md },
    label: { ...Typography.caption, color: Colors.textMuted, fontSize: 10, fontWeight: '700', marginBottom: 4 },
    valueTitle: { ...Typography.body, color: Colors.textPrimary, fontWeight: '700' },
    divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: Spacing.md },
    amountValue: { ...Typography.h2, color: Colors.primary },
    idrBadge: { backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    idrText: { ...Typography.caption, color: Colors.primary, fontWeight: '700', fontSize: 10 },
    methodRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    methodValue: { ...Typography.body, color: Colors.textPrimary, marginLeft: 8 },
    changeLink: { ...Typography.caption, color: Colors.primary, fontWeight: '700' },
    avatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#A7F3D0', justifyContent: 'center', alignItems: 'center' },
    avatarText: { ...Typography.caption, color: Colors.primary, fontSize: 10, fontWeight: '700' },
});
export default DonationSummaryDetail;
