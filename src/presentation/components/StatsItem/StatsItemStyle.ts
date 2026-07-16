import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, gap: 8 },
    name: { width: 110 },
    value: { width: 36, alignItems: 'flex-end' },
    track: { flex: 1, height: 8, borderRadius: 4, overflow: 'hidden' },
    fill: { height: '100%', borderRadius: 4 },
});