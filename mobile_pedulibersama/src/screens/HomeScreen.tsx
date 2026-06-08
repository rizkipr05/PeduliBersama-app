import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, StatusBar } from 'react-native';
import { Colors, Spacing } from '../theme';
import SearchBar from '../components/SearchBar';
import HomeHeader from '../components/HomeHeader';
import EmergencySection from '../components/EmergencySection';
import AllDisastersSection from '../components/AllDisastersSection';
import { SafeAreaView } from 'react-native-safe-area-context';
import { bencanaApi } from '../services/api';

/**
 * HomeScreen: Halaman utama aplikasi setelah pengguna berhasil login.
 * Menampilkan ringkasan sapaan, pencarian, dan daftar bencana (Darurat & Reguler).
 */
const HomeScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [disasters, setDisasters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDisasters = async () => {
        try {
            const res = await bencanaApi.getAll();
            if (res.data?.data) {
                setDisasters(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch disasters:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    React.useEffect(() => {
        fetchDisasters();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchDisasters();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.surface} />
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary]} />
                }>
                
                <HomeHeader />

                {/* AREA PENCARIAN: Tempat pengguna mencari nama atau lokasi bencana */}
                <View style={styles.searchSection}>
                    <SearchBar />
                </View>

                {/* AREA BENCANA DARURAT: Menampilkan daftar bencana mendesak secara horizontal (bisa digeser ke samping) */}
                <EmergencySection data={disasters.slice(0, 3)} />

                {/* AREA SEMUA BENCANA: Menampilkan daftar seluruh donasi secara vertikal (memanjang ke bawah) */}
                <AllDisastersSection data={disasters} />

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Colors.surface },
    container: { flex: 1 },
    scrollContent: { paddingBottom: Spacing.xxl },
    searchSection: { paddingHorizontal: Spacing.md, marginVertical: Spacing.md },
});

export default HomeScreen;
