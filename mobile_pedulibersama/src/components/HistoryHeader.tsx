import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

interface HistoryHeaderProps {
    onBack: () => void;
}

const HistoryHeader: React.FC<HistoryHeaderProps> = ({ onBack }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBack} style={styles.iconButton} activeOpacity={0.7}>
                <ArrowLeft color={Colors.primary} size={24} />
            </TouchableOpacity>
            
            <Text style={styles.title}>Riwayat Donasi</Text>
            
            <Text style={styles.brand}>PeduliBersama</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        backgroundColor: Colors.surface,
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    title: {
        ...Typography.h3,
        color: Colors.textPrimary,
        flex: 1,
        textAlign: 'center',
    },
    brand: {
        ...Typography.bodyMd,
        color: Colors.primary,
        fontWeight: '700',
        width: 'auto',
    },
});

export default HistoryHeader;
