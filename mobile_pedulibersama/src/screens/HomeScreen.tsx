import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Colors, Spacing, Typography } from '../theme';
import SearchBar from '../components/SearchBar';
import DisasterCard from '../components/DisasterCard';
import DisasterListItem from '../components/DisasterListItem';
import HomeHeader from '../components/HomeHeader';
import { DUMMY_EMERGENCY_DISASTERS, DUMMY_ALL_DISASTERS } from '../services/mockData';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>
                
                <HomeHeader />

                {/* Search Section */}
                <View style={styles.searchSection}>
                    <SearchBar />
                </View>

                {/* Bencana Darurat Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Bencana Darurat</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>Lihat Semua</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal
                    data={DUMMY_EMERGENCY_DISASTERS}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                    renderItem={({ item }) => (
                        <DisasterCard
                            title={item.title}
                            location={item.location}
                            imageUrl={item.imageUrl}
                            progress={item.progress}
                            collectedAmount={item.collectedAmount}
                            isEmergency={item.isEmergency}
                            onDonate={() => console.log('Donate to', item.title)}
                            onPress={() => console.log('Press', item.title)}
                        />
                    )}
                />

                {/* Semua Bencana Section */}
                <View style={[styles.sectionHeader, { marginTop: Spacing.xl }]}>
                    <Text style={styles.sectionTitle}>Semua Bencana</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>Filter</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.verticalList}>
                    {DUMMY_ALL_DISASTERS.map(item => (
                        <DisasterListItem
                            key={item.id}
                            title={item.title}
                            location={item.location}
                            imageUrl={item.imageUrl}
                            progress={item.progress}
                            collectedAmount={item.collectedAmount}
                            onPress={() => console.log('Press', item.title)}
                        />
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
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: Spacing.xxl,
    },
    searchSection: {
        paddingHorizontal: Spacing.md,
        marginVertical: Spacing.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        marginBottom: Spacing.sm,
    },
    sectionTitle: {
        ...Typography.h3,
        color: Colors.textPrimary,
    },
    seeAllText: {
        ...Typography.caption,
        fontWeight: '600',
        color: Colors.primary,
    },
    horizontalList: {
        paddingHorizontal: Spacing.md,
        paddingBottom: Spacing.md,
    },
    verticalList: {
        paddingHorizontal: Spacing.md,
    },
});

export default HomeScreen;
