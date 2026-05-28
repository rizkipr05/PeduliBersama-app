import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

const HomeHeader = () => {
    return (
        <View style={styles.header}>
            <View style={styles.headerTextContainer}>
                <Text style={styles.greeting}>Halo, Ahmad</Text>
                <Text style={styles.subtitle}>Ayo bantu sesama hari ini</Text>
            </View>
            <View style={styles.headerRight}>
                <TouchableOpacity style={styles.bellButton}>
                    <Bell size={20} color={Colors.textPrimary} />
                    <View style={styles.notificationDot} />
                </TouchableOpacity>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=33' }}
                    style={styles.avatar}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.sm,
    },
    headerTextContainer: { flex: 1 },
    greeting: { ...Typography.h2, color: Colors.textPrimary, marginBottom: 2 },
    subtitle: { ...Typography.caption, color: Colors.textMuted },
    headerRight: { flexDirection: 'row', alignItems: 'center' },
    bellButton: { padding: 8, marginRight: Spacing.sm, position: 'relative' },
    notificationDot: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444', borderWidth: 1, borderColor: Colors.surface },
    avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E5E7EB' },
});

export default HomeHeader;
