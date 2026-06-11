import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Colors, Spacing, Typography } from '../theme';

interface MessageTextAreaProps {
    onChangeMessage: (msg: string) => void;
}

const MessageTextArea: React.FC<MessageTextAreaProps> = ({ onChangeMessage }) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Pesan atau Doa</Text>
            <TextInput 
                style={[styles.textArea, isFocused && styles.textAreaFocused]}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Tuliskan pesan atau doa terbaikmu untuk saudara kita..."
                placeholderTextColor={Colors.textMuted}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                onChangeText={onChangeMessage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: Spacing.xl },
    sectionTitle: { ...Typography.h3, color: Colors.textPrimary, marginBottom: Spacing.sm },
    textArea: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F1F5F9', borderRadius: 16, padding: Spacing.md, minHeight: 120, ...Typography.body, color: Colors.textPrimary },
    textAreaFocused: { borderColor: Colors.primary, backgroundColor: '#F8FAFC' },
});
export default MessageTextArea;
