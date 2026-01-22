import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenWrapper from '../../src/components/layout/ScreenWrapper';
import PrimaryButton from '../../src/components/ui/PrimaryButton';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { Typography } from '../../src/constants/typography';

export default function Slide1() {
    const router = useRouter();

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.content}>
                <View style={styles.imagePlaceholder}>
                    <Text style={styles.imageText}>Illustration: Student Learning</Text>
                </View>
                <Text style={styles.title}>Empowering Scholars</Text>
                <Text style={styles.description}>
                    Access learning materials and assessments designed for the Filipino student.
                </Text>

                <View style={styles.dotsContainer}>
                    <View style={[styles.dot, styles.activeDot]} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                </View>
            </View>

            <View style={styles.actions}>
                <PrimaryButton
                    title="Next"
                    onPress={() => router.push('/(onboarding)/slide2')}
                />
                <PrimaryButton
                    title="Skip"
                    variant="outline"
                    onPress={() => router.push('/(onboarding)/role-selection')}
                    style={styles.skipButton}
                />
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
    },
    imagePlaceholder: {
        width: '100%',
        maxWidth: 350,
        height: 250,
        backgroundColor: Colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        marginBottom: Spacing.xl,
        alignSelf: 'center',
    },
    imageText: {
        color: Colors.textSecondary,
    },
    title: {
        fontSize: Typography.sizes.h1,
        fontWeight: Typography.weights.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.md,
        textAlign: 'center',
    },
    description: {
        fontSize: Typography.sizes.body,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: Spacing.xl,
        maxWidth: '80%',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Spacing.lg,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.border,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: Colors.primary,
        width: 20,
    },
    actions: {
        padding: Spacing.md,
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
    },
    skipButton: {
        marginTop: Spacing.sm,
        borderColor: 'transparent',
    },
});
