import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing } from '../theme';

import FormHeader from '../components/FormHeader';
import StepperIndicator from '../components/StepperIndicator';

const KonfirmasiDonasiScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <FormHeader title="Konfirmasi Donasi" onBack={() => navigation.goBack()} />
            <StepperIndicator currentStep={2} />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Colors.surface, position: 'relative' },
    scrollContainer: { paddingBottom: 120 },
});
export default KonfirmasiDonasiScreen;
