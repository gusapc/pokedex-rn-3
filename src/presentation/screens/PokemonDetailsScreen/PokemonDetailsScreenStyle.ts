import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingBottom: 12,
    },
    headerSpacer: { width: 32 },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    content: { padding: 16, gap: 10, paddingBottom: 60 },
    image: { width: 180, height: 180, alignSelf: 'center' },
    typesRow: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
    typeChip: { borderRadius: 14, paddingHorizontal: 12, paddingVertical: 4 },
    measuresRow: { flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 8 },
    measure: { alignItems: 'center', gap: 2 },
    abilityRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 },
    addButton: { marginTop: 16 },
});