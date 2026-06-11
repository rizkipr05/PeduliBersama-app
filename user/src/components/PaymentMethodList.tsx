import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Building2, QrCode, Wallet } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

interface PaymentMethodListProps {
    onSelect: (method: string) => void;
}

const METHODS = [
    { id: 'bank', label: 'Transfer Bank', icon: Building2 },
    { id: 'qris', label: 'QRIS', icon: QrCode },
    { id: 'gopay', label: 'GoPay', icon: Wallet },
    { id: 'ovo', label: 'OVO', icon: Wallet },
];

const PaymentMethodList: React.FC<PaymentMethodListProps> = ({ onSelect }) => {
    const [selected, setSelected] = useState<string>('bank');

    const handleSelect = (id: string) => {
        setSelected(id);
        onSelect(id);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
            
            <View style={styles.list}>
                {METHODS.map((method) => {
                    const Icon = method.icon;
                    const isSelected = selected === method.id;
                    return (
                        <TouchableOpacity 
                            key={method.id} 
                            style={[styles.item, isSelected && styles.itemSelected]}
                            onPress={() => handleSelect(method.id)}
                        >
                            <View style={[styles.iconWrapper, isSelected && { backgroundColor: '#ECFDF5' }]}>
                                <Icon size={16} color={isSelected ? Colors.primary : Colors.textPrimary} />
                            </View>
                            <Text style={styles.label}>{method.label}</Text>
                            
                            <View style={[styles.radio, isSelected && styles.radioSelected]}>
                                {isSelected && <View style={styles.radioInner} />}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: Spacing.xl },
    sectionTitle: { ...Typography.h3, color: Colors.textPrimary, marginBottom: Spacing.sm },
    list: { gap: Spacing.sm },
    item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: Spacing.md, borderRadius: 12, borderWidth: 1, borderColor: '#F1F5F9' },
    itemSelected: { borderColor: Colors.primary, borderWidth: 1.5, backgroundColor: '#F8FAFC' },
    iconWrapper: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', marginRight: Spacing.md },
    label: { flex: 1, ...Typography.body, color: Colors.textPrimary, fontWeight: '600' },
    radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center' },
    radioSelected: { borderColor: Colors.primary },
    radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },
});
export default PaymentMethodList;
