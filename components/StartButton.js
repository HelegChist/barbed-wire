import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ACTIVE_COLOR, TEXT_COLOR } from '../constants/Color';

const StartButton = ({onAddPress}) => {
    return (
        <TouchableOpacity style={{margin: 60, alignSelf: 'center'}} onPress={onAddPress}>
            <Ionicons name='enter-outline' size={60} color={ACTIVE_COLOR}/>
        </TouchableOpacity>
    );
};

export default StartButton;