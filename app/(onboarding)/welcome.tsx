import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import ScreenWrapper from '../../src/components/layout/ScreenWrapper';
import PrimaryButton from '../../src/components/ui/PrimaryButton';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { Typography } from '../../src/constants/typography';

export default function WelcomeScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const [showInstallPopup, setShowInstallPopup] = useState(true);

    const handleGetStarted = () => {
        router.push('/(onboarding)/slide1');
    };

    const isDesktop = width >= 768;

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.content}>
                <View style={[styles.logoPlaceholder, styles.shadow]}>
                    <Text style={styles.logoText}>IL</Text>
                </View>
                <Text style={styles.appName}>Welcome to IskoLaris!</Text>
                <Text style={styles.subtitle}>A Scholar-Centered Learning Platform</Text>

                <View style={styles.buttonContainer}>
                    <PrimaryButton
                        title="Get Started"
                        onPress={handleGetStarted}
                        style={styles.pillButton}
                    />
                    <TouchableOpacity onPress={() => router.push('/(onboarding)/role-selection')} style={styles.skipButton}>
                        <Text style={styles.skipText}>Skip Introduction</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {showInstallPopup && (
                <View style={[styles.installPopup, styles.shadow, isDesktop && styles.installPopupDesktop]}>
                    <View style={styles.popupContent}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="download-outline" size={24} color="white" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.popupTitle}>Install IskoLaris!</Text>
                            <Text style={styles.popupSubtitle}>Install our app for a better experience</Text>
                        </View>
                    </View>
                    <View style={styles.popupActions}>
                        <TouchableOpacity onPress={() => setShowInstallPopup(false)} style={styles.closeIcon}>
                            <Ionicons name="close" size={20} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.installButton}>
                            <Text style={styles.installButtonText}>Install</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.xxl * 2, // Make room for popup
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    logoPlaceholder: {
        width: 120,
        height: 120,
        backgroundColor: Colors.primary, // Using primary blue instead of black for brand consistency, or could use black as requested
        borderRadius: 60, // Circle
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    logoText: {
        color: Colors.surface,
        fontSize: 48,
        fontWeight: 'bold',
    },
    appName: {
        fontSize: Typography.sizes.hero,
        fontWeight: Typography.weights.bold,
        color: Colors.textPrimary, // Or black
        marginBottom: Spacing.sm,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: Typography.sizes.body,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Spacing.xxl,
        maxWidth: 300,
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 300,
        alignItems: 'center',
    },
    pillButton: {
        borderRadius: 100, // Pill shape
        width: '100%',
        height: 56,
    },
    skipButton: {
        marginTop: Spacing.md,
        padding: Spacing.sm,
    },
    skipText: {
        color: Colors.textSecondary,
        fontSize: Typography.sizes.body,
    },
    // Popup Styles
    installPopup: {
        position: 'absolute',
        bottom: Spacing.md,
        left: Spacing.md,
        right: Spacing.md,
        backgroundColor: 'black',
        borderRadius: 12,
        padding: Spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 50,
    },
    installPopupDesktop: {
        left: '50%',
        right: 'auto',
        transform: [{ translateX: -200 }], // Center roughly based on width
        width: 400, // max-w-md
    },
    popupContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    textContainer: {
        flex: 1,
    },
    popupTitle: {
        color: 'white',
        fontWeight: '600',
        fontSize: Typography.sizes.body,
    },
    popupSubtitle: {
        color: '#D1D5DB', // gray-300
        fontSize: Typography.sizes.small,
    },
    popupActions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: Spacing.md,
    },
    closeIcon: {
        padding: Spacing.xs,
        marginRight: Spacing.sm,
    },
    installButton: {
        backgroundColor: '#3B82F6', // blue-500
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs + 2,
        borderRadius: 8,
    },
    installButtonText: {
        color: 'white',
        fontWeight: '600',
    },
});
