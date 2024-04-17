import { Text, TouchableOpacity } from 'react-native';
import { ACTIVE_COLOR, BORDER_COLOR } from '../constants/Color';

const AddButton = props => {
    return (
        <TouchableOpacity style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: BORDER_COLOR,
            borderRadius: 30,
            height: 60,
            width: 60,
        }}>
            <Text style={{
                color: ACTIVE_COLOR,
                fontSize: 50,
            }}>
                {props.text}
            </Text>
        </TouchableOpacity>
    );
}

export default AddButton;