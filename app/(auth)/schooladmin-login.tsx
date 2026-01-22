import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../src/components/layout/ScreenWrapper';
import FormInput from '../../src/components/ui/FormInput';
import PrimaryButton from '../../src/components/ui/PrimaryButton';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { Typography } from '../../src/constants/typography';

export default function SchoolAdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        router.replace('/(schooladmin)');
    };

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <Text style={styles.title}>Admin Login</Text>
                <Text style={styles.subtitle}>Manage your institution</Text>
            </View>

            <View style={styles.form}>
                <FormInput
                    label="Email Address"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="admin@school.edu.ph"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <FormInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    secureTextEntry
                />

                <View style={styles.forgotPasswordContainer}>
                    <TouchableOpacity>
                        <Text style={styles.linkText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <PrimaryButton title="Login" onPress={handleLogin} style={styles.loginButton} />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/schooladmin-register')}>
                        <Text style={styles.linkText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: Spacing.xl,
        marginBottom: Spacing.xl,
    },
    title: {
        fontSize: Typography.sizes.hero,
        fontWeight: Typography.weights.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
    },
    subtitle: {
        fontSize: Typography.sizes.body,
        color: Colors.textSecondary,
    },
    form: {
        flex: 1,
        maxWidth: 480,
        width: '100%',
        alignSelf: 'center',
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginBottom: Spacing.lg,
    },
    linkText: {
        color: Colors.primary,
        fontWeight: Typography.weights.medium,
    },
    loginButton: {
        marginBottom: Spacing.lg,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Spacing.md,
    },
    footerText: {
        color: Colors.textSecondary,
    },
});
