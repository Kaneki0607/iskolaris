import React from 'react';
import { KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Typography } from '../../constants/typography';

interface FormInputProps {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
    error?: string;
    containerStyle?: StyleProp<ViewStyle>;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    multiline?: boolean;
    numberOfLines?: number;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    keyboardType = 'default',
    error,
    containerStyle,
    autoCapitalize = 'sentences',
    multiline,
    numberOfLines,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[
                    styles.input,
                    multiline && { height: 'auto', minHeight: 80, textAlignVertical: 'top', paddingTop: 12 },
                    error ? styles.inputError : null,
                ]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={Colors.textSecondary}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                multiline={multiline}
                numberOfLines={numberOfLines}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
    },
    label: {
        fontSize: Typography.sizes.caption,
        fontWeight: Typography.weights.medium,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        paddingHorizontal: Spacing.md,
        fontSize: Typography.sizes.body,
        color: Colors.textPrimary,
        backgroundColor: Colors.surface,
    },
    inputError: {
        borderColor: Colors.error,
    },
    errorText: {
        marginTop: Spacing.xs,
        color: Colors.error,
        fontSize: Typography.sizes.small,
    },
});

export default FormInput;
