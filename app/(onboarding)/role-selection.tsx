import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../src/components/layout/ScreenWrapper';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { Typography } from '../../src/constants/typography';

const roles = [
    { id: 'student', title: 'Student', description: 'Take assessments and view grades', route: '/(auth)/student-login' },
    { id: 'teacher', title: 'Teacher', description: 'Manage classes and create quizzes', route: '/(auth)/teacher-login' },
    { id: 'parent', title: 'Parent', description: 'Monitor child progress', route: '/(auth)/parent-login' },
    { id: 'schooladmin', title: 'School Admin', description: 'Manage school settings', route: '/(auth)/schooladmin-login' },
];

export default function RoleSelection() {
    const router = useRouter();

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <Text style={styles.title}>Choose your Role</Text>
                <Text style={styles.subtitle}>Select how you will use IskoLaris</Text>
            </View>

            <View style={styles.grid}>
                {roles.map((role) => (
                    <TouchableOpacity
                        key={role.id}
                        style={styles.card}
                        onPress={() => router.push(role.route as any)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.iconPlaceholder}>
                            <Text style={styles.iconText}>{role.title[0]}</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{role.title}</Text>
                            <Text style={styles.cardDescription}>{role.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: Spacing.xl,
        marginBottom: Spacing.xxl,
        paddingHorizontal: Spacing.md,
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
    grid: {
        paddingHorizontal: Spacing.md,
        gap: Spacing.md,
        maxWidth: 600,
        width: '100%',
        alignSelf: 'center',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        padding: Spacing.md,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    iconPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    iconText: {
        color: Colors.surface,
        fontSize: Typography.sizes.h2,
        fontWeight: 'bold',
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: Typography.sizes.h3,
        fontWeight: Typography.weights.bold,
        color: Colors.textPrimary,
        marginBottom: 2,
    },
    cardDescription: {
        fontSize: Typography.sizes.caption,
        color: Colors.textSecondary,
    },
});
