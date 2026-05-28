import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Colors, Spacing } from '../theme';
import DetailHeader from '../components/DetailHeader';

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

const DetailBencanaScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <DetailHeader 
                    imageUrl={DUMMY_DETAIL.imageUrl} 
                    onBack={() => console.log('Back')} 
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.surface },
    scrollView: { flex: 1 },
});
export default DetailBencanaScreen;
