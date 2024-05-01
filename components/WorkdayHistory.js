import React from 'react';
import { DeviceEventEmitter, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import { GET_ALL_WORKDAY, INSERT_WORKDAY } from '../utils/sqlQueries';
import { listStyle, textStyle } from '../style';
import { ACTIVE_COLOR } from '../constants/Color';
import AddButton from './AddButton';
import SlideModal from './SlideModal';
import StartButton from './StartButton';

const WorkdayHistory = () => {
    const db = useSQLiteContext();
    const [history, setHistory] = React.useState([])
    const [openModal, setOpenModal] = React.useState(false)

    React.useEffect(() => {
        setHistory(loadAllDay());
    }, []);

    const loadAllDay = () => {
        return db.getAllSync(GET_ALL_WORKDAY);
    }

    const insertWorkload = () => {
        db.runSync(INSERT_WORKDAY);
        DeviceEventEmitter.emit("event.recalculateWorkday");
        setOpenModal(false);
    }

    const Item = ({props}) => (
        <View style={listStyle.item}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <Text style={textStyle.item}>С {props.startTo}</Text>
                    <Text style={textStyle.item}>По {props.endTo}</Text>
                </View>
                <View>
                    <Text style={textStyle.item}>Итог: </Text>
                    <Text style={{color: ACTIVE_COLOR, fontSize: 24, textAlignVertical: 'center'}}>{props.total}</Text>
                </View>
            </View>
        </View>

    );

    return (
        <>
            <FlatList style={listStyle.container}
                      data={history}
                      renderItem={({item}) => <Item props={item}/>}/>
            <AddButton onAddPress={() => setOpenModal(true)}/>
            <SlideModal visible={openModal} setVisible={setOpenModal}>
                <View style={{flex: 1, justifyContent: 'space-between'}}>
                    <Text style={textStyle.header}>Выберите опции:</Text>
                    <StartButton onAddPress={() => insertWorkload()}/>
                </View>
            </SlideModal>
        </>
    );
}

const styles = StyleSheet.create({});


export default WorkdayHistory;