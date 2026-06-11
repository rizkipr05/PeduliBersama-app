import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { BadgeCheck } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

interface ProfileHeroProps {
    name: string;
    email: string;
    imageUrl: any;
    stats: {
        donations: string;
        totalRp: string;
        campaigns: string;
    };
}

const ProfileHero: React.FC<ProfileHeroProps> = ({ name, email, imageUrl, stats }) => {
    return (
        <View style={styles.container}>
            {/* Avatar Section */}
            <View style={styles.avatarWrapper}>
                <Image source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} style={styles.avatar} />
                <View style={styles.badgeContainer}>
                    <BadgeCheck color={Colors.primary} size={16} fill={Colors.surface} />
                </View>
            </View>

            {/* User Info */}
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>

            {/* Stats Box */}
            <View style={styles.statsBox}>
                <View style={styles.statCol}>
                    <Text style={styles.statValue}>{stats.donations}</Text>
                    <Text style={styles.statLabel}>DONASI</Text>
                </View>
                
                <View style={styles.statDivider} />
                
                <View style={styles.statCol}>
                    <Text style={styles.statValue}>{stats.totalRp}</Text>
                    <Text style={styles.statLabel}>TOTAL RP</Text>
                </View>
                
                <View style={styles.statDivider} />
                
                <View style={styles.statCol}>
                    <Text style={styles.statValue}>{stats.campaigns}</Text>
                    <Text style={styles.statLabel}>BENCANA</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        paddingTop: Spacing.xl,
        paddingBottom: Spacing.xl,
        alignItems: 'center',
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: Spacing.md,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: Colors.primaryContainer,
    },
    badgeContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: 2,
    },
    name: {
        ...Typography.h2,
        color: Colors.surface,
        marginBottom: 2,
    },
    email: {
        ...Typography.body,
        color: Colors.surface,
        opacity: 0.8,
        marginBottom: Spacing.xl,
    },
    statsBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 20,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.sm,
        marginHorizontal: Spacing.xl,
        width: '85%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    statCol: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        ...Typography.h3,
        color: Colors.surface,
        marginBottom: 4,
    },
    statLabel: {
        ...Typography.caption,
        color: Colors.surface,
        opacity: 0.8,
        fontSize: 9,
        fontWeight: '600',
        letterSpacing: 1,
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: Colors.surface,
        opacity: 0.3,
    },
});

export default ProfileHero;
