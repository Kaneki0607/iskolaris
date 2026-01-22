import React from 'react';
import { FlatList, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Typography } from '../../constants/typography';

interface Column<T> {
    header: string;
    key: keyof T | string;
    render?: (item: T) => React.ReactNode;
    flex?: number;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowPress?: (item: T) => void;
    style?: ViewStyle;
}

export function Table<T>({ data, columns, style }: TableProps<T>) {
    const renderHeader = () => (
        <View style={styles.headerRow}>
            {columns.map((col, index) => (
                <Text key={index} style={[styles.headerText, { flex: col.flex || 1 }]}>
                    {col.header}
                </Text>
            ))}
        </View>
    );

    const renderRow = ({ item }: { item: T }) => (
        <View style={styles.row}>
            {columns.map((col, index) => (
                <View key={index} style={[styles.cell, { flex: col.flex || 1 }]}>
                    {col.render ? (
                        col.render(item)
                    ) : (
                        <Text style={styles.cellText}>{String(item[col.key as keyof T])}</Text>
                    )}
                </View>
            ))}
        </View>
    );

    return (
        <View style={[styles.container, style]}>
            {renderHeader()}
            <FlatList
                data={data}
                renderItem={renderRow}
                keyExtractor={(_, index) => index.toString()}
                scrollEnabled={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        overflow: 'hidden',
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: Colors.background,
        padding: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    headerText: {
        fontSize: 10,
        fontWeight: '700',
        color: Colors.textSecondary,
        textTransform: 'uppercase',
    },
    row: {
        flexDirection: 'row',
        padding: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        alignItems: 'center',
    },
    cell: {
        justifyContent: 'center',
    },
    cellText: {
        fontSize: Typography.sizes.body,
        color: Colors.textPrimary,
    },
});
