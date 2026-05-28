import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

interface FundraiserProfileProps {
    name: string;
}

/**
 * Komponen FundraiserProfile:
 * Menampilkan nama penyelenggara/relawan penggalang dana
 * beserta lencana verifikasi (CheckCircle).
 */
const FundraiserProfile: React.FC<FundraiserProfileProps> = ({ name }) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatar} />
                <View style={styles.info}>
                    <Text style={styles.label}>PENGGALANG DANA</Text>
                    <Text style={styles.name}>{name}</Text>
                </View>
                <CheckCircle size={20} color={Colors.primary} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { paddingHorizontal: Spacing.md, marginTop: Spacing.xl, marginBottom: Spacing.xxl },
    card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', padding: Spacing.md, borderRadius: 16 },
    avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E5E7EB', marginRight: Spacing.sm },
    info: { flex: 1 },
    label: { ...Typography.caption, color: Colors.textMuted, fontSize: 8, fontWeight: '700', marginBottom: 2 },
    name: { ...Typography.caption, color: Colors.textPrimary, fontWeight: '700' },
});
export default FundraiserProfile;
