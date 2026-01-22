import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Colors } from '../../src/constants/colors';

export default function TeacherLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textSecondary,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: '#F3F4F6',
                    height: Platform.OS === 'ios' ? 88 : 68,
                    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
                    paddingTop: 10,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                    marginTop: 2,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-sharp" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="classes"
                options={{
                    title: 'Classes',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people-sharp" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="assessments/index"
                options={{
                    title: 'Tests',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="document-text-sharp" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="chats/index"
                options={{
                    title: 'Chats',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="chatbubbles-sharp" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-sharp" size={size} color={color} />
                    ),
                }}
            />

            {/* Hide non-tab screens */}
            <Tabs.Screen name="assessments/create" options={{ href: null }} />
            <Tabs.Screen name="assessments/assign/[id]" options={{ href: null }} />
            <Tabs.Screen name="assessments/details/[id]" options={{ href: null }} />
            <Tabs.Screen name="assessments/monitor/[id]" options={{ href: null }} />
            <Tabs.Screen name="question-bank" options={{ href: null }} />
            <Tabs.Screen name="classes/[id]" options={{ href: null }} />
            <Tabs.Screen name="classes/_layout" options={{ href: null }} />
            <Tabs.Screen name="chats/[id]" options={{ href: null }} />
        </Tabs>
    );
}
