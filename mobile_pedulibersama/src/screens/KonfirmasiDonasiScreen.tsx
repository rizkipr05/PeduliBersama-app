import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing } from '../theme';

import FormHeader from '../components/FormHeader';
import StepperIndicator from '../components/StepperIndicator';
import DonationSummaryDetail from '../components/DonationSummaryDetail';
import PaymentWarningAlert from '../components/PaymentWarningAlert';
import HeroImageBanner from '../components/HeroImageBanner';
import ConfirmationBottomBar from '../components/ConfirmationBottomBar';

const DUMMY_ORDER = {
    title: 'Bantuan Kemanusiaan: Korban Gempa Sumedang',
    amount: 150000,
    paymentMethod: 'BCA Virtual Account',
    donatorName: 'Achmad Pratama',
    isAnonymous: false,
};

const KonfirmasiDonasiScreen = () => {
    const navigation = useNavigation();

    const handlePay = () => {
        Alert.alert(
            'Donasi Berhasil!',
            'Terima kasih atas kebaikan Anda. Bantuan akan segera disalurkan.',
            [{ text: 'OK', onPress: () => (navigation as any).navigate('Main') }]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <FormHeader title="Konfirmasi Donasi" onBack={() => navigation.goBack()} />
            <StepperIndicator currentStep={2} />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <DonationSummaryDetail 
                    title={DUMMY_ORDER.title}
                    amount={DUMMY_ORDER.amount}
                    paymentMethod={DUMMY_ORDER.paymentMethod}
                    donatorName={DUMMY_ORDER.donatorName}
                    isAnonymous={DUMMY_ORDER.isAnonymous}
                />
                <PaymentWarningAlert />
                <HeroImageBanner />
            </ScrollView>

            <ConfirmationBottomBar 
                totalAmount={DUMMY_ORDER.amount}
                onCancel={() => navigation.goBack()}
                onPay={handlePay}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Colors.surface, position: 'relative' },
    scrollContainer: { paddingBottom: 120 },
});
export default KonfirmasiDonasiScreen;
