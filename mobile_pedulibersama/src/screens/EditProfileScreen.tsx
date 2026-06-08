import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Lock, Calendar, ChevronDown } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

import EditProfileHeader from '../components/EditProfileHeader';
import ProfileAvatarEdit from '../components/ProfileAvatarEdit';
import InputField from '../components/InputField';

const EditProfileScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('Budi Setiawan');
    const [email, setEmail] = useState('budi.setiawan@email.com');
    const [phone, setPhone] = useState('+62 812 3456 7890');
    const [dob, setDob] = useState('12 Mei 1995');
    const [gender, setGender] = useState('Laki-laki');

    const handleSave = () => {
        // Logic to save profile
        console.log("Saved!", { name, phone, dob, gender });
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <EditProfileHeader 
                onBack={() => navigation.goBack()} 
                onSave={handleSave} 
            />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <ProfileAvatarEdit 
                    imageUrl={require('../assets/OIP.jpg')} 
                    onChangePhoto={() => console.log('Change photo clicked')}
                />

                <View style={styles.formContainer}>
                    <InputField 
                        label="NAMA LENGKAP" 
                        value={name}
                        onChangeText={setName}
                        containerStyle={styles.inputContainer}
                    />

                    <InputField 
                        label="EMAIL" 
                        value={email}
                        editable={false}
                        rightIcon={<Lock color="#A0A4A8" size={18} />}
                        containerStyle={styles.inputContainer}
                        style={{ color: '#A0A4A8' }} // Dim text color for disabled effect
                    />

                    <InputField 
                        label="NOMOR TELEPON" 
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        containerStyle={styles.inputContainer}
                    />

                    <InputField 
                        label="TANGGAL LAHIR" 
                        value={dob}
                        onChangeText={setDob}
                        rightIcon={<Calendar color={Colors.primary} size={20} />}
                        containerStyle={styles.inputContainer}
                    />

                    <InputField 
                        label="JENIS KELAMIN" 
                        value={gender}
                        onChangeText={setGender}
                        rightIcon={<ChevronDown color={Colors.textPrimary} size={20} />}
                        containerStyle={styles.inputContainer}
                    />
                </View>

                {/* Bottom Button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.primaryBtn} onPress={handleSave} activeOpacity={0.8}>
                        <Text style={styles.primaryBtnText}>Simpan Perubahan</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.surface,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: Spacing.xxl,
    },
    formContainer: {
        paddingHorizontal: Spacing.lg,
    },
    inputContainer: {
        marginBottom: Spacing.md,
    },
    buttonContainer: {
        paddingHorizontal: Spacing.lg,
        marginTop: Spacing.xl,
        marginBottom: Spacing.md,
    },
    primaryBtn: {
        backgroundColor: Colors.primary,
        height: 52,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
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
});

export default EditProfileScreen;
