import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../../src/components/layout/ScreenWrapper';
import Card from '../../../src/components/ui/Card';
import StatusBadge from '../../../src/components/ui/StatusBadge';
import { Colors } from '../../../src/constants/colors';
import { Spacing } from '../../../src/constants/spacing';
import { Typography } from '../../../src/constants/typography';

const MOCK_CLASSES = [
    { id: '1', name: 'Grade 10 - Rizal', subject: 'Mathematics', students: 45, section: 'A', status: 'Active' },
    { id: '2', name: 'Grade 10 - Bonifacio', subject: 'Mathematics', students: 42, section: 'B', status: 'Active' },
    { id: '3', name: 'Grade 9 - Mabini', subject: 'Algebra', students: 38, section: 'A', status: 'Closed' },
];

export default function ClassManagement() {
    const router = useRouter();
    const [showInactive, setShowInactive] = useState(false);

    const activeClasses = MOCK_CLASSES.filter(c => c.status === 'Active');
    const inactiveClasses = MOCK_CLASSES.filter(c => c.status === 'Closed');

    const renderClassCard = (item: typeof MOCK_CLASSES[0]) => (
        <Card
            key={item.id}
            style={styles.card}
            onPress={() => router.push(`/(teacher)/classes/${item.id}`)}
        >
            <View style={styles.cardHeader}>
                <View style={styles.flex}>
                    <Text style={styles.className}>{item.name}</Text>
                    <Text style={styles.subjectName}>{item.subject} • Section {item.section}</Text>
                </View>
                <StatusBadge
                    label={item.status}
                    type={item.status === 'Active' ? 'success' : 'neutral'}
                />
            </View>

            <View style={styles.cardFooter}>
                <View style={styles.footerInfo}>
                    <Ionicons name="people-outline" size={16} color={Colors.textSecondary} />
                    <Text style={styles.footerText}>{item.students} Students</Text>
                </View>
                <View style={styles.cardActions}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Ionicons name="create-outline" size={18} color={Colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Ionicons name="lock-closed-outline" size={18} color={Colors.textSecondary} />
                    </TouchableOpacity>
                </View>
            </View>
        </Card>
    );

    return (
        <ScreenWrapper scrollable>
            <View style={styles.header}>
                <Text style={styles.title}>My Classes</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <Text style={styles.groupTitle}>Active Classes</Text>
            {activeClasses.map(renderClassCard)}

            <TouchableOpacity
                style={styles.collapseHeader}
                onPress={() => setShowInactive(!showInactive)}
            >
                <Text style={styles.collapseTitle}>Inactive Classes ({inactiveClasses.length})</Text>
                <Ionicons
                    name={showInactive ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={Colors.textSecondary}
                />
            </TouchableOpacity>

            {showInactive && inactiveClasses.map(renderClassCard)}

            <View style={styles.contentPadding} />
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
    title: {
        fontSize: Typography.sizes.h1,
        fontWeight: Typography.weights.bold,
        color: Colors.textPrimary,
    },
    addButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    groupTitle: {
        fontSize: Typography.sizes.body,
        fontWeight: '700',
        color: Colors.textSecondary,
        marginBottom: Spacing.md,
        textTransform: 'uppercase',
    },
    card: {
        marginBottom: Spacing.md,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.md,
    },
    flex: {
        flex: 1,
    },
    className: {
        fontSize: Typography.sizes.h3,
        fontWeight: Typography.weights.bold,
        color: Colors.textPrimary,
    },
    subjectName: {
        fontSize: Typography.sizes.caption,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingTop: Spacing.md,
    },
    footerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    footerText: {
        fontSize: Typography.sizes.small,
        color: Colors.textSecondary,
    },
    cardActions: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    iconBtn: {
        padding: 4,
    },
    collapseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.lg,
        marginTop: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    collapseTitle: {
        fontSize: Typography.sizes.body,
        fontWeight: '600',
        color: Colors.textSecondary,
    },
    contentPadding: {
        height: Spacing.xxl,
    },
});
