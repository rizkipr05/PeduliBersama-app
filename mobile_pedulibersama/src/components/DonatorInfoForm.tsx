import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch } from 'react-native';
import { Colors, Spacing, Typography } from '../theme';

interface DonatorInfoFormProps {
    onChangeName: (name: string) => void;
    onChangeAnonymous: (isAnonymous: boolean) => void;
}

const DonatorInfoForm: React.FC<DonatorInfoFormProps> = ({ onChangeName, onChangeAnonymous }) => {
    const [isAnonymous, setIsAnonymous] = useState(false);

    const handleToggle = (val: boolean) => {
        setIsAnonymous(val);
        onChangeAnonymous(val);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Informasi Donatur</Text>
            
            <View style={styles.card}>
                <Text style={styles.label}>NAMA DONATUR (OPSIONAL)</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Masukkan nama Anda"
                    placeholderTextColor={Colors.textMuted}
                    onChangeText={onChangeName}
                />
                
                <View style={styles.toggleRow}>
                    <View style={styles.toggleTextContainer}>
                        <Text style={styles.toggleTitle}>Donasi sebagai Anonim</Text>
                        <Text style={styles.toggleDesc}>Nama Anda tidak akan ditampilkan publik</Text>
                    </View>
                    <Switch 
                        value={isAnonymous}
                        onValueChange={handleToggle}
                        trackColor={{ false: '#E5E7EB', true: '#A7F3D0' }}
                        thumbColor={isAnonymous ? Colors.primary : '#FFFFFF'}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: Spacing.xl },
    sectionTitle: { ...Typography.h3, color: Colors.textPrimary, marginBottom: Spacing.sm },
    card: { backgroundColor: '#F8FAFC', padding: Spacing.md, borderRadius: 16 },
    label: { ...Typography.caption, color: Colors.textMuted, fontSize: 10, fontWeight: '700', marginBottom: Spacing.xs },
    input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F1F5F9', borderRadius: 12, paddingHorizontal: Spacing.md, height: 50, ...Typography.body, color: Colors.textPrimary, marginBottom: Spacing.md },
    toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    toggleTextContainer: { flex: 1, paddingRight: Spacing.md },
    toggleTitle: { ...Typography.body, color: Colors.textPrimary, fontWeight: '600', fontSize: 13, marginBottom: 2 },
    toggleDesc: { ...Typography.caption, color: Colors.textMuted, fontSize: 10 },
});
export default DonatorInfoForm;
