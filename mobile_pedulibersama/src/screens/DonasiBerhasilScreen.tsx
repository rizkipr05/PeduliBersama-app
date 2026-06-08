import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Typography } from '../theme';
import { Download } from 'lucide-react-native';
import SuccessHeader from '../components/SuccessHeader';
import DonationReceiptCard from '../components/DonationReceiptCard';
import ShareDonation from '../components/ShareDonation';

const DonasiBerhasilScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <SuccessHeader />
                <DonationReceiptCard 
                    transactionId="PB-20231105-0881"
                    disasterTitle="Erupsi Gunung Semeru"
                    paymentMethod="DANA Balance"
                    amount={250000}
                />

                <TouchableOpacity 
                    style={styles.primaryBtn} 
                    onPress={() => (navigation as any).navigate('Main')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.primaryBtnText}>Kembali ke Beranda</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.outlineBtn}
                    activeOpacity={0.7}
                >
                    <Download color={Colors.textPrimary} size={18} style={styles.dlIcon} />
                    <Text style={styles.outlineBtnText}>Unduh Bukti Donasi</Text>
                </TouchableOpacity>

                <ShareDonation />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.surface,
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: Spacing.md,
        paddingBottom: Spacing.xxl,
    },
    primaryBtn: {
        backgroundColor: Colors.primary,
        height: 52,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.sm,
        elevation: 2,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    primaryBtnText: {
        ...Typography.button,
        color: Colors.white,
    },
    outlineBtn: {
        flexDirection: 'row',
        height: 52,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.surface,
    },
    dlIcon: {
        marginRight: Spacing.sm,
    },
    outlineBtnText: {
        ...Typography.button,
        color: Colors.textPrimary,
    },
});

export default DonasiBerhasilScreen;
