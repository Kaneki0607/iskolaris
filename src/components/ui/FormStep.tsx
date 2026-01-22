import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Typography } from '../../constants/typography';

interface FormStepProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

export const FormStep: React.FC<FormStepProps> = ({
    title,
    description,
    children,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {description && <Text style={styles.description}>{description}</Text>}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.lg,
    },
    title: {
        fontSize: Typography.sizes.h2,
        fontWeight: Typography.weights.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
    },
    description: {
        fontSize: Typography.sizes.body,
        color: Colors.textSecondary,
        marginBottom: Spacing.md,
    },
    content: {
        marginTop: Spacing.xs,
    },
});

export default FormStep;
