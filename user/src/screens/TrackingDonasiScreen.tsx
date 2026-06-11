import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Download } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

import FormHeader from '../components/FormHeader';
import TrackingStatusCard from '../components/TrackingStatusCard';
import TrackingTimeline, { TimelineStep } from '../components/TrackingTimeline';
import DistributionEvidence from '../components/DistributionEvidence';

const MOCK_TIMELINE: TimelineStep[] = [
    {
        id: '1',
        title: 'Donasi Diterima',
        description: 'Donasimu telah masuk ke sistem PeduliBersama dan siap dialokasikan.',
        date: '12 Okt, 14:21',
        status: 'completed',
    },
    {
        id: '2',
        title: 'Diverifikasi',
        description: 'Tim verifikasi kami telah memvalidasi dana untuk kebutuhan logistik di lapangan.',
        date: '13 Okt, 09:15',
        status: 'completed',
    },
    {
        id: '3',
        title: 'Sedang Disalurkan',
        description: 'Bantuan sedang dalam proses distribusi ke titik pengungsian Desa Masamba.',
        date: 'Hari Ini',
        status: 'active',
    },
    {
        id: '4',
        title: 'Laporan Selesai',
        description: 'Bukti penyaluran akhir akan diunggah setelah distribusi rampung.',
        status: 'upcoming',
    },
];

const TrackingDonasiScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <FormHeader title="Status Donasi" onBack={() => navigation.goBack()} />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <TrackingStatusCard 
                    title="Bantuan Banjir Bandang Luwu Utara"
                    amount={1500000}
                    date="12 Okt 2023, 14:20"
                    transactionId="#PB-20231012-092"
                    status="SUCCESS"
                />

                <TrackingTimeline steps={MOCK_TIMELINE} />

                <DistributionEvidence 
                    imageUrl={require('../assets/OIP.jpg')}
                    caption="Distribusi paket sembako tahap pertama di Posko Induk Luwu Utara."
                />
            </ScrollView>

            {/* Bottom Action */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.outlineBtn} activeOpacity={0.7}>
                    <Download color={Colors.primary} size={20} style={styles.dlIcon} />
                    <Text style={styles.outlineBtnText}>Unduh Bukti Donasi</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.surface,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.surface,
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.xl,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    outlineBtn: {
        flexDirection: 'row',
        height: 52,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: Colors.primary,
        backgroundColor: Colors.surface,
    },
    dlIcon: {
        marginRight: Spacing.sm,
    },
    outlineBtnText: {
        ...Typography.button,
        color: Colors.primary,
    },
});

export default TrackingDonasiScreen;
