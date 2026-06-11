import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../theme';

interface FormHeaderProps {
    title: string;
    onBack: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, onBack }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <ArrowLeft color={Colors.primary} size={24} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <View style={{ width: 24 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', backgroundColor: '#FFFFFF' },
    backButton: { padding: 4 },
    title: { ...Typography.h3, color: Colors.primary },
});
export default FormHeader;
