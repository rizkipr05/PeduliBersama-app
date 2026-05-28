import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography } from '../theme';

interface AboutDisasterProps {
    description: string;
}

/**
 * Komponen AboutDisaster:
 * Menampilkan deskripsi bencana. Memiliki state `expanded` untuk
 * memotong teks yang terlalu panjang (truncate) dan menampilkan tombol 'Selengkapnya'.
 */
const AboutDisaster: React.FC<AboutDisasterProps> = ({ description }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Tentang Bencana</Text>
            <View style={styles.card}>
                <Text style={styles.description} numberOfLines={expanded ? undefined : 3}>
                    {description}
                </Text>
                <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.toggleButton}>
                    <Text style={styles.toggleText}>{expanded ? 'Tutup' : 'Selengkapnya v'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { paddingHorizontal: Spacing.md, marginTop: Spacing.xl },
    sectionTitle: { ...Typography.h3, color: Colors.textPrimary, marginBottom: Spacing.sm },
    card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: Spacing.md, borderWidth: 1, borderColor: '#F1F5F9' },
    description: { ...Typography.caption, color: Colors.textMuted, lineHeight: 20 },
    toggleButton: { marginTop: Spacing.sm },
    toggleText: { ...Typography.caption, color: Colors.primary, fontWeight: '700' },
});
export default AboutDisaster;
