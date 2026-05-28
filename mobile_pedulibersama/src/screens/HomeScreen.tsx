import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Bell } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';
import SearchBar from '../components/SearchBar';
import DisasterCard from '../components/DisasterCard';
import DisasterListItem from '../components/DisasterListItem';
import { DUMMY_EMERGENCY_DISASTERS, DUMMY_ALL_DISASTERS } from '../services/mockData';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>
                
                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.greeting}>Halo, Ahmad</Text>
                        <Text style={styles.subtitle}>Ayo bantu sesama hari ini</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.bellButton}>
                            <Bell size={20} color={Colors.textPrimary} />
                            <View style={styles.notificationDot} />
                        </TouchableOpacity>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150?img=33' }}
                            style={styles.avatar}
                        />
                    </View>
                </View>

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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.sm,
    },
    headerTextContainer: {
        flex: 1,
    },
    greeting: {
        ...Typography.h2,
        color: Colors.textPrimary,
        marginBottom: 2,
    },
    subtitle: {
        ...Typography.caption,
        color: Colors.textMuted,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bellButton: {
        padding: 8,
        marginRight: Spacing.sm,
        position: 'relative',
    },
    notificationDot: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#EF4444',
        borderWidth: 1,
        borderColor: Colors.surface,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E5E7EB',
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
