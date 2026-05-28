import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Colors, Spacing, Typography } from '../theme';
import DisasterCard from './DisasterCard';
import { DUMMY_EMERGENCY_DISASTERS } from '../services/mockData';

const EmergencySection = () => {
    return (
        <>
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
        </>
    );
};

const styles = StyleSheet.create({
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.md, marginBottom: Spacing.sm },
    sectionTitle: { ...Typography.h3, color: Colors.textPrimary },
    seeAllText: { ...Typography.caption, fontWeight: '600', color: Colors.primary },
    horizontalList: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.md },
});
export default EmergencySection;
