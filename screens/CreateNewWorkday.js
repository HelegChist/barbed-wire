import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { listStyle, textStyle } from '../style';
import StartButton from '../components/StartButton';
import { COLOR, ITEM_BACKGROUND_COLOR, PALE_ACTIVE_COLOR } from '../constants/Color';
import { GET_ALL_RATIO, INSERT_WORKDAY } from '../utils/sqlQueries';
import { useSQLiteContext } from 'expo-sqlite/next';

export const CreateNewWorkday = ({navigation}) => {
    const db = useSQLiteContext();

    const [rate, setRate] = React.useState();

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
    );

}

