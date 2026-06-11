import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

/**
 * Props untuk komponen SearchBar, mewarisi semua props TextInput standar dari React Native.
 */
interface SearchBarProps extends TextInputProps {
    placeholder?: string;
}

/**
 * Komponen input pencarian khusus dengan ikon kaca pembesar di sebelah kiri.
 * Menyediakan state teks internal dan tombol (X) untuk menghapus input dengan cepat.
 */
const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Cari bencana...', ...props }) => {
    const [searchText, setSearchText] = useState('');

    return (
        <View style={styles.container}>
            <Search color={Colors.textMuted} size={20} style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={Colors.textMuted}
                value={searchText}
                onChangeText={setSearchText}
                accessible={true}
                accessibilityLabel="Pencarian Bencana"
                accessibilityHint="Masukkan nama bencana atau lokasi untuk mencari kampanye"
                {...props}
            />
            {searchText.length > 0 && (
                <TouchableOpacity onPress={() => setSearchText('')}>
                    <X color={Colors.textMuted} size={18} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingHorizontal: Spacing.md,
        height: 48,
        borderWidth: 1,
        borderColor: Colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    icon: {
        marginRight: Spacing.sm,
    },
    input: {
        flex: 1,
        ...Typography.body,
        color: Colors.textPrimary,
        height: '100%',
    },
});

export default SearchBar;
