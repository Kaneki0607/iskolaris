import React from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';

interface ScreenWrapperProps {
    children: React.ReactNode;
    style?: ViewStyle;
    contentContainerStyle?: ViewStyle;
    scrollable?: boolean;
    backgroundColor?: string;
    withPadding?: boolean;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
    children,
    style,
    contentContainerStyle,
    scrollable = true,
    backgroundColor = Colors.background,
    withPadding = true,
}) => {
    const insets = useSafeAreaInsets();

    const containerStyle = [
        styles.container,
        { backgroundColor, paddingTop: insets.top },
        style,
    ];

    const contentStyle = [
        withPadding && styles.padding,
        styles.webContainer,
        contentContainerStyle,
    ];

    if (scrollable) {
        return (
            <View style={containerStyle}>
                <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
                <ScrollView
                    contentContainerStyle={[contentStyle, styles.scrollContent]}
                    showsVerticalScrollIndicator={false}
                    bounces={Platform.OS === 'ios'}
                >
                    {children}
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={containerStyle}>
            <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
            <View style={[styles.flex, contentStyle]}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flex: {
        flex: 1,
    },
    padding: {
        padding: Spacing.md,
    },
    webContainer: {
        width: '100%',
        maxWidth: 480,
        alignSelf: 'center',
        flexGrow: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
});

export default ScreenWrapper;
