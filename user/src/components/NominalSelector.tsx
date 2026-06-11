import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Colors, Spacing, Typography } from '../theme';

interface NominalSelectorProps {
    onSelect: (amount: number) => void;
}

const NOMINALS = [10000, 25000, 50000, 100000];

const NominalSelector: React.FC<NominalSelectorProps> = ({ onSelect }) => {
    const [selected, setSelected] = useState<number>(10000);
    const [customAmount, setCustomAmount] = useState<string>('');

    const handleSelect = (amount: number) => {
        setSelected(amount);
        setCustomAmount('');
        onSelect(amount);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Nominal Donasi</Text>
                <Text style={styles.subtitle}>Pilih jumlah</Text>
            </View>
            
            <View style={styles.grid}>
                {NOMINALS.map((nom) => (
                    <TouchableOpacity 
                        key={nom} 
                        style={[styles.chip, selected === nom && styles.chipSelected]}
                        onPress={() => handleSelect(nom)}
                    >
                        <Text style={[styles.currencyText, selected === nom && styles.textSelected]}>Rp</Text>
                        <Text style={[styles.amountText, selected === nom && styles.textSelected]}>{(nom / 1000).toFixed(0)}.000</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.customInputContainer}>
                <Text style={styles.currencyPrefix}>Rp</Text>
                <TextInput 
                    style={styles.customInput}
                    placeholder="Nominal lainnya"
                    placeholderTextColor={Colors.textMuted}
                    keyboardType="numeric"
                    value={customAmount}
                    onChangeText={(val) => {
                        setCustomAmount(val);
                        setSelected(0);
                        onSelect(Number(val) || 0);
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: Spacing.xl },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
    title: { ...Typography.h3, color: Colors.textPrimary },
    subtitle: { ...Typography.caption, color: Colors.primary, fontWeight: '600' },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    chip: { width: '48%', backgroundColor: '#FFFFFF', paddingVertical: Spacing.md, borderRadius: 12, borderWidth: 1, borderColor: '#F1F5F9', alignItems: 'center', marginBottom: Spacing.sm },
    chipSelected: { borderColor: Colors.primary, backgroundColor: '#ECFDF5' },
    currencyText: { ...Typography.caption, color: Colors.textMuted, fontSize: 10, marginBottom: 2 },
    amountText: { ...Typography.body, color: Colors.textPrimary, fontWeight: '700' },
    textSelected: { color: Colors.primary },
    customInputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', borderRadius: 12, paddingHorizontal: Spacing.md, height: 50, marginTop: Spacing.xs },
    currencyPrefix: { ...Typography.body, color: Colors.textPrimary, fontWeight: '700', marginRight: Spacing.sm },
    customInput: { flex: 1, ...Typography.body, color: Colors.textPrimary },
});
export default NominalSelector;
