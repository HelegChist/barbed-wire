import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import { GET_ALL_RATIO, GET_ALL_WORKDAY, INSERT_WORKDAY } from '../utils/sqlQueries';
import { listStyle, textStyle } from '../style';
import { ACTIVE_COLOR, COLOR, ITEM_BACKGROUND_COLOR, PALE_ACTIVE_COLOR } from '../constants/Color';
import AddButton from '../components/AddButton';
import SlideModal from '../components/SlideModal';
import StartButton from '../components/StartButton';

const WorkdayHistoryScreen = ({navigation, route}) => {
    const db = useSQLiteContext();
    const parentNavigation = navigation.getParent();

    const [rate, setRate] = React.useState();
    const [history, setHistory] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);

    React.useEffect(() => {
        loadAllDay().then(workdays => {
            setHistory(workdays);
            parentNavigation.setOptions({
                title: 'Рабочий период',
                headerRight: () => null,
            });
        });
    }, []);

    const loadAllDay = async () => {
        return db.getAllAsync(GET_ALL_WORKDAY);
    };

    const loadRate = () => {
        return db.getAllSync(GET_ALL_RATIO);
    };

    const insertWorkload = () => {
        db.runAsync(INSERT_WORKDAY, rate).then(() => {
            navigation.goBack();
        });
    };

    const selectRate = (id) => {
        rate === id ? setRate(null) : setRate(id);
    };

    const HistoryItem = ({props}) => (
        <View style={listStyle.item}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <Text style={textStyle.item}>С {props.startTo}</Text>
                    <Text style={textStyle.item}>По {props.endTo}</Text>
                </View>
                <View>
                    <Text style={textStyle.item}>Итог: </Text>
                    <Text style={{color: ACTIVE_COLOR, fontSize: 24, textAlignVertical: 'center'}}>{props.result}</Text>
                </View>
            </View>
        </View>
    );

    const RateItem = ({props}) => {
        const color = props.id === rate ? COLOR : ITEM_BACKGROUND_COLOR;
        return (
            <TouchableOpacity
                style={{...listStyle.item, backgroundColor: color}}
                onPress={() => selectRate(props.id)}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={textStyle.item}>{props.name}</Text>
                    <Text style={{...textStyle.item, color: PALE_ACTIVE_COLOR}}>{props.value}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <FlatList style={listStyle.container}
                      data={history}
                      renderItem={({item}) => <HistoryItem props={item}/>}/>
            <AddButton onAddPress={() => setOpenModal(true)}/>
            <SlideModal visible={openModal} setVisible={setOpenModal}>
                <View style={{flex: 1, justifyContent: 'space-between'}}>
                    <Text style={textStyle.header}>Выберите опции:</Text>
                    <FlatList
                        style={{margin: 12}}
                        data={loadRate()}
                        renderItem={({item}) => <RateItem props={item}/>}
                        keyExtractor={item => item.id}
                    />
                    <StartButton onAddPress={() => insertWorkload()}/>
                </View>
            </SlideModal>
        </>
    );
};

export default WorkdayHistoryScreen;