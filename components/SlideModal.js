import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BACKGROUND_COLOR, PLACEHOLDER_COLOR } from '../constants/Color';

const SlideModal = props => {

    return (
        <Modal animationType="slide" transparent={true} visible={props.visible}>
            <View style={styles.modalContent}>
                <View style={styles.modalView}>
                    <View style={styles.contentView}>
                        <TouchableOpacity style={{direction: 'rtl'}} onPress={() => props.setVisible(false)}>
                            <Ionicons name="close-circle-outline" size={40} color={PLACEHOLDER_COLOR}/>
                        </TouchableOpacity>
                    </View>
                    <>
                        {props.children}
                    </>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalView: {
        width: '100%',
        height: '99%',
        backgroundColor: BACKGROUND_COLOR,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    contentView: {
        justifyContent: 'space-between'
    }
});

export default SlideModal;