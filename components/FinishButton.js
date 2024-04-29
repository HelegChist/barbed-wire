import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TEXT_COLOR } from '../constants/Color';

const FinishButton = ({onAddPress}) => {
    return (
        <TouchableOpacity style={{marginRight:25}} onPress={onAddPress}>
            <Ionicons name="exit-outline" size={32} color={TEXT_COLOR}/>
        </TouchableOpacity>
    );
};

export default FinishButton;