import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Typography } from '../theme';
import DisasterListItem from './DisasterListItem';
import { Disaster } from '../types';

interface AllDisastersSectionProps {
    data: Disaster[];
}

const AllDisastersSection: React.FC<AllDisastersSectionProps> = ({ data }) => {
    const navigation = useNavigation();

    return (
        <>
            <View style={[styles.sectionHeader, { marginTop: Spacing.xl }]}>
                <Text style={styles.sectionTitle}>Semua Bencana</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAllText}>Filter</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.verticalList}>
                {data.map(item => (
                    <DisasterListItem
                        key={item.id}
                        title={item.title}
                        location={item.location}
                        imageUrl={item.photos?.[0]?.photoUrl || item.imageUrl || 'https://via.placeholder.com/100'}
                        progress={item.progress || 0.4}
                        collectedAmount={item.collectedAmount || 500000}
                        onPress={() => (navigation as any).navigate('DetailBencana', { id: item.id })}
                    />
                ))}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.md, marginBottom: Spacing.sm },
    sectionTitle: { ...Typography.h3, color: Colors.textPrimary },
    seeAllText: { ...Typography.caption, fontWeight: '600', color: Colors.primary },
    verticalList: { paddingHorizontal: Spacing.md },
});
export default AllDisastersSection;
