import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#101418' },
    title: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
    subtitle: { color: '#7d8a97', fontSize: 12, marginBottom: 12 },
    btn: {
        backgroundColor: '#1c2530',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginBottom: 8,
    },
    btnText: { color: '#8ecafc', fontFamily: 'Courier', fontSize: 13 },
    meta: { color: '#f5c93f', fontFamily: 'Courier', fontSize: 12, marginVertical: 8 },
    json: { color: '#9fe8a9', fontFamily: 'Courier', fontSize: 11, lineHeight: 16 },
});