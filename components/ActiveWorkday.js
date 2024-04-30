import React from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BORDER_COLOR, ITEM_BACKGROUND_COLOR, PLACEHOLDER_COLOR, TEXT_COLOR } from '../constants/Color';
import Ionicons from '@expo/vector-icons/Ionicons';
import AddButton from './AddButton';
import SlideModal from './SlideModal';
import { AddNewProduct } from './AddNewProduct';

const ActiveWorkday = props => {

    const [openModal, setOpenModal] = React.useState(false)

    const Item = ({props}) => (
        <View style={styles.item}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.title}>{props.name}</Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{justifyContent: 'center'}}>
                        <Ionicons name="remove-circle-outline" size={32}
                                  color={PLACEHOLDER_COLOR}/>
                    </TouchableOpacity>
                    <Text style={styles.count}>{props.count}</Text>
                    <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => {
                    }}>
                        <Ionicons name="add-circle-outline" size={32} color={PLACEHOLDER_COLOR}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <>
            <View style={styles.container}>
                <FlatList
                    data={props.productions}
                    renderItem={({item}) => <Item props={item}/>}
                    keyExtractor={item => item.id}
                />
                <AddButton onAddPress={() => setOpenModal(true)}/>
            </View>
            <SlideModal visible={openModal} setVisible={setOpenModal}>
                <AddNewProduct workdayId={props.workdayId}/>
            </SlideModal>
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        marginLeft: 8,
        marginRight: 8
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor:
        ITEM_BACKGROUND_COLOR,
        borderWidth: 1,
        borderColor:
        BORDER_COLOR,
        padding: 20,
        marginVertical: 8,
        borderRadius: 8,
    },
    title: {
        color: TEXT_COLOR,
        fontSize: 18,
    },
    count: {
        marginLeft: 12,
        marginRight: 12,
        textAlign: 'center',
        justifyContent: 'center',
        color: TEXT_COLOR,
        fontSize: 32,
    },
});

export default ActiveWorkday;