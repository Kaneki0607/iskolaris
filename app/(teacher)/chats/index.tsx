import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../../src/components/layout/ScreenWrapper';
import { Colors } from '../../../src/constants/colors';
import { Spacing } from '../../../src/constants/spacing';

const MOCK_COMMUNITIES = [
  { id: 'c1', name: 'Mathematics Teachers PH', lastMsg: 'Does anyone have a Grade 10 Algebra quiz?', time: '2m ago', unread: 3 },
  { id: 'c2', name: 'IskoLaris Support', lastMsg: 'Welcome to the platform!', time: '1h ago', unread: 0 },
];

const MOCK_PRIVATE = [
  { id: 'p1', name: 'Teacher Maria Santos', lastMsg: 'Thanks for the materials!', time: '10:30 AM', unread: 1 },
  { id: 'p2', name: 'Admin Ramos', lastMsg: 'Class list has been updated.', time: 'Yesterday', unread: 0 },
];

import { useRouter } from 'expo-router';

export default function ChatsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Community' | 'Private'>('Community');

  const renderChatItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={styles.chatItem}
      onPress={() => router.push({
        pathname: `/(teacher)/chats/${item.id}`,
        params: { name: item.name }
      } as any)}
    >
      <View style={styles.avatar}>
        <Ionicons name={activeTab === 'Community' ? 'people' : 'person'} size={24} color={Colors.primary} />
      </View>
      <View style={styles.chatDetails}>
        <View style={styles.chatRow}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <View style={styles.chatRow}>
          <Text style={styles.chatMsg} numberOfLines={1}>{item.lastMsg}</Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper scrollable={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="search" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Community' && styles.activeTab]}
          onPress={() => setActiveTab('Community')}
        >
          <Text style={[styles.tabText, activeTab === 'Community' && styles.activeTabText]}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Private' && styles.activeTab]}
          onPress={() => setActiveTab('Private')}
        >
          <Text style={[styles.tabText, activeTab === 'Private' && styles.activeTabText]}>Private</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {(activeTab === 'Community' ? MOCK_COMMUNITIES : MOCK_PRIVATE).map(renderChatItem)}
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="create" size={24} color="white" />
      </TouchableOpacity>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingTop: Platform.OS === 'ios' ? 0 : Spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  searchBtn: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: Spacing.lg,
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
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '700',
  },
  list: {
    paddingBottom: 100,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EBF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  chatDetails: {
    flex: 1,
  },
  chatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  chatTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  chatMsg: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
    marginRight: Spacing.md,
  },
  unreadBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '800',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  }
});
