import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Colors, Spacing } from '../theme';
import { Disaster } from '../types';
import { bencanaApi } from '../services/api';
import { RootStackParamList } from '../navigation/AppNavigator';

import DetailHeader from '../components/DetailHeader';
import DonationProgressBox from '../components/DonationProgressBox';
import AboutDisaster from '../components/AboutDisaster';
import NeedsChip from '../components/NeedsChip';
import FundraiserProfile from '../components/FundraiserProfile';
import BottomActionBar from '../components/BottomActionBar';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'DetailBencana'>;

/**
 * DetailBencanaScreen: Halaman detail kampanye donasi bencana.
 * Mengambil data mendetail terkait sebuah bencana (termasuk daftar kebutuhan, progress donasi, dsb).
 * Terdapat tombol Donasi yang melayang (BottomActionBar) di bagian bawah.
 */
const DetailBencanaScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<any>();
    const { id } = route.params;

    const [disaster, setDisaster] = React.useState<Disaster | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchDisaster = async () => {
            try {
                const res = await bencanaApi.getById(id);
                if (res.data?.data) {
                    setDisaster(res.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch disaster details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDisaster();
    }, [id]);

    if (loading || !disaster) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    const mappedDisaster = {
        id: disaster.id,
        title: disaster.title,
        location: disaster.location || '',
        status: disaster.status || 'ACTIVE',
        imageUrl: disaster.photos?.[0]?.photoUrl || 'https://via.placeholder.com/400',
        progress: 0.6, // Data mockup karena backend belum mendukung targetAmount
        collectedAmount: 450000,
        targetAmount: 750000,
        endDate: '14 Mar 2024',
        donatorsCount: 2400,
        description: disaster.description || '',
        fundraiserName: 'PeduliBersama Admin',
        isEmergency: disaster.status === 'ACTIVE',
        needs: disaster.needs || [],
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* 1. Header: Menampilkan gambar besar dan tombol panah kembali */}
                <DetailHeader 
                    imageUrl={mappedDisaster.imageUrl} 
                    onBack={() => navigation.goBack()} 
                />
                
                {/* 2. Progress Box: Kartu putih melayang berisi target dan nominal yang sudah terkumpul */}
                <DonationProgressBox disaster={mappedDisaster} />
                
                {/* 3. Tentang Bencana: Paragraf penjelasan kejadian yang bisa di-expand */}
                <AboutDisaster description={mappedDisaster.description} />
                
                {/* 4. Kebutuhan: Daftar barang yang paling dibutuhkan (makanan, medis, dll) */}
                <NeedsChip />
                
                {/* 5. Profil Penyelenggara: Info lembaga yang bertanggung jawab menggalang dana */}
                <FundraiserProfile name={mappedDisaster.fundraiserName} />
            </ScrollView>
            
            {/* 6. Aksi Bawah: Tombol donasi hijau yang posisinya selalu diam (fixed) di dasar layar */}
            <BottomActionBar onDonate={() => (navigation as any).navigate('FormDonasi', { 
                disasterId: mappedDisaster.id,
                title: mappedDisaster.title,
                imageUrl: mappedDisaster.imageUrl
            })} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.surface, position: 'relative' },
    scrollView: { flex: 1, paddingBottom: 100 },
});
export default DetailBencanaScreen;
