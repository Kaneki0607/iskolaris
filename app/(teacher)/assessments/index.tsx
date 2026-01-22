import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../../src/components/layout/ScreenWrapper';
import Card from '../../../src/components/ui/Card';
import StatusBadge from '../../../src/components/ui/StatusBadge';
import { Colors } from '../../../src/constants/colors';
import { Spacing } from '../../../src/constants/spacing';

const MOCK_ONGOING = [
  {
    id: 'o1',
    title: 'Midterm Quiz 1',
    subject: 'Mathematics',
    class: 'Grade 10 - Rizal',
    turnout: { submitted: 32, total: 45 },
    accuracy: { correct: 78, incorrect: 22 },
    passRate: 85,
  },
];

const MOCK_COMPLETED = [
  { id: 'c1', title: 'Unit 1 Test', subject: 'Mathematics', date: 'Jan 15, 2026', avg: '88%' },
];

const MOCK_MY_LIBRARY_CATEGORIES = [
  {
    name: 'Mathematics',
    items: [
      { id: 'ex1', title: 'Algebraic Expressions Practice', subject: 'Mathematics', topic: 'Algebra', grade: '10', numItems: 15, copies: 45, description: 'Practice problems for simplifying algebraic expressions.' },
      { id: 'ex5', title: 'Geometry Fundamentals', subject: 'Mathematics', topic: 'Geometry', grade: '9', numItems: 20, copies: 12, description: 'Basic principles of points, lines, and planes.' },
    ]
  },
  {
    name: 'History',
    items: [
      { id: 'ex2', title: 'World War II Quiz', subject: 'History', topic: 'Modern History', grade: '11', numItems: 20, copies: 8, description: 'Key events and figures of the Second World War.' },
      { id: 'ex6', title: 'Philippine Revolution', subject: 'History', topic: 'Local History', grade: '7', numItems: 15, copies: 34, description: 'The struggle for independence against colonial rule.' },
    ]
  }
];

const MOCK_PUBLIC_LIBRARY_CATEGORIES = [
  {
    name: 'Science',
    items: [
      {
        id: 'ex3',
        title: 'Cell Biology Review',
        subject: 'Science',
        topic: 'Cellular Organelles',
        description: 'A deep dive into the microscopic structures that power life.',
        grade: '9',
        author: 'Maam Lopez',
        numItems: 25,
        copies: 124,
        isOwner: false
      },
      {
        id: 'ex7',
        title: 'Chemical Bonding',
        subject: 'Science',
        topic: 'Ionic & Covalent',
        description: 'Master the forces that hold molecules together with this interactive quiz.',
        grade: '10',
        author: 'Sir Juan',
        numItems: 20,
        copies: 89,
        isOwner: true
      },
    ]
  },
  {
    name: 'English',
    items: [
      {
        id: 'ex4',
        title: 'English Grammar Basics',
        subject: 'English',
        topic: 'Parts of Speech',
        description: 'Foundational grammar assessment covering nouns, verbs, and adjectives.',
        grade: '7',
        author: 'Teacher Sarah',
        numItems: 12,
        copies: 245,
        isOwner: false
      },
    ]
  }
];

const CollapsibleSection = ({ title, children, defaultOpen = false, count }: { title: string, children: React.ReactNode, defaultOpen?: boolean, count?: number }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsOpen(!isOpen)}>
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {count !== undefined && <View style={styles.countBadge}><Text style={styles.countText}>{count}</Text></View>}
        </View>
        <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color={Colors.textSecondary} />
      </TouchableOpacity>
      {isOpen && <View style={styles.sectionChildren}>{children}</View>}
    </View>
  );
};

export default function AssessmentsScreen() {
  const router = useRouter();
  const [activeSegment, setActiveSegment] = useState<'Active' | 'Library'>('Active');
  const [libraryTab, setLibraryTab] = useState<'My' | 'Public'>('My');

  const renderOngoingCard = (test: any) => (
    <Card key={test.id} style={styles.activeCard}>
      <View style={styles.cardHeader}>
        <View style={styles.flex}>
          <Text style={styles.cardTitle}>{test.title}</Text>
          <Text style={styles.cardSub}>{test.subject} • {test.class}</Text>
        </View>
        <StatusBadge label="Ongoing" type="info" />
      </View>

      <View style={styles.metricRow}>
        <View style={styles.metricMain}>
          <Text style={styles.metricLabel}>Turnout Progress</Text>
          <Text style={styles.metricVal}>{test.turnout.submitted}/{test.turnout.total} Students</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBar, { width: `${(test.turnout.submitted / test.turnout.total) * 100}%` }]} />
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={[styles.statNum, { color: '#10B981' }]}>{test.accuracy.correct}%</Text>
          <Text style={styles.statLabel}>Correct</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNum, { color: '#EF4444' }]}>{test.accuracy.incorrect}%</Text>
          <Text style={styles.statLabel}>Incorrect</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNum, { color: Colors.primary }]}>{test.passRate}%</Text>
          <Text style={styles.statLabel}>Pass Rate</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.monitorBtn} onPress={() => router.push(`/(teacher)/assessments/monitor/${test.id}` as any)}>
        <Text style={styles.monitorBtnText}>Monitor Live</Text>
      </TouchableOpacity>
    </Card>
  );

  const renderLibraryItem = (item: any, isMyLibrary: boolean = false) => (
    <Card key={item.id} style={styles.libCard}>
      <View style={styles.cardHeader}>
        <View style={styles.flex}>
          <View style={styles.titleRowSmall}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.popularityBadge}>
              <Ionicons name="copy-outline" size={10} color="#6B7280" />
              <Text style={styles.popularityText}>{item.copies || 0} copies</Text>
            </View>
          </View>

          <View style={styles.topicRow}>
            <Text style={styles.topicLabel}>Topic:</Text>
            <Text style={styles.topicVal}>{item.topic || 'General'}</Text>
          </View>

          <Text style={styles.descriptionText} numberOfLines={2}>
            {item.description || 'No description provided.'}
          </Text>

          <View style={styles.metaInfoRow}>
            <Text style={styles.cardSub}>{item.subject} • Grade {item.grade} • {item.numItems} Items</Text>
          </View>

          {item.author && (
            <View style={styles.authorRow}>
              <Ionicons name="person-circle-outline" size={14} color={Colors.primary} />
              <Text style={styles.authorText}>{item.author}</Text>
            </View>
          )}
        </View>

        {isMyLibrary && (
          <View style={styles.itemHeaderActions}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => router.push({
              pathname: '/(teacher)/assessments/create',
              params: { id: item.id, mode: 'edit' }
            } as any)}>
              <Ionicons name="pencil-outline" size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="archive-outline" size={18} color="#F59E0B" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="trash-outline" size={18} color="#EF4444" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.libActionBtn}>
          <Ionicons name="eye-outline" size={16} color={Colors.textSecondary} />
          <Text style={styles.libActionText}>Preview</Text>
        </TouchableOpacity>

        <View style={styles.actionGroup}>
          {(item.isOwner && !isMyLibrary) && (
            <TouchableOpacity
              style={[styles.libActionBtnSecondary, { marginRight: 8 }]}
              onPress={() => Alert.alert("Make Private", "This exercise will be removed from the public library.")}
            >
              <Ionicons name="lock-closed-outline" size={14} color="#6B7280" />
              <Text style={styles.libActionTextSmall}>Make Private</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={isMyLibrary ? styles.libAssignBtn : styles.libCopyBtn}
            onPress={() => {
              if (isMyLibrary) {
                router.push({
                  pathname: `/(teacher)/assessments/assign/${item.id}` as any,
                  params: { title: item.title, subject: item.subject, numItems: item.numItems }
                });
              } else {
                Alert.alert("Success", "Added to your library!");
              }
            }}
          >
            <Ionicons name={isMyLibrary ? "send-outline" : "copy-outline"} size={14} color={isMyLibrary ? Colors.primary : "white"} />
            <Text style={isMyLibrary ? styles.libAssignBtnText : styles.libCopyBtnText}>
              {isMyLibrary ? 'Assign Exercise' : 'Make a Copy'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  return (
    <ScreenWrapper scrollable>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Assessments</Text>
          <TouchableOpacity style={styles.headerActionBtn} onPress={() => router.push('/(teacher)/assessments/create')}>
            <Ionicons name="add" size={20} color="white" />
            <Text style={styles.headerActionText}>New</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.segmentContainer}>
          <TouchableOpacity
            style={[styles.segment, activeSegment === 'Active' && styles.activeSegment]}
            onPress={() => setActiveSegment('Active')}
          >
            <Text style={[styles.segmentText, activeSegment === 'Active' && styles.activeSegmentText]}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segment, activeSegment === 'Library' && styles.activeSegment]}
            onPress={() => setActiveSegment('Library')}
          >
            <Text style={[styles.segmentText, activeSegment === 'Library' && styles.activeSegmentText]}>Library</Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeSegment === 'Active' ? (
        <View>
          <CollapsibleSection title="Ongoing Assessments" defaultOpen={true}>
            {MOCK_ONGOING.length > 0 ? (
              MOCK_ONGOING.map(renderOngoingCard)
            ) : (
              <Text style={styles.emptyText}>No ongoing assessments.</Text>
            )}
          </CollapsibleSection>

          <CollapsibleSection title="Completed Assessments">
            {MOCK_COMPLETED.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.completedItem}
                onPress={() => router.push(`/(teacher)/assessments/details/${item.id}` as any)}
              >
                <View style={styles.flex}>
                  <Text style={styles.completedTitle}>{item.title}</Text>
                  <Text style={styles.completedSub}>{item.subject} • {item.date}</Text>
                </View>
                <View style={styles.avgBadge}>
                  <Text style={styles.avgText}>{item.avg}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </CollapsibleSection>
        </View>
      ) : (
        <View>
          <View style={styles.libTabs}>
            <TouchableOpacity
              style={[styles.libTab, libraryTab === 'My' && styles.activeLibTab]}
              onPress={() => setLibraryTab('My')}
            >
              <Text style={[styles.libTabText, libraryTab === 'My' && styles.activeLibTabText]}>My Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.libTab, libraryTab === 'Public' && styles.activeLibTab]}
              onPress={() => setLibraryTab('Public')}
            >
              <Text style={[styles.libTabText, libraryTab === 'Public' && styles.activeLibTabText]}>Public Library</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.libList}>
            {libraryTab === 'My' ? (
              MOCK_MY_LIBRARY_CATEGORIES.map(category => (
                <CollapsibleSection
                  key={category.name}
                  title={category.name}
                  count={category.items.length}
                >
                  {category.items.map(item => renderLibraryItem(item, true))}
                </CollapsibleSection>
              ))
            ) : (
              MOCK_PUBLIC_LIBRARY_CATEGORIES.map(category => (
                <CollapsibleSection
                  key={category.name}
                  title={category.name}
                  count={category.items.length}
                >
                  {category.items.map(item => renderLibraryItem(item, false))}
                </CollapsibleSection>
              ))
            )}
          </View>
        </View>
      )}

      <View style={styles.footerSpacer} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: Spacing.xl,
    paddingTop: Platform.OS === 'ios' ? 0 : Spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  headerActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 4,
  },
  headerActionText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeSegment: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeSegmentText: {
    color: Colors.primary,
    fontWeight: '700',
  },
  sectionContainer: {
    marginBottom: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: Spacing.md,
    borderRadius: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
  },
  countBadge: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  countText: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '700',
  },
  sectionChildren: {
    paddingTop: Spacing.sm,
  },
  activeCard: {
    marginBottom: Spacing.md,
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
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },
  cardSub: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  itemHeaderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    padding: 4,
  },
  metricRow: {
    marginBottom: Spacing.lg,
  },
  metricMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  metricVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  progressBarBg: {
    height: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F9FAFB',
    paddingTop: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNum: {
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  monitorBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  monitorBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  completedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  completedTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  completedSub: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  avgBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 10,
  },
  avgText: {
    color: '#059669',
    fontSize: 13,
    fontWeight: '800',
  },
  emptyText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontStyle: 'italic',
    paddingVertical: Spacing.xl,
  },
  libTabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: Spacing.xl,
  },
  libTab: {
    marginRight: Spacing.xl,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeLibTab: {
    borderBottomColor: Colors.primary,
  },
  libTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeLibTabText: {
    color: Colors.primary,
    fontWeight: '700',
  },
  libList: {
    marginBottom: Spacing.md,
  },
  libCard: {
    marginBottom: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderColor: '#F3F4F6',
    borderWidth: 1,
    padding: Spacing.md,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F9FAFB',
    paddingTop: Spacing.md,
    marginTop: Spacing.sm,
  },
  libActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  libActionText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  libAssignBtn: {
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#D1E5FF',
  },
  libAssignBtnText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '700',
  },
  footerSpacer: {
    height: 80,
  },
  titleRowSmall: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  popularityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  popularityText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  topicLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9CA3AF',
    textTransform: 'uppercase',
  },
  topicVal: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  descriptionText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
    marginBottom: 10,
  },
  metaInfoRow: {
    marginBottom: 6,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  authorText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '700',
  },
  actionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  libActionBtnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  libActionTextSmall: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '700',
  },
  libCopyBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    elevation: 2,
  },
  libCopyBtnText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '800',
  }
});
