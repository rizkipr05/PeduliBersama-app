import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { User, ShieldCheck, Clock, Heart, Bell, HelpCircle, LogOut } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

import ProfileHeader from '../components/ProfileHeader';
import ProfileHero from '../components/ProfileHero';
import ProfileMenuItem from '../components/ProfileMenuItem';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [isNotifEnabled, setIsNotifEnabled] = useState(true);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ProfileHeader />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <ProfileHero 
                    name="Ahmad Fauzi"
                    email="ahmad.fauzi@email.com"
                    imageUrl={require('../assets/OIP.jpg')} // Fallback image
                    stats={{
                        donations: '12',
                        totalRp: '4.2jt',
                        campaigns: '8'
                    }}
                />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>AKUN SAYA</Text>
                    <View style={styles.menuCard}>
                        <ProfileMenuItem 
                            title="Edit Profil" 
                            icon={<User color={Colors.primary} size={20} />} 
                            onPress={() => (navigation as any).navigate('EditProfile')}
                        />
                        <ProfileMenuItem 
                            title="Keamanan Akun" 
                            icon={<ShieldCheck color={Colors.primary} size={20} />} 
                            hideBorder
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>DONASI</Text>
                    <View style={styles.menuCard}>
                        <ProfileMenuItem 
                            title="Riwayat Donasi" 
                            icon={<Clock color={Colors.primary} size={20} />} 
                        />
                        <ProfileMenuItem 
                            title="Program Terfavorit" 
                            icon={<Heart color={Colors.primary} size={20} />} 
                            hideBorder
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>LAINNYA</Text>
                    <View style={styles.menuCard}>
                        <ProfileMenuItem 
                            title="Notifikasi" 
                            icon={<Bell color={Colors.textMuted} size={20} />} 
                            hasSwitch
                            switchValue={isNotifEnabled}
                            onSwitchChange={setIsNotifEnabled}
                        />
                        <ProfileMenuItem 
                            title="Pusat Bantuan" 
                            icon={<HelpCircle color={Colors.textMuted} size={20} />} 
                        />
                        <ProfileMenuItem 
                            title="Logout" 
                            icon={<LogOut color="#D13C4B" size={20} />} 
                            isDestructive
                            hideBorder
                        />
                    </View>
                </View>

                <Text style={styles.appVersion}>PEDULIBERSAMA V2.4.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.surface,
    },
    scrollContent: {
        paddingBottom: 100, // Space for bottom tabs
    },
    section: {
        paddingHorizontal: Spacing.lg,
        marginTop: Spacing.xl,
    },
    sectionTitle: {
        ...Typography.caption,
        color: '#8A92A6',
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: Spacing.sm,
        marginLeft: Spacing.sm,
    },
    menuCard: {
        backgroundColor: Colors.cardBackground,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.02)',
    },
    appVersion: {
        ...Typography.caption,
        color: Colors.border,
        textAlign: 'center',
        marginTop: Spacing.xxl,
        marginBottom: Spacing.xl,
        letterSpacing: 1,
        fontSize: 10,
    },
});

export default ProfileScreen;
