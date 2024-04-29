import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ACTIVE_COLOR } from '../constants/Color';

const AddButton = ({onAddPress}) => {
    return (
        <TouchableOpacity style={styles.cont} onPress={onAddPress}>
            <Image
                source={require('../assets/plus.png')}
                style={styles.image}
            />
        </TouchableOpacity>
    );
};

export default AddButton;

const styles = StyleSheet.create({
    cont: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        zIndex: 1,
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        tintColor: ACTIVE_COLOR,
        height: 45,
        width: 45,
    },
});