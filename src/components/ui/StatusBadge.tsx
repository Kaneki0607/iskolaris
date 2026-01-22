import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface StatusBadgeProps {
    label: string;
    type?: StatusType;
    style?: ViewStyle;
}

const STATUS_COLORS: Record<StatusType, { bg: string; text: string }> = {
    success: { bg: '#DCFCE7', text: '#166534' },
    warning: { bg: '#FEF3C7', text: '#92400E' },
    error: { bg: '#FEE2E2', text: '#991B1B' },
    info: { bg: '#DBEAFE', text: '#1E40AF' },
    neutral: { bg: '#F3F4F6', text: '#374151' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ label, type = 'neutral', style }) => {
    const colors = STATUS_COLORS[type];

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }, style]}>
            <Text style={[styles.text, { color: colors.text }]}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    text: {
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
});

export default StatusBadge;
