import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bookmark, Heart } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

/**
 * Komponen BottomActionBar:
 * Berada di posisi fixed di bagian bawah layar.
 * Menyediakan aksi utama yaitu menyimpan (bookmark) dan melakukan donasi.
 */
interface BottomActionBarProps {
    onDonate?: () => void;
}

const BottomActionBar: React.FC<BottomActionBarProps> = ({ onDonate }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.bookmarkButton}>
                <Bookmark size={20} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.donateButton} 
                onPress={onDonate} 
                activeOpacity={0.8}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Donasi Sekarang"
                accessibilityHint="Membuka formulir donasi untuk kampanye ini"
            >
                <Text style={styles.donateText}>Donasi Sekarang</Text>
                <Heart size={16} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', paddingHorizontal: Spacing.md, paddingTop: Spacing.md, paddingBottom: Spacing.xl, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#F1F5F9' },
    bookmarkButton: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#E0F2FE', justifyContent: 'center', alignItems: 'center', marginRight: Spacing.sm },
    donateButton: { flex: 1, height: 48, borderRadius: 12, backgroundColor: Colors.primary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    donateText: { ...Typography.body, color: '#FFFFFF', fontWeight: '700' },
});
export default BottomActionBar;
