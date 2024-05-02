import { DeviceEventEmitter, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { PLACEHOLDER_COLOR } from '../constants/Color';
import React from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import Ionicons from '@expo/vector-icons/Ionicons';
import AddButton from '../components/AddButton';
import { DELETE_NOMENCLATURES, GET_ALL_NOMENCLATURES } from '../utils/sqlQueries';
import { listStyle, textStyle } from '../style';

const SettingScreen = ({navigation}) => {
    DeviceEventEmitter.addListener('event.updateBd', () => getData());

    const db = useSQLiteContext();
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        getData();
    }, [db]);

    const getData = () => {
        setData(db.getAllSync(GET_ALL_NOMENCLATURES));
    };

    const deleteNomenclature = (id) => {
        db.runSync(DELETE_NOMENCLATURES, id);
        getData();
    };

    const Item = ({props}) => (
        <View style={listStyle.item}>
            <View>
                <Text style={textStyle.item}>{props.name}</Text>
                <Text style={textStyle.header}>{props.price}</Text>
            </View>
            <TouchableOpacity
                onPress={() => deleteNomenclature(props.id)}
                style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                <Ionicons name="trash" size={32} color={PLACEHOLDER_COLOR}/>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={listStyle.container}>
            <FlatList
                data={data}
                renderItem={({item}) => <Item props={item}/>}
                keyExtractor={item => item.id}
            />
            <AddButton onAddPress={() => navigation.navigate('ItemFormModal')}/>
        </SafeAreaView>
    );
};

export default SettingScreen;