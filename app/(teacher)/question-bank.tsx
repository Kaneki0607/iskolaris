import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../src/components/layout/ScreenWrapper';
import Card from '../../src/components/ui/Card';
import StatusBadge from '../../src/components/ui/StatusBadge';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/spacing';
import { Typography } from '../../src/constants/typography';

const MOCK_EXERCISES = [
    { id: '1', title: 'Basic Algebra Quiz', subject: 'Mathematics', grade: '10', type: 'Private' },
    { id: '2', title: 'Physics Problems', subject: 'Science', grade: '11', type: 'Public' },
    { id: '3', title: 'Literature Analysis', subject: 'English', grade: '9', type: 'Private' },
];

export default function ExerciseLibrary() {
    const [activeTab, setActiveTab] = useState('Private');

    const filteredExercises = MOCK_EXERCISES.filter(e => e.type === activeTab);

    return (
        <ScreenWrapper scrollable>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Exercises</Text>
                    <Text style={styles.subtitle}>Manage your question bank</Text>
                </View>
                <TouchableOpacity style={styles.addBtn}>
                    <Ionicons name="add" size={18} color="white" />
                    <Text style={styles.addBtnText}>Create</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Public' && styles.activeTab]}
                    onPress={() => setActiveTab('Public')}
                >
                    <Text style={[styles.tabText, activeTab === 'Public' && styles.activeTabText]}>Shared Library</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Private' && styles.activeTab]}
                    onPress={() => setActiveTab('Private')}
                >
                    <Text style={[styles.tabText, activeTab === 'Private' && styles.activeTabText]}>My Content</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.list}>
                {filteredExercises.map(item => (
                    <Card key={item.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.flex}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <Text style={styles.cardSub}>{item.subject} • Grade {item.grade}</Text>
                            </View>
                            <StatusBadge label={item.type} type={item.type === 'Public' ? 'info' : 'warning'} />
                        </View>
                        <View style={styles.cardActions}>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Ionicons name="play-circle-outline" size={16} color={Colors.primary} />
                                <Text style={styles.actionText}>Preview</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Ionicons name="copy-outline" size={16} color={Colors.primary} />
                                <Text style={styles.actionText}>Use</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                ))}
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
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#111827',
    },
    subtitle: {
        fontSize: Typography.sizes.body,
        color: '#6B7280',
        marginTop: 2,
    },
    addBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        gap: 4,
        elevation: 2,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    addBtnText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 12,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        padding: 4,
        marginBottom: Spacing.xl,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    activeTab: {
        backgroundColor: '#FFFFFF',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    tabText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6B7280',
    },
    activeTabText: {
        color: Colors.primary,
        fontWeight: '700',
    },
    list: {
        gap: Spacing.md,
    },
    card: {
        padding: Spacing.md,
        backgroundColor: '#FFFFFF',
        borderColor: '#F3F4F6',
        borderWidth: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.md,
    },
    flex: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },
    cardSub: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    cardActions: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#F9FAFB',
        paddingTop: Spacing.md,
        justifyContent: 'flex-end',
        gap: Spacing.xl,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    actionText: {
        fontSize: 11,
        fontWeight: '700',
        color: Colors.primary,
    },
    footerSpacer: {
        height: 40,
    }
});
