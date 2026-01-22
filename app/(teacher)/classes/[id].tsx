import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../../src/components/layout/ScreenWrapper';
import Card from '../../../src/components/ui/Card';
import StatusBadge from '../../../src/components/ui/StatusBadge';
import { Table } from '../../../src/components/ui/Table';
import { Colors } from '../../../src/constants/colors';
import { Spacing } from '../../../src/constants/spacing';
import { Typography } from '../../../src/constants/typography';

const TABS = ['Students', 'Assessments', 'Performance'];

const MOCK_STUDENTS = [
    { id: '1', name: 'Juan Dela Cruz', studentId: '2024-0001', status: 'Active' },
    { id: '2', name: 'Maria Santos', studentId: '2024-0002', status: 'Active' },
    { id: '3', name: 'Jose Rizal', studentId: '2024-0003', status: 'Active' },
    { id: '4', name: 'Andres Bonifacio', studentId: '2024-0004', status: 'Inactive' },
];

export default function ClassDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Students');

    const studentColumns = [
        { header: 'Student Name', key: 'name', flex: 2 },
        { header: 'Student ID', key: 'studentId' },
        {
            header: 'Status',
            key: 'status',
            render: (item: any) => (
                <StatusBadge
                    label={item.status}
                    type={item.status === 'Active' ? 'success' : 'neutral'}
                />
            )
        },
        {
            header: 'Action',
            key: 'actions',
            render: () => (
                <TouchableOpacity>
                    <Ionicons name="ellipsis-horizontal" size={16} color={Colors.textSecondary} />
                </TouchableOpacity>
            )
        }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'Students':
                return (
                    <View style={styles.tabContent}>
                        <View style={styles.actionRow}>
                            <TouchableOpacity style={styles.outlineBtn}>
                                <Ionicons name="download-outline" size={18} color={Colors.primary} />
                                <Text style={styles.outlineBtnText}>Import</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.outlineBtn}>
                                <Ionicons name="share-outline" size={18} color={Colors.primary} />
                                <Text style={styles.outlineBtnText}>Export</Text>
                            </TouchableOpacity>
                            <View style={styles.flex} />
                            <TouchableOpacity style={styles.addBtn}>
                                <Ionicons name="add" size={20} color="white" />
                                <Text style={styles.addBtnText}>Add Student</Text>
                            </TouchableOpacity>
                        </View>
                        <Table data={MOCK_STUDENTS} columns={studentColumns} />
                    </View>
                );
            case 'Assessments':
                return (
                    <View style={styles.tabContent}>
                        <Card style={styles.emptyCard}>
                            <Ionicons name="document-text-outline" size={48} color={Colors.border} />
                            <Text style={styles.emptyText}>No assessments assigned yet.</Text>
                            <TouchableOpacity
                                style={styles.addBtn}
                                onPress={() => router.push('/(teacher)/assessments/create')}
                            >
                                <Text style={styles.addBtnText}>Assign Assessment</Text>
                            </TouchableOpacity>
                        </Card>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <ScreenWrapper scrollable withPadding={false}>
            <View style={styles.container}>
                {/* Class Header */}
                <View style={styles.classHeader}>
                    <View>
                        <Text style={styles.classTitle}>Grade 10 - Rizal</Text>
                        <Text style={styles.classSubtitle}>Mathematics • 45 Students</Text>
                    </View>
                    <StatusBadge label="Active" type="success" />
                </View>

                {/* Tab Bar */}
                <View style={styles.tabBar}>
                    {TABS.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabLabel, activeTab === tab && styles.activeTabLabel]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {renderContent()}
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    classHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.md,
        backgroundColor: Colors.surface,
    },
    classTitle: {
        fontSize: Typography.sizes.h1,
        fontWeight: Typography.weights.bold,
        color: Colors.textPrimary,
    },
    classSubtitle: {
        fontSize: Typography.sizes.body,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    tabBar: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        backgroundColor: Colors.surface,
        paddingHorizontal: Spacing.md,
    },
    tabItem: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.md,
        marginRight: Spacing.md,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTabItem: {
        borderBottomColor: Colors.primary,
    },
    tabLabel: {
        fontSize: Typography.sizes.body,
        fontWeight: Typography.weights.medium,
        color: Colors.textSecondary,
    },
    activeTabLabel: {
        color: Colors.primary,
    },
    tabContent: {
        padding: Spacing.md,
    },
    actionRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginBottom: Spacing.md,
        alignItems: 'center',
    },
    flex: {
        flex: 1,
    },
    outlineBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.sm,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.primary,
        gap: 4,
    },
    outlineBtnText: {
        color: Colors.primary,
        fontSize: Typography.sizes.small,
        fontWeight: '600',
    },
    addBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        paddingHorizontal: Spacing.md,
        paddingVertical: 8,
        borderRadius: 8,
        gap: 4,
    },
    addBtnText: {
        color: 'white',
        fontSize: Typography.sizes.small,
        fontWeight: '700',
    },
    emptyCard: {
        alignItems: 'center',
        padding: Spacing.xxl,
        gap: Spacing.md,
    },
    emptyText: {
        color: Colors.textSecondary,
    },
});
