import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    bar: {},
    stripe: {
        height: 10,
    },
    pokePoint: {
        position: 'absolute',
        alignSelf: 'center',
        top: -10,
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 7,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    label: {
        fontWeight: 'bold',
        marginLeft: 6,
    },
});