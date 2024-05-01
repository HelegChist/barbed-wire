import { StyleSheet } from 'react-native';
import { BORDER_COLOR, ITEM_BACKGROUND_COLOR, TEXT_COLOR } from './constants/Color';

export const listStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 8,
        marginRight: 8
    },
    item: {
        flex: 1,
        backgroundColor: ITEM_BACKGROUND_COLOR,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        padding: 20,
        marginVertical: 8,
        borderRadius: 8,
    }
});

export const textStyle = StyleSheet.create({
    item: {
        color: TEXT_COLOR,
        fontSize: 18
    },
    header: {
        color: TEXT_COLOR,
        fontSize: 32,
        fontWeight: '700',
        textAlign: 'center',
    }
});
