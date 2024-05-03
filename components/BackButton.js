import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ACTIVE_COLOR, TEXT_COLOR } from '../constants/Color';

const BackButton = ({onAddPress}) => {
    return (
        <TouchableOpacity style={{marginRight:25}} onPress={onAddPress}>
            <Ionicons name="arrow-back-outline" size={25} color={ACTIVE_COLOR}/>
        </TouchableOpacity>
    );
};

export default BackButton;