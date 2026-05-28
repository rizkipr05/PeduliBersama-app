import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing } from '../theme';

import FormHeader from '../components/FormHeader';
import StepperIndicator from '../components/StepperIndicator';
import DonationSummaryDetail from '../components/DonationSummaryDetail';
import PaymentWarningAlert from '../components/PaymentWarningAlert';
import HeroImageBanner from '../components/HeroImageBanner';

const KonfirmasiDonasiScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <FormHeader title="Konfirmasi Donasi" onBack={() => navigation.goBack()} />
            <StepperIndicator currentStep={2} />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <DonationSummaryDetail 
                    title="Bantuan Kemanusiaan: Korban Gempa Sumedang"
                    amount={150000}
                    paymentMethod="BCA Virtual Account"
                    donatorName="Achmad Pratama"
                    isAnonymous={false}
                />
                <PaymentWarningAlert />
                <HeroImageBanner />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Colors.surface, position: 'relative' },
    scrollContainer: { paddingBottom: 120 },
});
export default KonfirmasiDonasiScreen;
