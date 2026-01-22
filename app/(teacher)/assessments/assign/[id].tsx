import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../../../src/components/layout/ScreenWrapper';
import Card from '../../../../src/components/ui/Card';
import { Colors } from '../../../../src/constants/colors';
import { Spacing } from '../../../../src/constants/spacing';

const MOCK_CLASSES = [
  { id: 'c1', name: 'Grade 10 - Rizal', subject: 'Mathematics' },
  { id: 'c2', name: 'Grade 10 - Bonifacio', subject: 'Mathematics' },
  { id: 'c3', name: 'Grade 9 - Mabini', subject: 'Algebra' },
];

const MOCK_STUDENTS = [
  { id: '1', name: 'Juan Dela Cruz', studentId: '2024-0001' },
  { id: '2', name: 'Maria Santos', studentId: '2024-0002' },
  { id: '3', name: 'Jose Rizal', studentId: '2024-0003' },
  { id: '4', name: 'Andres Bonifacio', studentId: '2024-0004' },
  { id: '5', name: 'Emilio Aguinaldo', studentId: '2024-0005' },
];

export default function AssignAssessment() {
  const { id, title, subject } = useLocalSearchParams();
  const router = useRouter();

  const [selectedClassId, setSelectedClassId] = useState(MOCK_CLASSES[0].id);
  const [selectedIds, setSelectedIds] = useState<string[]>(MOCK_STUDENTS.map(s => s.id));
  const [deadlineDate, setDeadlineDate] = useState('2026-02-01');
  const [deadlineTime, setDeadlineTime] = useState('23:59');
  const [itemTimeLimit, setItemTimeLimit] = useState('2'); // mins
  const numItems = useLocalSearchParams().numItems?.toString() || '10';
  const [attempts, setAttempts] = useState('1');
  const [acceptLate, setAcceptLate] = useState(false);
  const [showAnswers, setShowAnswers] = useState(true);

  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const limit = parseInt(itemTimeLimit) || 0;
    const items = parseInt(numItems) || 0;
    setTotalTime(limit * items);
  }, [itemTimeLimit, numItems]);

  const toggleStudent = (sId: string) => {
    setSelectedIds(prev =>
      prev.includes(sId) ? prev.filter(i => i !== sId) : [...prev, sId]
    );
  };

  const selectAll = () => setSelectedIds(MOCK_STUDENTS.map(s => s.id));
  const unselectAll = () => setSelectedIds([]);

  return (
    <ScreenWrapper scrollable>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Assign Assessment</Text>
        <View style={{ width: 24 }} />
      </View>

      <Card style={styles.infoCard}>
        <Text style={styles.infoLabel}>Assessment</Text>
        <Text style={styles.infoVal}>{title || 'Selected Exercise'}</Text>
        <Text style={styles.infoSub}>{subject || 'N/A'}</Text>
        <View style={styles.badgeRow}>
          <View style={styles.timeBadge}>
            <Ionicons name="stopwatch-outline" size={14} color="white" />
            <Text style={styles.timeBadgeText}>{totalTime} mins total</Text>
          </View>
        </View>
      </Card>

      {/* Class Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Target Class</Text>
        <View style={styles.classGrid}>
          {MOCK_CLASSES.map(cls => (
            <TouchableOpacity
              key={cls.id}
              style={[styles.classItem, selectedClassId === cls.id && styles.classItemActive]}
              onPress={() => setSelectedClassId(cls.id)}
            >
              <Text style={[styles.classItemName, selectedClassId === cls.id && styles.classItemTextActive]}>{cls.name}</Text>
              <Text style={[styles.classItemSub, selectedClassId === cls.id && styles.classItemTextActive]}>{cls.subject}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Student Selection */}
      <View style={styles.section}>
        <View style={styles.selectionHeader}>
          <Text style={styles.sectionTitle}>2. Specific Students</Text>
          <View style={styles.actionRow}>
            <TouchableOpacity onPress={selectAll}>
              <Text style={styles.textBtn}>Select All</Text>
            </TouchableOpacity>
            <View style={styles.dot} />
            <TouchableOpacity onPress={unselectAll}>
              <Text style={styles.textBtn}>Unselect All</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.studentList}>
          {MOCK_STUDENTS.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.studentItem}
              onPress={() => toggleStudent(item.id)}
            >
              <View style={styles.flex}>
                <Text style={styles.studentName}>{item.name}</Text>
                <Text style={styles.studentId}>ID: {item.studentId}</Text>
              </View>
              <View style={[styles.checkbox, selectedIds.includes(item.id) && styles.checkboxActive]}>
                {selectedIds.includes(item.id) && <Ionicons name="checkmark" size={14} color="white" />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Assignment Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Settings & Deadlines</Text>

        <View style={styles.settingCard}>
          {/* Deadline Row */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1.5, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>Deadline Date</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  value={deadlineDate}
                  onChangeText={setDeadlineDate}
                  placeholder="YYYY-MM-DD"
                />
              </View>
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>Time</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="time-outline" size={16} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  value={deadlineTime}
                  onChangeText={setDeadlineTime}
                  placeholder="HH:MM"
                />
              </View>
            </View>
          </View>

          {/* Time Limit Row */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>Mins per Item</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="timer-outline" size={16} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  value={itemTimeLimit}
                  onChangeText={setItemTimeLimit}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>No. of Items</Text>
              <View style={[styles.inputWrapper, { backgroundColor: '#F3F4F6', borderWidth: 0 }]}>
                <Ionicons name="list-outline" size={16} color="#9CA3AF" />
                <Text style={styles.readOnlyText}>{numItems}</Text>
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Allowed Attempts</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="repeat-outline" size={16} color="#6B7280" />
              <TextInput
                style={styles.input}
                value={attempts}
                onChangeText={setAttempts}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.switchGroup}>
            <View style={styles.flex}>
              <Text style={styles.switchLabel}>Accept Late Submissions</Text>
              <Text style={styles.switchSub}>Allow work after deadline</Text>
            </View>
            <Switch
              value={acceptLate}
              onValueChange={setAcceptLate}
              trackColor={{ false: '#D1D5DB', true: Colors.primary }}
            />
          </View>

          <View style={[styles.switchGroup, { borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: Spacing.md }]}>
            <View style={styles.flex}>
              <Text style={styles.switchLabel}>Show Correct Answers</Text>
              <Text style={styles.switchSub}>Reveal answers after finish</Text>
            </View>
            <Switch
              value={showAnswers}
              onValueChange={setShowAnswers}
              trackColor={{ false: '#D1D5DB', true: Colors.primary }}
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmBtn, (selectedIds.length === 0 || !selectedClassId) && styles.confirmBtnDisabled]}
          disabled={selectedIds.length === 0 || !selectedClassId}
          onPress={() => router.replace('/(teacher)/assessments')}
        >
          <Text style={styles.confirmBtnText}>Confirm Assignment</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    paddingTop: Platform.OS === 'ios' ? 0 : Spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  infoCard: {
    padding: Spacing.lg,
    backgroundColor: Colors.primary,
    marginBottom: Spacing.xl,
    borderWidth: 0,
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoVal: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 4,
  },
  infoSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
    fontWeight: '600',
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 6,
  },
  timeBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#374151',
    marginBottom: Spacing.md,
  },
  classGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  classItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  classItemActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  classItemName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  classItemSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  classItemTextActive: {
    color: '#FFFFFF',
  },
  selectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  textBtn: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 8,
  },
  studentList: {
    gap: Spacing.xs,
  },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  flex: {
    flex: 1,
  },
  studentName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  studentId: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    height: 44,
    gap: 6,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: '#111827',
    fontWeight: '600',
  },
  readOnlyText: {
    flex: 1,
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '700',
  },
  switchGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  switchSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  footer: {
    marginTop: Spacing.sm,
  },
  confirmBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  confirmBtnDisabled: {
    backgroundColor: '#D1D5DB',
    elevation: 0,
    shadowOpacity: 0,
  },
  confirmBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
  }
});
