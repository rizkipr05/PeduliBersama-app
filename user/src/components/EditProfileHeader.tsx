import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

interface EditProfileHeaderProps {
    onBack: () => void;
    onSave: () => void;
}

const EditProfileHeader: React.FC<EditProfileHeaderProps> = ({ onBack, onSave }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconButton} onPress={onBack} activeOpacity={0.7}>
                <ArrowLeft color={Colors.primary} size={24} />
            </TouchableOpacity>
            
            <Text style={styles.title}>Edit Profil</Text>
            
            <TouchableOpacity onPress={onSave} activeOpacity={0.7} style={styles.saveBtn}>
                <Text style={styles.saveText}>Simpan</Text>
            </TouchableOpacity>
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
        width: 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    title: {
        ...Typography.h3,
        color: Colors.primary,
        fontWeight: '700',
        flex: 1,
        textAlign: 'center',
    },
    saveBtn: {
        width: 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    saveText: {
        ...Typography.bodyMd,
        color: Colors.primary,
        fontWeight: '600',
    },
});

export default EditProfileHeader;
