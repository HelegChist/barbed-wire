import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import { GET_ALL_WORKDAY } from '../utils/sqlQueries';
import { listStyle, textStyle } from '../style';
import { ACTIVE_COLOR } from '../constants/Color';

const WorkdayHistory = props => {
    const db = useSQLiteContext();
    const [history, setHistory] = React.useState([])

    React.useEffect(() => {
        setHistory(loadAllDay());
    }, []);

    const loadAllDay = () => {
        return db.getAllSync(GET_ALL_WORKDAY);
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
        </>
    );
}

const styles = StyleSheet.create({});


export default WorkdayHistory;