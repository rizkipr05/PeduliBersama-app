import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Utensils, Droplet, Pill } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

/**
 * Komponen NeedsChip:
 * Menampilkan grid ikon kebutuhan logistik (Makanan, Air, Medis).
 * Siap dihubungkan dengan data dinamis dari API.
 */
const NeedsChip = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Kebutuhan Bantuan</Text>
                <Text style={styles.seeDetail}>Lihat Detail</Text>
            </View>
            <View style={styles.grid}>
                <View style={styles.chip}>
                    <View style={styles.iconWrapper}><Utensils size={16} color={Colors.primary} /></View>
                    <Text style={styles.chipText}>Makanan</Text>
                </View>
                <View style={styles.chip}>
                    <View style={styles.iconWrapper}><Droplet size={16} color={Colors.primary} /></View>
                    <Text style={styles.chipText}>Air Bersih</Text>
                </View>
                <View style={[styles.chip, { width: '100%', marginTop: Spacing.sm }]}>
                    <View style={styles.iconWrapper}><Pill size={16} color={Colors.primary} /></View>
                    <Text style={styles.chipText}>Obat-obatan & Medis</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { paddingHorizontal: Spacing.md, marginTop: Spacing.xl },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
    sectionTitle: { ...Typography.h3, color: Colors.textPrimary },
    seeDetail: { ...Typography.caption, color: Colors.primary, fontWeight: '700', fontSize: 10 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    chip: { width: '48%', flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: Spacing.sm, borderRadius: 12, borderWidth: 1, borderColor: '#F1F5F9' },
    iconWrapper: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#E0F2FE', justifyContent: 'center', alignItems: 'center', marginRight: Spacing.sm },
    chipText: { ...Typography.caption, color: Colors.textPrimary, fontWeight: '600', fontSize: 11 },
});
export default NeedsChip;
