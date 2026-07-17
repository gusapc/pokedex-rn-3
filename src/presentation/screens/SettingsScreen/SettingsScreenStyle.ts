import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { padding: 16, gap: 16, paddingBottom: 40 },
    swatchesRow: { flexDirection: 'row', justifyContent: 'space-evenly' },
    swatchColumn: { alignItems: 'center', gap: 6 },
    swatchWrapper: { borderWidth: 3, borderColor: 'transparent', borderRadius: 36, padding: 3 },
    ball: { width: 56, height: 56, borderRadius: 28, overflow: 'hidden' },
    ballTop: { flex: 1 },
    ballBottom: { flex: 1, backgroundColor: '#FFFFFF' },
    ballBand: {
        position: 'absolute',
        top: 26,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: '#222222',
    },
    ballButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        borderWidth: 4,
        borderColor: '#222222',
    },
    languagesRow: { flexDirection: 'row', gap: 12 },
    languageChip: { borderRadius: 20, borderWidth: 1, paddingHorizontal: 20, paddingVertical: 10 },
});