import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Typography } from '../theme';

import NotificationHeader from '../components/NotificationHeader';
import NotificationItem, { NotificationItemProps } from '../components/NotificationItem';
import NotificationHeroBanner from '../components/NotificationHeroBanner';

const MOCK_NOTIFS_TODAY: NotificationItemProps[] = [
    {
        id: '1',
        type: 'donation',
        title: 'Donasi Berhasil!',
        description: 'Terima kasih atas donasi Anda untuk kampanye "Bantu Korban Banjir". Bantuan Anda sangat berarti.',
        time: '2j lalu',
        isRead: false,
    },
    {
        id: '2',
        type: 'campaign',
        title: 'Target Tercapai',
        description: 'Kampanye yang Anda ikuti "Peduli Anak Yatim" telah mencapai 100% dari target donasi.',
        time: '5j lalu',
        isRead: false,
    },
];

const MOCK_NOTIFS_YESTERDAY: NotificationItemProps[] = [
    {
        id: '3',
        type: 'report',
        title: 'Update Laporan',
        description: 'Laporan mingguan kampanye "Hutan Hijau" telah tersedia. Lihat transparansi dana Anda di sini.',
        time: '1h lalu',
        isRead: true,
    },
    {
        id: '4',
        type: 'security',
        title: 'Keamanan Akun',
        description: 'Seseorang baru saja login ke akun Anda melalui perangkat Android. Jika itu bukan Anda, segera ubah sandi.',
        time: '1h lalu',
        isRead: true,
    },
    {
        id: '5',
        type: 'verification',
        title: 'Verifikasi Akun',
        description: 'Selamat! Akun Anda telah terverifikasi sebagai Donatur Tetap PeduliBersama.',
        time: '2h lalu',
        isRead: true,
    },
];

const NotificationScreen = () => {
    const navigation = useNavigation();

    const handleMarkAllRead = () => {
        // Mock function
        console.log("Marked all as read");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <NotificationHeader 
                onBack={() => (navigation as any).navigate('Beranda')} 
                onMarkAllRead={handleMarkAllRead} 
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>HARI INI</Text>
                    {MOCK_NOTIFS_TODAY.map((notif) => (
                        <NotificationItem key={notif.id} {...notif} />
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>KEMARIN</Text>
                    {MOCK_NOTIFS_YESTERDAY.map((notif) => (
                        <NotificationItem key={notif.id} {...notif} />
                    ))}
                </View>

                <NotificationHeroBanner />
                
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
        paddingTop: Spacing.sm,
        paddingBottom: 100, // Space for bottom tabs
    },
    section: {
        marginBottom: Spacing.md,
    },
    sectionTitle: {
        ...Typography.caption,
        color: '#8A92A6',
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: Spacing.md,
        marginLeft: Spacing.xl,
    },
});

export default NotificationScreen;
