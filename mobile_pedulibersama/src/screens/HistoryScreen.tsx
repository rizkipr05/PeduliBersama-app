import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../theme';

import HistoryHeader from '../components/HistoryHeader';
import FilterTabs from '../components/FilterTabs';
import DonationSummaryWidget from '../components/DonationSummaryWidget';
import HistoryListItem, { HistoryListItemProps } from '../components/HistoryListItem';

const FILTER_TABS = ['Semua', 'Berhasil', 'Diproses', 'Gagal'];

const MOCK_HISTORY: HistoryListItemProps[] = [
    {
        id: '1',
        title: 'Bantuan Banjir Jateng',
        date: '12 Okt 2023',
        time: '14:20',
        amount: 50000,
        status: 'Berhasil',
        imageUrl: require('../assets/OIP.jpg'),
    },
    {
        id: '2',
        title: 'Beasiswa Anak Pesisir',
        date: '10 Okt 2023',
        time: '09:15',
        amount: 150000,
        status: 'Diproses',
        imageUrl: require('../assets/OIP.jpg'),
    },
    {
        id: '3',
        title: 'Donasi Medis Darurat',
        date: '05 Okt 2023',
        time: '21:05',
        amount: 200000,
        status: 'Berhasil',
        imageUrl: require('../assets/OIP.jpg'),
    },
    {
        id: '4',
        title: 'Emergency Earthquake Rel...',
        date: '01 Okt 2023',
        time: '11:40',
        amount: 100000,
        status: 'Gagal',
        imageUrl: require('../assets/OIP.jpg'),
    },
    {
        id: '5',
        title: 'Penanaman 1000 Pohon',
        date: '28 Sep 2023',
        time: '16:55',
        amount: 25000,
        status: 'Berhasil',
        imageUrl: require('../assets/OIP.jpg'),
    },
];

const HistoryScreen = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('Semua');

    const filteredHistory = MOCK_HISTORY.filter(item => {
        if (activeTab === 'Semua') return true;
        return item.status === activeTab;
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <HistoryHeader onBack={() => (navigation as any).navigate('Beranda')} />
            
            <View>
                <FilterTabs 
                    tabs={FILTER_TABS} 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <DonationSummaryWidget 
                    totalAmount={2450000} 
                    campaignCount={12} 
                />

                <View style={styles.listContainer}>
                    {filteredHistory.map((item) => (
                        <HistoryListItem key={item.id} {...item} />
                    ))}
                </View>
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
        paddingTop: 8,
        paddingBottom: 100, // Ruang untuk bottom tab
    },
    listContainer: {
        marginTop: 8,
    },
});

export default HistoryScreen;
