import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Typography } from '../theme';
import DisasterListItem from './DisasterListItem';
import { DUMMY_ALL_DISASTERS } from '../services/mockData';

const AllDisastersSection = () => {
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
                {DUMMY_ALL_DISASTERS.map(item => (
                    <DisasterListItem
                        key={item.id}
                        title={item.title}
                        location={item.location}
                        imageUrl={item.imageUrl}
                        progress={item.progress}
                        collectedAmount={item.collectedAmount}
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
