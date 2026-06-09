import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Spacing, Typography } from '../theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
    label: string;
    onPress: () => void;
    variant?: ButtonVariant;
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    accessibilityLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    fullWidth = true,
    style,
    textStyle,
    accessibilityLabel,
}) => {
    if (variant === 'primary') {
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled || loading}
                style={[fullWidth && styles.fullWidth, style]}
                activeOpacity={0.85}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={accessibilityLabel || label}
                accessibilityState={{ disabled: disabled || loading }}>
                <LinearGradient
                    colors={
                        disabled
                            ? [Colors.disabled, Colors.disabled]
                            : [Colors.primary, Colors.primaryContainer]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.button}>
                    {loading ? (
                        <ActivityIndicator color={Colors.white} />
                    ) : (
                        <Text style={[styles.primaryText, textStyle]}>{label}</Text>
                    )}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    if (variant === 'secondary') {
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled || loading}
                style={[
                    styles.button,
                    styles.secondaryButton,
                    fullWidth && styles.fullWidth,
                    style,
                ]}
                activeOpacity={0.75}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={accessibilityLabel || label}
                accessibilityState={{ disabled: disabled || loading }}>
                {loading ? (
                    <ActivityIndicator color={Colors.primary} />
                ) : (
                    <Text style={[styles.secondaryText, textStyle]}>{label}</Text>
                )}
            </TouchableOpacity>
        );
    }

    // Ghost
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[fullWidth && styles.fullWidth, style]}
            activeOpacity={0.7}>
            <Text style={[styles.ghostText, textStyle]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fullWidth: {
        width: '100%',
    },
    button: {
        height: 52,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.md,
    },
    primaryText: {
        ...Typography.button,
        color: Colors.white,
    },
    secondaryButton: {
        borderWidth: 1.5,
        borderColor: Colors.primary,
        backgroundColor: 'transparent',
    },
    secondaryText: {
        ...Typography.buttonSm,
        color: Colors.primary,
    },
    ghostText: {
        ...Typography.buttonSm,
        color: Colors.primary,
    },
});

export default Button;