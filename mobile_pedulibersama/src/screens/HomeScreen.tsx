import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Colors, Spacing } from '../theme';
import SearchBar from '../components/SearchBar';
import HomeHeader from '../components/HomeHeader';
import EmergencySection from '../components/EmergencySection';
import AllDisastersSection from '../components/AllDisastersSection';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>
                
                <HomeHeader />

                <View style={styles.searchSection}>
                    <SearchBar />
                </View>

                <EmergencySection />

                <AllDisastersSection />

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
