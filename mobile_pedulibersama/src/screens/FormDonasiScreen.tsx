import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Spacing } from '../theme';

import FormHeader from '../components/FormHeader';
import DonationSummaryCard from '../components/DonationSummaryCard';
import NominalSelector from '../components/NominalSelector';
import PaymentMethodList from '../components/PaymentMethodList';
import DonatorInfoForm from '../components/DonatorInfoForm';
import MessageTextArea from '../components/MessageTextArea';
import DonationBottomBar from '../components/DonationBottomBar';

const FormDonasiScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const { disasterId, title, imageUrl } = route.params || {
        disasterId: 1, title: 'Bencana Tidak Diketahui', imageUrl: require('../assets/OIP.jpg')
    };
    const [amount, setAmount] = useState<number>(10000);
    const [paymentMethod, setPaymentMethod] = useState<string>('bank');
    const [donatorName, setDonatorName] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [message, setMessage] = useState('');

    const handleContinue = () => {
        if (amount < 10000) {
            Alert.alert('Error', 'Minimal donasi adalah Rp 10.000');
            return;
        }
        (navigation as any).navigate('KonfirmasiDonasi', {
            disasterId,
            title,
            imageUrl,
            amount,
            paymentMethod,
            donatorName: donatorName || 'Hamba Allah',
            isAnonymous
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <FormHeader title="Donasi" onBack={() => navigation.goBack()} />
            <KeyboardAvoidingView 
                style={styles.flex} 
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer} 
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                >
                <DonationSummaryCard 
                    imageUrl={imageUrl}
                    title={title}
                    location={'Lokasi Bencana'}
                    isEmergency={true}
                />
                <NominalSelector onSelect={setAmount} />
                <PaymentMethodList onSelect={setPaymentMethod} />
                <DonatorInfoForm 
                    onChangeName={setDonatorName} 
                    onChangeAnonymous={setIsAnonymous} 
                />
                <MessageTextArea onChangeMessage={setMessage} />
            </ScrollView>

            <DonationBottomBar 
                totalAmount={amount} 
                onContinue={handleContinue} 
            />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Colors.surface, position: 'relative' },
    flex: { flex: 1 },
    scrollContainer: { padding: Spacing.md, paddingBottom: 100 },
});
export default FormDonasiScreen;
