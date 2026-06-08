import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft, Settings } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

const ProfileHeader = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
                <ArrowLeft color={Colors.primary} size={24} />
            </TouchableOpacity>
            
            <Text style={styles.brand}>PeduliBersama</Text>
            
            <TouchableOpacity style={styles.iconButtonRight} activeOpacity={0.7}>
                <Settings color={Colors.textMuted} size={22} />
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
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    iconButtonRight: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    brand: {
        ...Typography.h3,
        color: Colors.primary,
        fontWeight: '700',
        flex: 1,
        textAlign: 'center',
    },
});

export default ProfileHeader;
