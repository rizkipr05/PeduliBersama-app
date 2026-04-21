import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { Colors, Spacing, Typography } from '../theme';

interface RegisterScreenProps {
    navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{
        fullName?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
    }>({});

    const updateForm = (key: string, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
        if (errors[key as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [key]: undefined }));
        }
    };

    const handleRegister = () => {
        const newErrors: typeof errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.fullName) newErrors.fullName = 'Nama lengkap tidak boleh kosong';
        if (!form.email) {
            newErrors.email = 'Email tidak boleh kosong';
        } else if (!emailRegex.test(form.email)) {
            newErrors.email = 'Format email tidak valid';
        }
        if (!form.password) {
            newErrors.password = 'Password tidak boleh kosong';
        } else if (form.password.length < 8) {
            newErrors.password = 'Password minimal 8 karakter';
        }
        if (!form.confirmPassword) {
            newErrors.confirmPassword = 'Konfirmasi password tidak boleh kosong';
        } else if (form.confirmPassword !== form.password) {
            newErrors.confirmPassword = 'Password tidak sama';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        // TODO Week 1: POST /auth/register
        // await authApi.register({ name: form.fullName, email: form.email, password: form.password })
        // navigation.navigate('Login')
        console.log('register:', form);
    };

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>

                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>

                {/* Title */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Buat Akun</Text>
                    <Text style={styles.subtitle}>Bergabung dan mulai berdonasi</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <InputField
                        label="Nama Lengkap"
                        placeholder="Nama Lengkap"
                        leftIcon={<Text style={styles.icon}>👤</Text>}
                        autoCapitalize="words"
                        value={form.fullName}
                        onChangeText={text => updateForm('fullName', text)}
                        error={errors.fullName}
                    />

                    <InputField
                        label="Email"
                        placeholder="Email"
                        leftIcon={<Text style={styles.icon}>✉</Text>}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={form.email}
                        onChangeText={text => updateForm('email', text)}
                        error={errors.email}
                    />

                    <InputField
                        label="Password"
                        placeholder="Password"
                        leftIcon={<Text style={styles.icon}>🔒</Text>}
                        isPassword
                        value={form.password}
                        onChangeText={text => updateForm('password', text)}
                        error={errors.password}
                    />

                    <InputField
                        label="Konfirmasi Password"
                        placeholder="Konfirmasi Password"
                        leftIcon={<Text style={styles.icon}>🔒</Text>}
                        isPassword
                        value={form.confirmPassword}
                        onChangeText={text => updateForm('confirmPassword', text)}
                        error={errors.confirmPassword}
                    />
                </View>

                {/* Primary Button */}
                <Button
                    label="Daftar Sekarang"
                    onPress={handleRegister}
                    loading={loading}
                />

                {/* Divider */}
                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>atau</Text>
                    <View style={styles.dividerLine} />
                </View>

                {/* Google Button */}
                <Button
                    label="Daftar dengan Google"
                    onPress={() => console.log('google register')}
                    variant="secondary"
                />

                {/* Login Link */}
                <View style={styles.loginRow}>
                    <Text style={styles.loginText}>Sudah punya akun? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>Masuk</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: Colors.surface,
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: Spacing.md,
        paddingTop: Spacing.lg,
        paddingBottom: Spacing.xl,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e1e8fd',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.lg,
    },
    backIcon: {
        fontSize: 18,
        color: Colors.textPrimary,
    },
    titleSection: {
        marginBottom: Spacing.xl,
    },
    title: {
        ...Typography.h2,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
    },
    subtitle: {
        ...Typography.body,
        color: Colors.textMuted,
    },
    form: {
        gap: 16,
        marginBottom: Spacing.md,
    },
    icon: {
        fontSize: 16,
        color: Colors.textMuted,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Spacing.lg,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.border,
        opacity: 0.4,
    },
    dividerText: {
        ...Typography.caption,
        color: Colors.textMuted,
        marginHorizontal: Spacing.sm,
    },
    loginRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Spacing.lg,
    },
    loginText: {
        ...Typography.body,
        color: Colors.textMuted,
    },
    loginLink: {
        ...Typography.body,
        color: Colors.primary,
        fontWeight: '700',
    },
});

export default RegisterScreen;