import React from 'react';
import { View, StyleSheet, ScrollView, Alert, Modal, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Spacing } from '../theme';

import FormHeader from '../components/FormHeader';
import StepperIndicator from '../components/StepperIndicator';
import DonationSummaryDetail from '../components/DonationSummaryDetail';
import PaymentWarningAlert from '../components/PaymentWarningAlert';
import HeroImageBanner from '../components/HeroImageBanner';
import ConfirmationBottomBar from '../components/ConfirmationBottomBar';
import { donasiApi } from '../services/api';
import { WebView } from 'react-native-webview';

const KonfirmasiDonasiScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const { disasterId, title, amount, paymentMethod, donatorName, isAnonymous } = route.params || {};

    const [loading, setLoading] = React.useState(false);
    const [paymentUrl, setPaymentUrl] = React.useState<string | null>(null);

    const handlePay = async () => {
        setLoading(true);
        try {
            const payload = {
                disasterId: Number(disasterId),
                nominal: amount,
                paymentMethod: paymentMethod === 'bank' ? 'bank_transfer' : paymentMethod,
                donorName: isAnonymous ? 'Hamba Allah' : donatorName,
                donorEmail: 'donor@example.com' // Idealnya ambil dari AsyncStorage
            };
            const res = await donasiApi.createDonation(payload);
            
            if (res.data?.data?.payment_url) {
                setPaymentUrl(res.data.data.payment_url);
            } else {
                Alert.alert('Gagal', 'Tidak ada URL pembayaran dari server.');
            }
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Gagal memproses donasi.');
        } finally {
            setLoading(false);
        }
    };

    const handleWebViewNavigationStateChange = (newNavState: any) => {
        const { url } = newNavState;
        // Jika URL mengandung kata kunci finish/success/unfinish/error dari midtrans
        if (url.includes('finish') || url.includes('success') || url.includes('settlement')) {
            setPaymentUrl(null);
            (navigation as any).navigate('DonasiBerhasil', {
                amount,
                paymentMethod,
                transactionId: `DONASI-${disasterId}-${Date.now()}` // Mock ID untuk receipt
            });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <FormHeader title="Konfirmasi Donasi" onBack={() => navigation.goBack()} />
            <StepperIndicator currentStep={2} />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <DonationSummaryDetail 
                    title={title}
                    amount={amount}
                    paymentMethod={paymentMethod}
                    donatorName={isAnonymous ? 'Hamba Allah' : donatorName}
                    isAnonymous={isAnonymous}
                />
                <PaymentWarningAlert />
                <HeroImageBanner />
            </ScrollView>

            <ConfirmationBottomBar 
                totalAmount={amount}
                onCancel={() => navigation.goBack()}
                onPay={handlePay}
            />

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            )}

            <Modal visible={!!paymentUrl} animationType="slide" onRequestClose={() => setPaymentUrl(null)}>
                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setPaymentUrl(null)}>
                            <Text style={styles.closeText}>Tutup & Cek Nanti</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Pembayaran</Text>
                    </View>
                    {paymentUrl && (
                        <WebView 
                            source={{ uri: paymentUrl }} 
                            style={{ flex: 1 }}
                            onNavigationStateChange={handleWebViewNavigationStateChange}
                        />
                    )}
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Colors.surface, position: 'relative' },
    scrollContainer: { paddingBottom: 120 },
    loadingOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
    modalHeader: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md, borderBottomWidth: 1, borderColor: Colors.border },
    closeText: { color: Colors.error, fontWeight: 'bold' },
    modalTitle: { flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginRight: 60 }
});
export default KonfirmasiDonasiScreen;
