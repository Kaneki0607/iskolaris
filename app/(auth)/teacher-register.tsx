import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../src/components/layout/ScreenWrapper';
import FormInput from '../../src/components/ui/FormInput';
import PrimaryButton from '../../src/components/ui/PrimaryButton';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { Typography } from '../../src/constants/typography';

export default function TeacherRegister() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        // Navigate to Teacher Dashboard
        router.replace('/(teacher)/teacher-dashboard');
    };

    return (
        <ScreenWrapper scrollable>
            <View style={styles.header}>
                <Text style={styles.title}>Teacher Registration</Text>
                <Text style={styles.subtitle}>Join the IskoLaris community</Text>
            </View>

            <View style={styles.form}>
                <FormInput
                    label="Email Address"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="teacher@deped.gov.ph"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <FormInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Create a password"
                    secureTextEntry
                />
                <FormInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm your password"
                    secureTextEntry
                />

                <PrimaryButton title="Create Account" onPress={handleRegister} style={styles.registerButton} />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.linkText}>Login</Text>
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
        paddingBottom: Spacing.xxl,
        maxWidth: 480,
        width: '100%',
        alignSelf: 'center',
    },
    linkText: {
        color: Colors.primary,
        fontWeight: Typography.weights.medium,
    },
    registerButton: {
        marginTop: Spacing.md,
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
