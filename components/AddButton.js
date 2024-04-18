import { Image, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { ACTIVE_COLOR, ITEM_BACKGROUND_COLOR } from '../constants/Color';

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
        alignSelf: 'center',
        marginBottom: StatusBar.currentHeight || 0,
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: ITEM_BACKGROUND_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        tintColor: ACTIVE_COLOR,
        height: 50,
        width: 50,
    },
});