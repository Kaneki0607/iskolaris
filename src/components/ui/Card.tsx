import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    onPress?: () => void;
    variant?: 'elevated' | 'outlined' | 'flat';
}

export const Card: React.FC<CardProps> = ({ children, style, onPress, variant = 'elevated' }) => {
    const CardContainer = onPress ? TouchableOpacity : View;

    const getVariantStyle = () => {
        switch (variant) {
            case 'outlined':
                return styles.outlined;
            case 'flat':
                return styles.flat;
            default:
                return styles.elevated;
        }
    };

    return (
        <CardContainer
            style={[styles.base, getVariantStyle(), style]}
            onPress={onPress}
            activeOpacity={onPress ? 0.7 : 1}
        >
            {children}
        </CardContainer>
    );
};

const styles = StyleSheet.create({
    base: {
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: Spacing.md,
    },
    elevated: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    outlined: {
        borderWidth: 1,
        borderColor: Colors.border,
    },
    flat: {
        backgroundColor: Colors.background,
    },
});

export default Card;
