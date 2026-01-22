import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import ScreenWrapper from '../../../src/components/layout/ScreenWrapper';
import { Colors } from '../../../src/constants/colors';
import { Spacing } from '../../../src/constants/spacing';

interface Message {
    id: string;
    text: string;
    sender: 'me' | 'other';
    time: string;
    image?: string;
    file?: { name: string; size: string };
}

export default function ChatDetailScreen() {
    const { id, name } = useLocalSearchParams();
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hello! I updated the quiz materials for next week.', sender: 'other', time: '10:00 AM' },
        { id: '2', text: 'Great, thanks! I will review them tonight.', sender: 'me', time: '10:05 AM' },
        { id: '3', text: 'Attached the syllabus for Grade 10 Algebra.', sender: 'other', time: '10:06 AM', file: { name: 'G10_Algebra_Syllabus.pdf', size: '1.2 MB' } },
    ]);
    const [inputText, setInputText] = useState('');

    const sendMessage = () => {
        if (inputText.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                text: inputText.trim(),
                sender: 'me',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages([...messages, newMessage]);
            setInputText('');
        }
    };

    const attachImage = () => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text: 'Sent an image',
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop',
        };
        setMessages([...messages, newMessage]);
    };

    const renderMessage = ({ item }: { item: Message }) => {
        const isMe = item.sender === 'me';
        return (
            <View style={[styles.messageWrapper, isMe ? styles.myMessageWrapper : styles.otherMessageWrapper]}>
                <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
                    {item.image && (
                        <Image source={{ uri: item.image }} style={styles.messageImage} />
                    )}

                    {item.file && (
                        <TouchableOpacity style={styles.fileContainer}>
                            <View style={styles.fileIcon}>
                                <Ionicons name="document-text" size={24} color={Colors.primary} />
                            </View>
                            <View>
                                <Text style={styles.fileName}>{item.file.name}</Text>
                                <Text style={styles.fileSize}>{item.file.size}</Text>
                            </View>
                        </TouchableOpacity>
                    )}

                    <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.otherMessageText]}>
                        {item.text}
                    </Text>
                    <Text style={[styles.timeText, isMe ? styles.myTimeText : styles.otherTimeText]}>
                        {item.time}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <ScreenWrapper scrollable={false}>
            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#111827" />
                </TouchableOpacity>
                <View style={styles.headerInfo}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{String(name || 'C').charAt(0)}</Text>
                    </View>
                    <View>
                        <Text style={styles.nameText}>{name || 'Chat'}</Text>
                        <Text style={styles.statusText}>Online</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.headerAction}>
                    <Ionicons name="ellipsis-vertical" size={20} color="#6B7280" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.messageList}
                showsVerticalScrollIndicator={false}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <View style={styles.inputArea}>
                    <TouchableOpacity style={styles.attachBtn} onPress={attachImage}>
                        <Ionicons name="add" size={24} color="#6B7280" />
                    </TouchableOpacity>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Type a message..."
                            value={inputText}
                            onChangeText={setInputText}
                            multiline
                        />
                        <View style={styles.inputActions}>
                            <TouchableOpacity onPress={attachImage}>
                                <Ionicons name="image-outline" size={20} color="#6B7280" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Alert.alert("Files", "Opening file picker...")}>
                                <Ionicons name="attach" size={20} color="#6B7280" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
                        onPress={sendMessage}
                        disabled={!inputText.trim()}
                    >
                        <Ionicons name="send" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    backBtn: {
        padding: 8,
        marginRight: 4,
    },
    headerInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    avatarText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 16,
    },
    nameText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },
    statusText: {
        fontSize: 12,
        color: '#10B981',
        fontWeight: '600',
    },
    headerAction: {
        padding: 8,
    },
    messageList: {
        padding: Spacing.md,
        paddingBottom: 20,
    },
    messageWrapper: {
        marginBottom: 16,
        flexDirection: 'row',
    },
    myMessageWrapper: {
        justifyContent: 'flex-end',
    },
    otherMessageWrapper: {
        justifyContent: 'flex-start',
    },
    bubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 20,
    },
    myBubble: {
        backgroundColor: Colors.primary,
        borderBottomRightRadius: 4,
    },
    otherBubble: {
        backgroundColor: '#F3F4F6',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 20,
    },
    myMessageText: {
        color: 'white',
    },
    otherMessageText: {
        color: '#1F2937',
    },
    timeText: {
        fontSize: 10,
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    myTimeText: {
        color: 'rgba(255,255,255,0.7)',
    },
    otherTimeText: {
        color: '#9CA3AF',
    },
    messageImage: {
        width: 200,
        height: 150,
        borderRadius: 12,
        marginBottom: 8,
        backgroundColor: '#E5E7EB',
    },
    fileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 12,
        marginBottom: 8,
        gap: 10,
    },
    fileIcon: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#F0F7FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fileName: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1F2937',
        maxWidth: 150,
    },
    fileSize: {
        fontSize: 11,
        color: '#6B7280',
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        gap: 10,
    },
    attachBtn: {
        backgroundColor: '#F3F4F6',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 24,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    input: {
        flex: 1,
        fontSize: 15,
        maxHeight: 100,
        paddingVertical: 10,
        color: '#111827',
    },
    inputActions: {
        flexDirection: 'row',
        gap: 12,
        marginLeft: 10,
    },
    sendBtn: {
        backgroundColor: Colors.primary,
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    sendBtnDisabled: {
        backgroundColor: '#D1D5DB',
    }
});
