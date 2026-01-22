import { Platform } from 'react-native';

export const Typography = {
    fontFamily: Platform.select({
        ios: 'System',
        android: 'Roboto',
        default: 'System',
    }),
    sizes: {
        hero: 32,
        h1: 24,
        h2: 20,
        h3: 18,
        body: 16,
        caption: 14,
        small: 12,
    },
    weights: {
        regular: '400',
        medium: '500',
        bold: '700',
    } as const,
};

export default Typography;
