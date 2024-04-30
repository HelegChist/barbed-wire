import React from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import { GET_ALL_WORKDAY } from '../utils/sqlQueries';
import { BORDER_COLOR, ITEM_BACKGROUND_COLOR, PLACEHOLDER_COLOR, TEXT_COLOR } from '../constants/Color';

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
        <View style={styles.item}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>{props.startTo}</Text>
                <Text>{props.endTo}</Text>
                <Text>{props.total}</Text>
            </View>
        </View>
    );

    return (
        <>
            <FlatList data={history} renderItem={({item}) => <Item props={item}/>}/>
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
    }
});


export default WorkdayHistory;