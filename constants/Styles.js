import { StyleSheet } from 'react-native';
import { BORDER_COLOR, TEXT_COLOR } from './Color';

export const GlobalStyles = StyleSheet.create({
    input: {
        height: 60,
        margin: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        padding: 10,
        color: TEXT_COLOR,
    },
});

