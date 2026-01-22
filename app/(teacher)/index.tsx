import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../src/components/layout/ScreenWrapper';
import Card from '../../src/components/ui/Card';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { Typography } from '../../src/constants/typography';

const QuickActionCard = ({ title, icon, color, onPress }: { title: string, icon: any, color: string, onPress: () => void }) => (
    <Card style={styles.actionCard} onPress={onPress}>
        <View style={[styles.actionIconContainer, { backgroundColor: color + '15' }]}>
            <Ionicons name={icon} size={22} color={color} />
        </View>
        <Text style={styles.actionTitle}>{title}</Text>
    </Card>
);

const ReminderItem = ({ title, description, icon, color }: { title: string, description: string, icon: any, color: string }) => (
    <View style={styles.reminderItem}>
        <View style={[styles.reminderIcon, { backgroundColor: color + '10' }]}>
            <Ionicons name={icon} size={16} color={color} />
        </View>
        <View style={styles.reminderTextContainer}>
            <Text style={styles.reminderTitle}>{title}</Text>
            <Text style={styles.reminderDesc}>{description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={14} color="#9CA3AF" />
    </View>
);

export default function TeacherOverview() {
    const router = useRouter();

    return (
        <ScreenWrapper scrollable>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.welcomeText}>Mabuhay,</Text>
                    <Text style={styles.nameText}>Teacher Ken</Text>
                    <Text style={styles.subHeaderText}>SY 2025-2026 • First Semester</Text>
                </View>
                <TouchableOpacity style={styles.profileAvatar}>
                    <View style={styles.avatarCircle}>
                        <Ionicons name="person" size={24} color="#D1D5DB" />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Quick Actions */}
            <View style={styles.actionsGrid}>
                <QuickActionCard
                    title="Create Class"
                    icon="add"
                    color="#3B82F6"
                    onPress={() => { }}
                />
                <QuickActionCard
                    title="Create Test"
                    icon="document-text"
                    color="#10B981"
                    onPress={() => router.push('/(teacher)/assessments/create')}
                />
                <QuickActionCard
                    title="Reports"
                    icon="bar-chart"
                    color="#8B5CF6"
                    onPress={() => router.push('/(teacher)/reports')}
                />
            </View>

            {/* Summary Widgets */}
            <View style={styles.statsRow}>
                <Card style={styles.statBox} variant="outlined">
                    <Text style={styles.statVal}>6</Text>
                    <Text style={styles.statLab}>Active Classes</Text>
                </Card>
                <Card style={styles.statBox} variant="outlined">
                    <Text style={styles.statVal}>4</Text>
                    <Text style={styles.statLab}>Ongoing Tests</Text>
                </Card>
            </View>

            {/* Reminders Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Reminders</Text>
                <Card style={styles.reminderCard}>
                    <ReminderItem
                        title="Pending Assessments"
                        description="3 quizzes need manual checking"
                        icon="time"
                        color="#F59E0B"
                    />
                    <View style={styles.divider} />
                    <ReminderItem
                        title="Missing Submissions"
                        description="12 students haven't complied"
                        icon="alert-circle"
                        color="#EF4444"
                    />
                </Card>
            </View>

            <View style={styles.footerSpacer} />
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xl,
        paddingTop: Platform.OS === 'ios' ? Spacing.sm : Spacing.md,
    },
    welcomeText: {
        fontSize: Typography.sizes.body,
        color: '#6B7280',
        fontWeight: '500',
    },
    nameText: {
        fontSize: 32,
        fontWeight: '800',
        color: '#111827',
        letterSpacing: -0.5,
    },
    subHeaderText: {
        fontSize: Typography.sizes.caption,
        color: Colors.primary,
        fontWeight: '700',
        marginTop: 2,
    },
    profileAvatar: {
        marginLeft: Spacing.md,
    },
    avatarCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.xl,
        gap: Spacing.md,
    },
    actionCard: {
        flex: 1,
        alignItems: 'center',
        padding: Spacing.md,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    actionIconContainer: {
        width: 42,
        height: 42,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.xs,
    },
    actionTitle: {
        fontSize: 10,
        fontWeight: '800',
        color: '#374151',
        textAlign: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        gap: Spacing.md,
        marginBottom: Spacing.xl + Spacing.sm,
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: Spacing.xl,
        backgroundColor: '#FFFFFF',
        borderColor: '#F3F4F6',
    },
    statVal: {
        fontSize: 36,
        fontWeight: '800',
        color: Colors.primary,
    },
    statLab: {
        fontSize: Typography.sizes.caption,
        color: '#6B7280',
        marginTop: 4,
        fontWeight: '600',
    },
    section: {
        marginBottom: Spacing.xl,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#111827',
        marginBottom: Spacing.md,
    },
    reminderCard: {
        padding: 0,
        backgroundColor: '#FFFFFF',
    },
    reminderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
    },
    reminderIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    reminderTextContainer: {
        flex: 1,
    },
    reminderTitle: {
        fontSize: Typography.sizes.body,
        fontWeight: '700',
        color: '#111827',
    },
    reminderDesc: {
        fontSize: Typography.sizes.caption,
        color: '#6B7280',
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginHorizontal: Spacing.md,
    },
    footerSpacer: {
        height: 60,
    }
});
