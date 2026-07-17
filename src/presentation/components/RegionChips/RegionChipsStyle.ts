import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    scroll: { flexGrow: 0, flexShrink: 0 },
    container: { paddingHorizontal: 16, paddingVertical: 10, gap: 10, alignItems: 'center' },
    chip: {
        borderRadius: 22,
        borderWidth: 1,
        paddingHorizontal: 18,
        paddingVertical: 10,
        minHeight: 44,
        justifyContent: 'center',
    },
});