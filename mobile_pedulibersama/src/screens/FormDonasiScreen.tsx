import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing } from '../theme';

import FormHeader from '../components/FormHeader';
import DonationSummaryCard from '../components/DonationSummaryCard';

const DUMMY_DETAIL = {
    imageUrl: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=600',
    title: 'Bantuan Korban Banjir Bandang',
    location: 'Luwu Utara, Sulawesi Selatan',
    isEmergency: true,
};

const FormDonasiScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <FormHeader title="Donasi" onBack={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <DonationSummaryCard 
                    imageUrl={DUMMY_DETAIL.imageUrl}
                    title={DUMMY_DETAIL.title}
                    location={DUMMY_DETAIL.location}
                    isEmergency={DUMMY_DETAIL.isEmergency}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Colors.surface },
    scrollContainer: { padding: Spacing.md, paddingBottom: 100 },
});
export default FormDonasiScreen;
