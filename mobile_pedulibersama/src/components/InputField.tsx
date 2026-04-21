import React, { ReactNode, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { Colors, Spacing, Typography } from '../theme';

interface InputFieldProps extends TextInputProps {
    label?: string;
    leftIcon?: ReactNode;
    isPassword?: boolean;
    error?: string;
    containerStyle?: ViewStyle;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    leftIcon,
    isPassword = false,
    error,
    containerStyle,
    ...rest
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const getBorderColor = () => {
        if (error) return Colors.error;
        if (isFocused) return Colors.primary;
        return 'rgba(189,202,189,0.2)';
    };

    const getBorderWidth = () => {
        if (error || isFocused) return 2;
        return 1;
    };

    const getBackground = () => {
        if (isFocused) return Colors.cardBackground;
        return Colors.inputBackground;
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View
                style={[
                    styles.inputWrapper,
                    {
                        borderColor: getBorderColor(),
                        borderWidth: getBorderWidth(),
                        backgroundColor: getBackground(),
                    },
                ]}>
                {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
                <TextInput
                    style={styles.input}
                    placeholderTextColor={Colors.border}
                    secureTextEntry={isPassword && !showPassword}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...rest}
                />
                {isPassword && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.rightIcon}>
                        <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '🙈'}</Text>
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        ...Typography.label,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
    },
    inputWrapper: {
        height: 52,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
    },
    leftIcon: {
        marginRight: Spacing.sm,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: Colors.textPrimary,
        padding: 0,
    },
    rightIcon: {
        marginLeft: Spacing.sm,
        padding: 4,
    },
    eyeIcon: {
        fontSize: 16,
    },
    errorText: {
        ...Typography.caption,
        color: Colors.error,
        marginTop: Spacing.xs,
    },
});

export default InputField;