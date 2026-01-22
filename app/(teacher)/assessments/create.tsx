import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../../src/components/layout/ScreenWrapper';
import FormInput from '../../../src/components/ui/FormInput';
import PrimaryButton from '../../../src/components/ui/PrimaryButton';
import { Colors } from '../../../src/constants/colors';
import { Spacing } from '../../../src/constants/spacing';
import { Typography } from '../../../src/constants/typography';

const STEPS = ['Info', 'Questions', 'Settings', 'Review'];

type QuestionType = 'Multiple Choice' | 'Matching' | 'Pattern' | 'Identification' | 'Essay';

interface Question {
    id: string;
    type: QuestionType;
    questionText: string;
    points: number;
    questionImage?: string;
    audioMode: 'none' | 'tts' | 'record';
    ttsScript?: string;
    voiceUri?: string;
    // For Multiple Choice
    options?: string[];
    optionImages?: (string | undefined)[];
    correctOptionIndex?: number;
    // For Matching
    pairs?: { left: string; right: string; leftImage?: string; rightImage?: string }[];
    // For Pattern
    pattern?: string[];
    patternImages?: (string | undefined)[];
    // For Identification
    correctAnswer?: string;
}

export default function CreateAssessment() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const isEditMode = params.mode === 'edit';
    const [currentStep, setCurrentStep] = useState(0);

    // State for Assessment Info
    const [info, setInfo] = useState({
        title: '',
        subject: '',
        topic: '',
        description: '',
    });

    // State for Questions
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isAddingQuestion, setIsAddingQuestion] = useState(false);
    const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

    // State for AI Generation
    const [isAiModalVisible, setIsAiModalVisible] = useState(false);
    const [aiConfig, setAiConfig] = useState({
        type: 'Multiple Choice' as QuestionType,
        count: '3',
        useTTS: false,
    });

    // State for Settings
    const [settings, setSettings] = useState({
        randomizeQuestions: false,
        randomizeChoices: false,
        allowRetake: false,
    });

    // Load data for edit mode
    useEffect(() => {
        if (isEditMode && params.id) {
            setInfo({
                title: 'Algebraic Expressions Practice',
                subject: 'Mathematics',
                topic: 'Variables and Constants',
                description: 'A comprehensive practice set covering the basics of algebraic expressions and variables.',
            });
            setQuestions([
                {
                    id: '1',
                    type: 'Multiple Choice',
                    questionText: 'What is 2x + 5 = 15?',
                    points: 5,
                    audioMode: 'none',
                    options: ['x=5', 'x=10', 'x=4', 'x=2'],
                    optionImages: [undefined, undefined, undefined, undefined],
                    correctOptionIndex: 0,
                },
                {
                    id: '2',
                    type: 'Identification',
                    questionText: 'Who is the father of Algebra?',
                    points: 10,
                    audioMode: 'none',
                    correctAnswer: 'Al-Khwarizmi',
                }
            ]);
        }
    }, [isEditMode, params.id]);

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            Alert.alert(
                isEditMode ? "Update Successful" : "Publish Successful",
                `Assessment "${info.title}" has been ${isEditMode ? 'updated' : 'published'}.`,
                [{ text: "OK", onPress: () => router.replace('/(teacher)/assessments') }]
            );
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        } else {
            router.back();
        }
    };

    // --- Question Management ---
    const addQuestion = (type: QuestionType, initialData: Partial<Question> = {}) => {
        const newQuestion: Question = {
            id: Date.now().toString() + Math.random(),
            type,
            questionText: '',
            points: 5,
            audioMode: 'none',
            options: type === 'Multiple Choice' ? ['', '', '', ''] : undefined,
            optionImages: type === 'Multiple Choice' ? [undefined, undefined, undefined, undefined] : undefined,
            correctOptionIndex: type === 'Multiple Choice' ? 0 : undefined,
            pairs: type === 'Matching' ? [{ left: '', right: '' }, { left: '', right: '' }] : undefined,
            pattern: type === 'Pattern' ? ['', '', ''] : undefined,
            patternImages: type === 'Pattern' ? [undefined, undefined, undefined] : undefined,
            correctAnswer: type === 'Identification' ? '' : undefined,
            ...initialData,
        };
        setQuestions(prev => [...prev, newQuestion]);
        setEditingQuestionId(newQuestion.id);
        setIsAddingQuestion(false);
    };

    const updateQuestion = (id: string, updates: Partial<Question>) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
    };

    const removeQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    // --- AI Generation ---
    const handleAiGenerate = () => {
        const count = parseInt(aiConfig.count) || 1;
        for (let i = 0; i < count; i++) {
            const text = `AI Generated ${aiConfig.type} Question ${i + 1} for ${info.topic || 'General Topic'}`;
            addQuestion(aiConfig.type, {
                questionText: text,
                audioMode: aiConfig.useTTS ? 'tts' : 'none',
                ttsScript: text,
            });
        }
        setIsAiModalVisible(false);
    };

    // --- Renderers ---
    const renderQuestionForm = (q: Question) => {
        const isExpanded = editingQuestionId === q.id;

        if (!isExpanded) {
            return (
                <TouchableOpacity key={q.id} style={styles.questionCollapsed} onPress={() => setEditingQuestionId(q.id)}>
                    <View style={styles.flex}>
                        <View style={styles.qHeaderRow}>
                            <Text style={styles.qTypeLabel}>{q.type}</Text>
                            {q.audioMode === 'tts' && <Ionicons name="sparkles" size={12} color={Colors.primary} />}
                            {q.audioMode === 'record' && <Ionicons name="mic" size={12} color="#10B981" />}
                        </View>
                        <Text style={styles.qTextPreview} numberOfLines={1}>{q.questionText || '(No question text)'}</Text>
                    </View>
                    <View style={styles.qPointsBadge}><Text style={styles.qPointsText}>{q.points} pt</Text></View>
                    <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} />
                </TouchableOpacity>
            );
        }

        return (
            <View key={q.id} style={styles.questionExpanded}>
                <View style={styles.qHeader}>
                    <Text style={styles.qTypeTitle}>{q.type}</Text>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity onPress={() => removeQuestion(q.id)}>
                            <Ionicons name="trash-outline" size={20} color="#EF4444" />
                        </TouchableOpacity>
                    </View>
                </View>

                <TextInput
                    style={styles.qInput}
                    placeholder="Enter question text..."
                    value={q.questionText}
                    onChangeText={(text) => updateQuestion(q.id, { questionText: text })}
                    multiline
                />

                {/* Media Button for Question */}
                <TouchableOpacity style={styles.addMediaBtn} onPress={() => updateQuestion(q.id, { questionImage: 'https://via.placeholder.com/150' })}>
                    <Ionicons name="image-outline" size={16} color={Colors.primary} />
                    <Text style={styles.addMediaText}>{q.questionImage ? 'Change Image' : 'Add Image to Question'}</Text>
                </TouchableOpacity>
                {q.questionImage && <Image source={{ uri: q.questionImage }} style={styles.previewImg} />}

                <View style={styles.ptsRow}>
                    <Text style={styles.ptsLabel}>Points:</Text>
                    <TextInput
                        style={styles.ptsInput}
                        value={q.points.toString()}
                        onChangeText={(text) => updateQuestion(q.id, { points: parseInt(text) || 0 })}
                        keyboardType="numeric"
                    />
                </View>

                {/* Audio Management */}
                <View style={styles.audioSection}>
                    <Text style={styles.audioTitle}>Audio Content</Text>
                    <View style={styles.audioModeRow}>
                        {(['none', 'tts', 'record'] as const).map((mode) => (
                            <TouchableOpacity
                                key={mode}
                                style={[styles.audioModeBtn, q.audioMode === mode && styles.audioModeBtnActive]}
                                onPress={() => updateQuestion(q.id, {
                                    audioMode: mode,
                                    ttsScript: mode === 'tts' ? (q.ttsScript || q.questionText) : q.ttsScript
                                })}
                            >
                                <Ionicons
                                    name={mode === 'none' ? 'volume-mute' : mode === 'tts' ? 'sparkles' : 'mic'}
                                    size={14}
                                    color={q.audioMode === mode ? 'white' : Colors.textSecondary}
                                />
                                <Text style={[styles.audioModeText, q.audioMode === mode && styles.audioModeTextActive]}>
                                    {mode === 'none' ? 'None' : mode === 'tts' ? 'AI TTS' : 'Voice Record'}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {q.audioMode === 'tts' && (
                        <View style={styles.ttsContainer}>
                            <Text style={styles.audioSubLabel}>AI Spoken Script (Independent of Question Text):</Text>
                            <View style={styles.ttsInputContainer}>
                                <TextInput
                                    style={styles.ttsInput}
                                    value={q.ttsScript}
                                    onChangeText={(text) => updateQuestion(q.id, { ttsScript: text })}
                                    placeholder="What should the AI say?"
                                    multiline
                                />
                                <TouchableOpacity
                                    style={styles.aiWriteBtn}
                                    onPress={() => updateQuestion(q.id, {
                                        ttsScript: `Hello class, for this ${q.type} question, I want you to focus on ${q.questionText.substring(0, 50)}...`
                                    })}
                                >
                                    <Ionicons name="sparkles" size={14} color="white" />
                                    <Text style={styles.aiWriteBtnText}>AI Write</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.audioActionBtn} onPress={() => Alert.alert("TTS Regenerated", "AI voice has been regenerated with the new script.")}>
                                <Ionicons name="refresh" size={14} color={Colors.primary} />
                                <Text style={styles.audioActionText}>Preview & Regenerate Audio</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {q.audioMode === 'record' && (
                        <View style={styles.recordContainer}>
                            <Text style={styles.audioSubLabel}>Teacher Voice Recording:</Text>
                            <View style={styles.recordControls}>
                                <TouchableOpacity style={styles.recordBtn} onPress={() => Alert.alert("Recording", "Teacher voice recording process started...")}>
                                    <Ionicons name="radio-button-on" size={18} color="#EF4444" />
                                    <Text style={styles.recordBtnText}>Record</Text>
                                </TouchableOpacity>
                                {q.voiceUri && (
                                    <TouchableOpacity style={styles.playBtn}>
                                        <Ionicons name="play" size={16} color="white" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    )}
                </View>

                {/* Question Type Specific Logic */}
                {q.type === 'Multiple Choice' && q.options && (
                    <View style={styles.optionsContainer}>
                        {q.options.map((opt, idx) => (
                            <View key={idx} style={styles.choiceWrapper}>
                                <View style={styles.choiceTopRow}>
                                    <TouchableOpacity
                                        onPress={() => updateQuestion(q.id, { correctOptionIndex: idx })}
                                        style={[styles.radio, q.correctOptionIndex === idx && styles.radioSelected]}
                                    >
                                        {q.correctOptionIndex === idx && <View style={styles.radioInner} />}
                                    </TouchableOpacity>
                                    <TextInput
                                        style={styles.optionInput}
                                        placeholder={`Option ${idx + 1}`}
                                        value={opt}
                                        onChangeText={(text) => {
                                            const newOpts = [...q.options!];
                                            newOpts[idx] = text;
                                            updateQuestion(q.id, { options: newOpts });
                                        }}
                                    />
                                    <TouchableOpacity style={styles.choiceImgBtn} onPress={() => {
                                        const newImgs = [...(q.optionImages || [])];
                                        newImgs[idx] = 'https://via.placeholder.com/80';
                                        updateQuestion(q.id, { optionImages: newImgs });
                                    }}>
                                        <Ionicons name="image" size={16} color={q.optionImages?.[idx] ? Colors.primary : Colors.textSecondary} />
                                    </TouchableOpacity>
                                </View>
                                {q.optionImages?.[idx] && <Image source={{ uri: q.optionImages[idx] }} style={styles.choicePreviewImg} />}
                            </View>
                        ))}
                    </View>
                )}

                {q.type === 'Identification' && (
                    <TextInput
                        style={styles.answerInput}
                        placeholder="Correct answer..."
                        value={q.correctAnswer}
                        onChangeText={(text) => updateQuestion(q.id, { correctAnswer: text })}
                    />
                )}

                {q.type === 'Matching' && q.pairs && (
                    <View style={styles.pairsContainer}>
                        {q.pairs.map((pair, idx) => (
                            <View key={idx} style={styles.pairRow}>
                                <TextInput
                                    style={styles.pairInput}
                                    placeholder="Item"
                                    value={pair.left}
                                    onChangeText={(t) => {
                                        const newPairs = [...q.pairs!];
                                        newPairs[idx].left = t;
                                        updateQuestion(q.id, { pairs: newPairs });
                                    }}
                                />
                                <Ionicons name="arrow-forward" size={16} color={Colors.textSecondary} />
                                <TextInput
                                    style={styles.pairInput}
                                    placeholder="Match"
                                    value={pair.right}
                                    onChangeText={(t) => {
                                        const newPairs = [...q.pairs!];
                                        newPairs[idx].right = t;
                                        updateQuestion(q.id, { pairs: newPairs });
                                    }}
                                />
                            </View>
                        ))}
                        <TouchableOpacity onPress={() => updateQuestion(q.id, { pairs: [...q.pairs!, { left: '', right: '' }] })}>
                            <Text style={styles.addSmallBtn}>+ Add Pair</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {q.type === 'Pattern' && q.pattern && (
                    <View style={styles.patternContainer}>
                        {q.pattern.map((item, idx) => (
                            <View key={idx} style={styles.patternRow}>
                                <Text style={styles.patternIndex}>{idx + 1}.</Text>
                                <TextInput
                                    style={styles.optionInput}
                                    placeholder="Item in sequence..."
                                    value={item}
                                    onChangeText={(t) => {
                                        const newP = [...q.pattern!];
                                        newP[idx] = t;
                                        updateQuestion(q.id, { pattern: newP });
                                    }}
                                />
                            </View>
                        ))}
                        <TouchableOpacity onPress={() => updateQuestion(q.id, { pattern: [...q.pattern!, ''] })}>
                            <Text style={styles.addSmallBtn}>+ Add Item</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {q.type === 'Essay' && (
                    <View style={styles.essayBox}>
                        <Ionicons name="information-circle-outline" size={16} color={Colors.textSecondary} />
                        <Text style={styles.essayNote}>Essay responses will require manual grading.</Text>
                    </View>
                )}

                <TouchableOpacity style={styles.collapseBtn} onPress={() => setEditingQuestionId(null)}>
                    <Text style={styles.collapseBtnText}>Save Question</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0: // Info
                return (
                    <View style={styles.stepContainer}>
                        <FormInput label="Assessment Title" value={info.title} onChangeText={(text) => setInfo({ ...info, title: text })} placeholder="e.g. Midterm Quiz 1" />
                        <FormInput label="Subject" value={info.subject} onChangeText={(text) => setInfo({ ...info, subject: text })} placeholder="e.g. Mathematics" />
                        <FormInput label="Topic" value={info.topic} onChangeText={(text) => setInfo({ ...info, topic: text })} placeholder="e.g. Algebra" />
                        <FormInput
                            label="Topic short description"
                            value={info.description}
                            onChangeText={(text) => setInfo({ ...info, description: text })}
                            placeholder="Briefly describe the focus of this exercise..."
                            multiline
                        />
                    </View>
                );
            case 1: // Questions
                return (
                    <View style={styles.stepContainer}>
                        <View style={styles.topActions}>
                            <TouchableOpacity style={styles.aiBtn} onPress={() => setIsAiModalVisible(true)}>
                                <Ionicons name="sparkles" size={18} color="white" />
                                <Text style={styles.aiBtnText}>Generate with AI</Text>
                            </TouchableOpacity>
                        </View>

                        {questions.map(renderQuestionForm)}

                        {isAddingQuestion ? (
                            <View style={styles.typeSelector}>
                                <Text style={styles.selectorTitle}>Select Question Type</Text>
                                <View style={styles.typeGrid}>
                                    {(['Multiple Choice', 'Matching', 'Pattern', 'Identification', 'Essay'] as QuestionType[]).map(type => (
                                        <TouchableOpacity key={type} style={styles.typeBtn} onPress={() => addQuestion(type)}>
                                            <Ionicons name={
                                                type === 'Multiple Choice' ? 'list' :
                                                    type === 'Matching' ? 'swap-horizontal' :
                                                        type === 'Pattern' ? 'reorder-four' :
                                                            type === 'Identification' ? 'text' : 'document-text'
                                            } size={18} color={Colors.primary} />
                                            <Text style={styles.typeBtnText}>{type}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <TouchableOpacity style={styles.cancelLink} onPress={() => setIsAddingQuestion(false)}>
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity style={styles.addQuestionBtn} onPress={() => setIsAddingQuestion(true)}>
                                <Ionicons name="add-circle-outline" size={20} color={Colors.primary} />
                                <Text style={styles.addQuestionText}>Add Question Manually</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                );
            case 2: // Settings
                return (
                    <View style={styles.stepContainer}>
                        <View style={styles.settingRow}>
                            <View style={styles.flex}>
                                <Text style={styles.settingLabel}>Randomize Questions</Text>
                                <Text style={styles.settingSub}>Shuffle order for each student</Text>
                            </View>
                            <Switch
                                value={settings.randomizeQuestions}
                                onValueChange={(val) => setSettings({ ...settings, randomizeQuestions: val })}
                            />
                        </View>
                        <View style={styles.settingRow}>
                            <View style={styles.flex}>
                                <Text style={styles.settingLabel}>Randomize Choices</Text>
                                <Text style={styles.settingSub}>Shuffle multiple choice options</Text>
                            </View>
                            <Switch
                                value={settings.randomizeChoices}
                                onValueChange={(val) => setSettings({ ...settings, randomizeChoices: val })}
                            />
                        </View>
                    </View>
                );
            case 3: // Review
                return (
                    <View style={styles.stepContainer}>
                        <View style={styles.reviewCard}>
                            <Text style={styles.reviewLabel}>Assessment Summary</Text>
                            <Text style={styles.reviewTitle}>{info.title || 'Untitled Assessment'}</Text>
                            <Text style={styles.reviewDetail}>{info.subject} • {info.topic}</Text>
                            <Text style={styles.reviewDescription}>{info.description}</Text>
                            <Text style={styles.reviewDetail}>{questions.length} Questions</Text>
                            <View style={styles.reviewDivider} />
                            <View style={styles.totalPtsRow}>
                                <Text style={styles.totalPtsLabel}>Total Points</Text>
                                <Text style={styles.totalPtsVal}>{questions.reduce((acc, q) => acc + q.points, 0)}</Text>
                            </View>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <ScreenWrapper scrollable={false}>
            {/* Navbar */}
            <View style={styles.navbar}>
                <TouchableOpacity onPress={prevStep} style={styles.navBtn}>
                    <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.navTitle}>{isEditMode ? 'Edit Exercise' : 'Create Exercise'}</Text>
                <View style={styles.navBtn} />
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                {STEPS.map((step, index) => (
                    <View key={step} style={styles.progressItem}>
                        <View style={[styles.progressDot, index <= currentStep && styles.activeDot]}>
                            {index < currentStep ? (
                                <Ionicons name="checkmark" size={14} color="white" />
                            ) : (
                                <Text style={[styles.dotText, index <= currentStep && styles.activeDotText]}>{index + 1}</Text>
                            )}
                        </View>
                        <Text style={[styles.stepLabel, index <= currentStep && styles.activeStepLabel]}>{step}</Text>
                    </View>
                ))}
            </View>

            <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
                {renderStepContent()}
            </ScrollView>

            {/* Footer Actions */}
            <View style={styles.footer}>
                <PrimaryButton
                    title={currentStep === STEPS.length - 1 ? (isEditMode ? "Update Exercise" : "Finalize Exercise") : "Next Step"}
                    onPress={nextStep}
                />
            </View>

            {/* AI Generate Modal */}
            <Modal visible={isAiModalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>AI Question Generator</Text>
                            <TouchableOpacity onPress={() => setIsAiModalVisible(false)}>
                                <Ionicons name="close" size={24} color={Colors.textSecondary} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalBody}>
                            <Text style={styles.modalLabel}>Question Type</Text>
                            <View style={styles.aiTypeGrid}>
                                {(['Multiple Choice', 'Matching', 'Pattern', 'Identification', 'Essay'] as QuestionType[]).map(t => (
                                    <TouchableOpacity
                                        key={t}
                                        style={[styles.aiTypeBtn, aiConfig.type === t && styles.aiTypeBtnActive]}
                                        onPress={() => setAiConfig({ ...aiConfig, type: t })}
                                    >
                                        <Text style={[styles.aiTypeBtnText, aiConfig.type === t && styles.aiTypeBtnTextActive]}>{t}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.modalLabel}>Number of Questions</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={aiConfig.count}
                                onChangeText={(v) => setAiConfig({ ...aiConfig, count: v })}
                                keyboardType="numeric"
                            />

                            <View style={styles.ttsRow}>
                                <View style={styles.flex}>
                                    <Text style={styles.modalLabel}>AI Text to Speech</Text>
                                    <Text style={styles.modalSub}>Enable audio playback for questions</Text>
                                </View>
                                <Switch
                                    value={aiConfig.useTTS}
                                    onValueChange={(v) => setAiConfig({ ...aiConfig, useTTS: v })}
                                    trackColor={{ false: '#D1D5DB', true: Colors.primary }}
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.modalGenerateBtn} onPress={handleAiGenerate}>
                            <Ionicons name="sparkles" size={18} color="white" />
                            <Text style={styles.modalGenerateText}>Generate Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.md,
    },
    navBtn: {
        width: 40,
        alignItems: 'center',
    },
    navTitle: {
        fontSize: Typography.sizes.h3,
        fontWeight: Typography.weights.bold,
        color: Colors.textPrimary,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        backgroundColor: '#FFFFFF',
    },
    progressItem: {
        alignItems: 'center',
        gap: 4,
    },
    progressDot: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeDot: {
        backgroundColor: Colors.primary,
    },
    dotText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#9CA3AF',
    },
    activeDotText: {
        color: 'white',
    },
    stepLabel: {
        fontSize: 10,
        color: '#9CA3AF',
        fontWeight: '600',
    },
    activeStepLabel: {
        color: Colors.primary,
        fontWeight: '700',
    },
    content: {
        padding: Spacing.md,
        paddingBottom: 140,
    },
    stepContainer: {
        gap: Spacing.md,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: Spacing.lg,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },

    // Top Actions
    topActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: Spacing.sm,
    },
    aiBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#8B5CF6',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        gap: 6,
        elevation: 2,
    },
    aiBtnText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '700',
    },

    // Question Form Styles
    questionCollapsed: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        gap: 12,
    },
    qHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    qTypeLabel: {
        fontSize: 9,
        fontWeight: '900',
        color: Colors.primary,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    qTextPreview: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '600',
        marginTop: 2,
    },
    qPointsBadge: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    qPointsText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#6B7280',
    },
    questionExpanded: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: Spacing.lg,
        borderWidth: 1.5,
        borderColor: Colors.primary,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },
    qHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    qTypeTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: Colors.primary,
    },
    qInput: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: Spacing.md,
        fontSize: 15,
        color: '#111827',
        minHeight: 80,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    addMediaBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 10,
    },
    addMediaText: {
        fontSize: 12,
        color: Colors.primary,
        fontWeight: '700',
    },
    previewImg: {
        width: '100%',
        height: 180,
        borderRadius: 12,
        marginTop: 10,
        backgroundColor: '#F3F4F6',
    },
    ptsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Spacing.md,
        gap: 8,
    },
    ptsLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#6B7280',
    },
    ptsInput: {
        width: 60,
        height: 36,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '700',
        color: '#111827',
    },
    optionsContainer: {
        gap: Spacing.sm,
    },
    choiceWrapper: {
        gap: 8,
    },
    choiceTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    choiceImgBtn: {
        padding: 8,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
    },
    choicePreviewImg: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginLeft: 32,
        backgroundColor: '#F3F4F6',
    },
    radio: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioSelected: {
        borderColor: Colors.primary,
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.primary,
    },
    optionInput: {
        flex: 1,
        height: 44,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 12,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    answerInput: {
        height: 48,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 14,
        fontWeight: '600',
    },
    pairsContainer: {
        gap: 12,
    },
    pairRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    pairInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 13,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    patternContainer: {
        gap: 8,
    },
    patternRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    patternIndex: {
        fontSize: 14,
        fontWeight: '700',
        color: '#9CA3AF',
        width: 20,
    },
    addSmallBtn: {
        fontSize: 13,
        fontWeight: '700',
        color: Colors.primary,
        marginTop: 8,
    },
    essayBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EBF2FF',
        padding: 12,
        borderRadius: 10,
        gap: 8,
    },
    essayNote: {
        fontSize: 12,
        color: Colors.primary,
        fontWeight: '600',
        flex: 1,
    },
    collapseBtn: {
        marginTop: Spacing.lg,
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    collapseBtnText: {
        fontSize: 14,
        fontWeight: '800',
        color: 'white',
    },

    // Type Selector
    typeSelector: {
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        padding: Spacing.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    selectorTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: '#111827',
        marginBottom: Spacing.md,
    },
    typeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    typeBtn: {
        width: '45%',
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        gap: 6,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    typeBtnText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#374151',
    },
    cancelLink: {
        marginTop: 16,
    },
    cancelText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#EF4444',
    },

    addQuestionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: Colors.primary,
        borderStyle: 'dashed',
        gap: 8,
        marginTop: 10,
        backgroundColor: '#F0F7FF',
    },
    addQuestionText: {
        color: Colors.primary,
        fontWeight: '800',
        fontSize: 14,
    },

    // Settings
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.lg,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    settingLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
    },
    settingSub: {
        fontSize: 11,
        color: '#9CA3AF',
        marginTop: 2,
        marginRight: 20,
    },

    // Review
    reviewCard: {
        backgroundColor: Colors.primary,
        padding: Spacing.xl,
        borderRadius: 24,
        elevation: 10,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    reviewLabel: {
        fontSize: 10,
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.7)',
        fontWeight: '900',
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    reviewTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    reviewDetail: {
        fontSize: 14,
        color: '#FFFFFF',
        marginTop: 4,
        fontWeight: '700',
        opacity: 0.95,
    },
    reviewDescription: {
        fontSize: 12,
        color: '#FFFFFF',
        marginTop: 12,
        opacity: 0.85,
        fontStyle: 'italic',
        lineHeight: 18,
    },
    reviewDivider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginVertical: 20,
    },
    totalPtsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalPtsLabel: {
        fontSize: 15,
        color: '#FFFFFF',
        fontWeight: '800',
    },
    totalPtsVal: {
        fontSize: 28,
        fontWeight: '950',
        color: '#FFFFFF',
    },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: Spacing.xl,
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#111827',
    },
    modalLabel: {
        fontSize: 14,
        fontWeight: '800',
        color: '#374151',
        marginBottom: 10,
    },
    modalSub: {
        fontSize: 11,
        color: '#9CA3AF',
        marginTop: 2,
    },
    aiTypeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 20,
    },
    aiTypeBtn: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    aiTypeBtnActive: {
        backgroundColor: '#F0F7FF',
        borderColor: Colors.primary,
    },
    aiTypeBtnText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#6B7280',
    },
    aiTypeBtnTextActive: {
        color: Colors.primary,
    },
    modalInput: {
        backgroundColor: '#F9FAFB',
        height: 50,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    ttsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    modalGenerateBtn: {
        backgroundColor: '#8B5CF6',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        borderRadius: 16,
        gap: 8,
        elevation: 4,
    },
    modalGenerateText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '800',
    },
    modalBody: {
        marginBottom: 10,
    },

    // Audio Section Styles
    audioSection: {
        backgroundColor: '#F9FAFB',
        borderRadius: 14,
        padding: 12,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    audioTitle: {
        fontSize: 12,
        fontWeight: '800',
        color: '#374151',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    audioModeRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 10,
    },
    audioModeBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    audioModeBtnActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    audioModeText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#6B7280',
    },
    audioModeTextActive: {
        color: 'white',
    },
    audioSubLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: 6,
    },
    ttsContainer: {
        gap: 8,
    },
    ttsInput: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        fontSize: 13,
        color: '#111827',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        minHeight: 60,
        textAlignVertical: 'top',
    },
    audioActionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        backgroundColor: '#F0F7FF',
        paddingVertical: 8,
        borderRadius: 8,
    },
    audioActionText: {
        fontSize: 11,
        fontWeight: '700',
        color: Colors.primary,
    },
    recordContainer: {
        gap: 8,
    },
    recordControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    recordBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#FEF2F2',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FEE2E2',
    },
    recordBtnText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#EF4444',
    },
    playBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ttsInputContainer: {
        position: 'relative',
    },
    aiWriteBtn: {
        position: 'absolute',
        right: 8,
        bottom: 8,
        backgroundColor: '#8B5CF6',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    aiWriteBtnText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '700',
    }
});
