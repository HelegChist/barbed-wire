import { DefaultTheme } from '@react-navigation/native';
import { BACKGROUND_COLOR } from './Color';

const DarculaTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: BACKGROUND_COLOR,
        border: 'black',
    },
};

export default DarculaTheme;