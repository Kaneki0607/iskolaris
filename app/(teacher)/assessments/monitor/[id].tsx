import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenWrapper from '../../../../src/components/layout/ScreenWrapper';
import Card from '../../../../src/components/ui/Card';
import StatusBadge from '../../../../src/components/ui/StatusBadge';
import { Table } from '../../../../src/components/ui/Table';
import { Colors } from '../../../../src/constants/colors';
import { Spacing } from '../../../../src/constants/spacing';
import { Typography } from '../../../../src/constants/typography';

const MOCK_MONITOR = [
    { id: '1', name: 'Juan Dela Cruz', score: '85', status: 'Submitted' },
    { id: '2', name: 'Maria Santos', score: '92', status: 'Submitted' },
    { id: '3', name: 'Jose Rizal', score: '--', status: 'In Progress' },
    { id: '4', name: 'Andres Bonifacio', score: '--', status: 'Not Started' },
];

export default function AssessmentMonitor() {
    const { id } = useLocalSearchParams();

    const columns = [
        { header: 'Student Name', key: 'name', flex: 2 },
        {
            header: 'Status',
            key: 'status',
            render: (item: any) => (
                <StatusBadge
                    label={item.status}
                    type={item.status === 'Submitted' ? 'success' : item.status === 'In Progress' ? 'info' : 'neutral'}
                />
            )
        },
        { header: 'Score', key: 'score' },
        {
            header: '%',
            key: 'percent',
            render: (item: any) => (
                <Text style={styles.percentText}>{item.score !== '--' ? `${item.score}%` : '--'}</Text>
            )
        }
    ];

    return (
        <ScreenWrapper scrollable>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Midterm Quiz 1</Text>
                    <Text style={styles.subtitle}>Grade 10 - Rizal • Ongoing</Text>
                </View>
                <StatusBadge label="Live" type="error" />
            </View>

            <View style={styles.statsRow}>
                <Card style={styles.statBox}>
                    <Text style={styles.statVal}>88%</Text>
                    <Text style={styles.statLab}>Avg. Score</Text>
                </Card>
                <Card style={styles.statBox}>
                    <Text style={styles.statVal}>45%</Text>
                    <Text style={styles.statLab}>Completion</Text>
                </Card>
                <Card style={styles.statBox}>
                    <Text style={styles.statVal}>12/45</Text>
                    <Text style={styles.statLab}>Passed</Text>
                </Card>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Detailed Report</Text>
                <Table data={MOCK_MONITOR} columns={columns} />
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
    title: {
        fontSize: Typography.sizes.h1,
        fontWeight: Typography.weights.bold,
        color: Colors.textPrimary,
    },
    subtitle: {
        fontSize: Typography.sizes.body,
        color: Colors.textSecondary,
    },
    statsRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginBottom: Spacing.xl,
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
        padding: Spacing.md,
    },
    statVal: {
        fontSize: 18,
        fontWeight: '800',
        color: Colors.primary,
    },
    statLab: {
        fontSize: 9,
        color: Colors.textSecondary,
        textTransform: 'uppercase',
        marginTop: 4,
        fontWeight: '700',
    },
    section: {
        marginBottom: Spacing.xxl,
    },
    sectionTitle: {
        fontSize: Typography.sizes.h3,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: Spacing.md,
    },
    percentText: {
        fontSize: Typography.sizes.body,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
});
