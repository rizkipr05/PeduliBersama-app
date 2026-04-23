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
import { Mail, Lock } from 'lucide-react-native';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { Colors, Spacing, Typography } from '../theme';

interface LoginScreenProps {
    navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const handleLogin = () => {
        const newErrors: { email?: string; password?: string } = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            newErrors.email = 'Email tidak boleh kosong';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Format email tidak valid';
        }

        if (!password) {
            newErrors.password = 'Password tidak boleh kosong';
        } else if (password.length < 8) {
            newErrors.password = 'Password minimal 8 karakter';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        // TODO Week 1: POST /auth/login
        // const res = await authApi.login({ email, password })
        // await saveToken(res.data.access_token)
        // navigation.replace('Main')
        console.log('login:', { email, password });
    };

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>

                {/* Logo Row */}
                <View style={styles.logoRow}>
                    <View style={styles.logoBox}>
                        <Text style={styles.logoEmoji}>🌿</Text>
                    </View>
                    <Text style={styles.logoText}>PeduliBersama</Text>
                </View>

                {/* Welcome */}
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeTitle}>Selamat Datang</Text>
                    <Text style={styles.welcomeSubtitle}>Masuk untuk melanjutkan</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <InputField
                        label="Email"
                        placeholder="nama@email.com"
                        leftIcon={<Mail size={20} color={Colors.textMuted} />}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={text => {
                            setEmail(text);
                            if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                        }}
                        error={errors.email}
                    />

                    <InputField
                        label="Password"
                        placeholder="Masukkan password"
                        leftIcon={<Lock size={20} color={Colors.textMuted} />}
                        isPassword
                        value={password}
                        onChangeText={text => {
                            setPassword(text);
                            if (errors.password)
                                setErrors(prev => ({ ...prev, password: undefined }));
                        }}
                        error={errors.password}
                    />

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotText}>Lupa Password?</Text>
                    </TouchableOpacity>
                </View>

                {/* Primary Button */}
                <Button label="Masuk" onPress={handleLogin} loading={loading} />

                {/* Divider */}
                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>atau</Text>
                    <View style={styles.dividerLine} />
                </View>

                {/* Google Button */}
                <Button
                    label="Masuk dengan Google"
                    onPress={() => console.log('google login')}
                    variant="secondary"
                />

                {/* Register Link */}
                <View style={styles.registerRow}>
                    <Text style={styles.registerText}>Belum punya akun? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.registerLink}>Daftar</Text>
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
        paddingTop: Spacing.xxl,
        paddingBottom: Spacing.xl,
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.xl,
    },
    logoBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.sm,
    },
    logoEmoji: {
        fontSize: 18,
    },
    logoText: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.primary,
    },
    welcomeSection: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    welcomeTitle: {
        ...Typography.h2,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
    },
    welcomeSubtitle: {
        ...Typography.body,
        color: Colors.textMuted,
    },
    form: {
        gap: 16,
        marginBottom: Spacing.md,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
    },
    forgotText: {
        ...Typography.bodyMd,
        color: Colors.primary,
        fontSize: 14,
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
    registerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Spacing.lg,
    },
    registerText: {
        ...Typography.body,
        color: Colors.textMuted,
    },
    registerLink: {
        ...Typography.body,
        color: Colors.primary,
        fontWeight: '700',
    },
});

export default LoginScreen;