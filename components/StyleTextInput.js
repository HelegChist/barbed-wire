import { TextInput } from 'react-native';
import { ACTIVE_COLOR, PALE_ACTIVE_COLOR } from '../constants/Color';
import { GlobalStyles } from '../constants/Styles';

const StyleTextInput = props => {
    return (
        <TextInput
            cursorColor={ACTIVE_COLOR}
            style={GlobalStyles.input}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            value={props.value}
            placeholderTextColor={props.color}
            keyboardType={props.keyboardType}
        />
    );
}

export default StyleTextInput;