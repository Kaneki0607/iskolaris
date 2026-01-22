import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../src/components/layout/ScreenWrapper';
import Card from '../../src/components/ui/Card';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { Typography } from '../../src/constants/typography';

const SettingRow = ({ icon, label, onPress, destructive = false }: { icon: any, label: string, onPress?: () => void, destructive?: boolean }) => (
    <TouchableOpacity style={styles.settingRow} onPress={onPress}>
        <View style={styles.rowLeft}>
            <View style={[styles.iconBox, { backgroundColor: destructive ? '#FEE2E2' : Colors.background }]}>
                <Ionicons name={icon} size={20} color={destructive ? '#EF4444' : Colors.primary} />
            </View>
            <Text style={[styles.rowLabel, destructive && { color: '#EF4444' }]}>{label}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
    </TouchableOpacity>
);

export default function TeacherSettings() {
    const router = useRouter();

    const handleLogout = () => {
        router.replace('/(onboarding)/welcome');
    };

    return (
        <ScreenWrapper scrollable>
            <View style={styles.profileSection}>
                <View style={styles.avatar}>
                    <Ionicons name="person" size={40} color="white" />
                </View>
                <Text style={styles.userName}>Teacher Ken</Text>
                <Text style={styles.userEmail}>teacher.ken@deped.gov.ph</Text>
                <TouchableOpacity style={styles.editBtn}>
                    <Text style={styles.editBtnText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Preferences</Text>
                <Card style={styles.groupCard}>
                    <SettingRow icon="book-outline" label="Default Subject: Mathematics" />
                    <View style={styles.divider} />
                    <SettingRow icon="school-outline" label="Default Grade Level: 10" />
                    <View style={styles.divider} />
                    <SettingRow icon="notifications-outline" label="Notification Settings" />
                </Card>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account & Security</Text>
                <Card style={styles.groupCard}>
                    <SettingRow icon="lock-closed-outline" label="Change Password" />
                    <View style={styles.divider} />
                    <SettingRow icon="business-outline" label="Institution Details" />
                </Card>
            </View>

            <View style={styles.section}>
                <Card style={styles.groupCard}>
                    <SettingRow
                        icon="log-out-outline"
                        label="Sign Out"
                        destructive
                        onPress={handleLogout}
                    />
                </Card>
            </View>

            <View style={styles.footer}>
                <Text style={styles.versionText}>Iskolaris v1.0.0 (Production Build)</Text>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    profileSection: {
        alignItems: 'center',
        paddingVertical: Spacing.xl,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    userName: {
        fontSize: Typography.sizes.h2,
        fontWeight: '800',
        color: Colors.textPrimary,
    },
    userEmail: {
        fontSize: Typography.sizes.body,
        color: Colors.textSecondary,
        marginBottom: Spacing.md,
    },
    editBtn: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    editBtnText: {
        fontSize: Typography.sizes.small,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    section: {
        marginBottom: Spacing.xl,
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: '700',
        color: Colors.textSecondary,
        textTransform: 'uppercase',
        marginBottom: Spacing.sm,
        paddingHorizontal: Spacing.xs,
    },
    groupCard: {
        padding: 0,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.md,
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowLabel: {
        fontSize: Typography.sizes.body,
        fontWeight: '500',
        color: Colors.textPrimary,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginHorizontal: Spacing.md,
    },
    footer: {
        paddingVertical: Spacing.xxl,
        alignItems: 'center',
    },
    versionText: {
        fontSize: 10,
        color: Colors.textSecondary,
    },
});
