import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, StatusBar } from 'react-native';
import { Colors, Spacing } from '../theme';
import SearchBar from '../components/SearchBar';
import HomeHeader from '../components/HomeHeader';
import EmergencySection from '../components/EmergencySection';
import AllDisastersSection from '../components/AllDisastersSection';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
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
