import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Typography } from '../theme';
import DisasterCard from './DisasterCard';

interface EmergencySectionProps {
    data: any[];
}

const EmergencySection: React.FC<EmergencySectionProps> = ({ data }) => {
    const navigation = useNavigation();

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
                data={data}
                keyExtractor={item => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
                renderItem={({ item }) => (
                    <DisasterCard
                        title={item.title}
                        location={item.location}
                        imageUrl={item.photos?.[0]?.photoUrl || item.imageUrl || 'https://via.placeholder.com/300'}
                        progress={item.progress || 0.5}
                        collectedAmount={item.collectedAmount || 1000000}
                        isEmergency={true}
                        onDonate={() => (navigation as any).navigate('DetailBencana', { id: item.id })}
                        onPress={() => (navigation as any).navigate('DetailBencana', { id: item.id })}
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
