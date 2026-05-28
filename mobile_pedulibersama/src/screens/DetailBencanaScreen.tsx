import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Colors, Spacing } from '../theme';
import DetailHeader from '../components/DetailHeader';
import DonationProgressBox from '../components/DonationProgressBox';
import AboutDisaster from '../components/AboutDisaster';
import NeedsChip from '../components/NeedsChip';
import FundraiserProfile from '../components/FundraiserProfile';
import BottomActionBar from '../components/BottomActionBar';

const DUMMY_DETAIL = {
    id: '1',
    title: 'Bantuan Banjir Bandang Demak & Kudus',
    location: 'Jawa Tengah',
    imageUrl: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=600&auto=format&fit=crop',
    progress: 0.6,
    collectedAmount: 452800000,
    targetAmount: 750000000,
    endDate: '14 Mar 2024',
    donatorsCount: 2400,
    description: 'Banjir bandang melanda wilayah Demak dan Kudus akibat jebolnya tanggul sungai Wulan. Ribuan rumah terendam air dengan ketinggian mencapai 2 meter. Warga sangat membutuhkan bantuan darurat...',
    fundraiserName: 'Relawan Peduli Indonesia',
    isEmergency: true,
};

/**
 * DetailBencanaScreen: Halaman yang menampilkan informasi lengkap dari sebuah bencana.
 * Tersusun dari beberapa lapis komponen kecil (Header, Progress, Detail, Penggalang Dana).
 */
const DetailBencanaScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* 1. Header: Menampilkan gambar besar dan tombol panah kembali */}
                <DetailHeader 
                    imageUrl={DUMMY_DETAIL.imageUrl} 
                    onBack={() => console.log('Back')} 
                />
                
                {/* 2. Progress Box: Kartu putih melayang berisi target dan nominal yang sudah terkumpul */}
                <DonationProgressBox disaster={DUMMY_DETAIL} />
                
                {/* 3. Tentang Bencana: Paragraf penjelasan kejadian yang bisa di-expand */}
                <AboutDisaster description={DUMMY_DETAIL.description} />
                
                {/* 4. Kebutuhan: Daftar barang yang paling dibutuhkan (makanan, medis, dll) */}
                <NeedsChip />
                
                {/* 5. Profil Penyelenggara: Info lembaga yang bertanggung jawab menggalang dana */}
                <FundraiserProfile name={DUMMY_DETAIL.fundraiserName} />
            </ScrollView>
            
            {/* 6. Aksi Bawah: Tombol donasi hijau yang posisinya selalu diam (fixed) di dasar layar */}
            <BottomActionBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.surface, position: 'relative' },
    scrollView: { flex: 1, paddingBottom: 100 },
});
export default DetailBencanaScreen;
