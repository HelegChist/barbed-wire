import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import { GET_ALL_WORKDAY } from '../utils/sqlQueries';
import { listStyle, textStyle } from '../style';
import { ACTIVE_COLOR } from '../constants/Color';
import { formatDataTime, period } from '../utils/DateTimeUtils';
import { useFocusEffect } from '@react-navigation/native';

const WorkdayHistoryScreen = ({navigation}) => {
    const db = useSQLiteContext();
    const [history, setHistory] = React.useState([]);

    useFocusEffect(React.useCallback(() => {
        loadAllDay().then(workdays => {
            setHistory(workdays);
        });
    }, []));

    const loadAllDay = async () => {
        return db.getAllAsync(GET_ALL_WORKDAY);
    };

    const HistoryItem = ({props}) => (
        <View style={listStyle.item}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 0.7}}>
                    <Text numberOfLines={1}
                          adjustsFontSizeToFit={true}
                          style={textStyle.item}>{formatDataTime(props.startTo)}
                    </Text>
                    <Text numberOfLines={1}
                          adjustsFontSizeToFit={true}
                          style={textStyle.item}>{period(props.startTo, props.endTo)}</Text>
                </View>
                <View style={{flex: 0.3}}>
                    <Text style={{...textStyle.item, alignSelf: 'flex-end'}}>Итог: </Text>
                    <Text numberOfLines={1}
                          adjustsFontSizeToFit={true}
                          style={{
                              color: ACTIVE_COLOR,
                              fontSize: 24,
                              textAlignVertical: 'center',
                              alignSelf: 'flex-end'
                          }}>{props.result.toFixed(2)}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <FlatList style={listStyle.container}
                  data={history}
                  renderItem={({item}) => <HistoryItem props={item}/>}
        />
    );
};

export default WorkdayHistoryScreen;