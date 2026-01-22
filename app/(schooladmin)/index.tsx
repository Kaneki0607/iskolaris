import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../src/components/layout/ScreenWrapper';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { Typography } from '../../src/constants/typography';

const features = [
    { id: 'users', title: 'Manage Users', color: '#EF4444' },
    { id: 'audit', title: 'Audit Logs', color: '#6B7280' },
    { id: 'reports', title: 'School Reports', color: '#F59E0B' },
    { id: 'settings', title: 'Settings', color: '#1E3A8A' },
];

export default function SchoolAdminDashboard() {
    const router = useRouter();

    const handleLogout = () => {
        router.replace('/(onboarding)/welcome');
    };

    return (
        <ScreenWrapper scrollable>
            <View style={styles.header}>
                <View>
                    <Text style={styles.roleLabel}>Admin Dashboard</Text>
                    <Text style={styles.welcomeText}>System Panel</Text>
                </View>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.grid}>
                {features.map((feature) => (
                    <TouchableOpacity
                        key={feature.id}
                        style={[styles.card, { borderLeftColor: feature.color }]}
                    >
                        <View style={[styles.iconPlaceholder, { backgroundColor: feature.color }]}>
                            <Text style={styles.iconText}>{feature.title[0]}</Text>
                        </View>
                        <Text style={styles.cardTitle}>{feature.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Overview</Text>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>System status normal</Text>
                </View>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xl,
        paddingTop: Spacing.md,
    },
    roleLabel: {
        fontSize: Typography.sizes.caption,
        color: Colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    welcomeText: {
        fontSize: Typography.sizes.h1,
        fontWeight: Typography.weights.bold,
        color: Colors.textPrimary,
    },
    logoutButton: {
        padding: Spacing.sm,
    },
    logoutText: {
        color: Colors.error,
        fontWeight: Typography.weights.medium,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.md,
        marginBottom: Spacing.xl,
    },
    card: {
        width: '47%',
        backgroundColor: Colors.surface,
        padding: Spacing.md,
        borderRadius: 12,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1.2,
    },
    iconPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    iconText: {
        color: Colors.surface,
        fontSize: Typography.sizes.h2,
        fontWeight: 'bold',
    },
    cardTitle: {
        fontSize: Typography.sizes.body,
        fontWeight: Typography.weights.medium,
        color: Colors.textPrimary,
    },
    section: {
        marginBottom: Spacing.lg,
    },
    sectionTitle: {
        fontSize: Typography.sizes.h3,
        fontWeight: Typography.weights.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.md,
    },
    emptyState: {
        backgroundColor: Colors.surface,
        padding: Spacing.lg,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: Colors.border,
    },
    emptyStateText: {
        color: Colors.textSecondary,
    },
});
