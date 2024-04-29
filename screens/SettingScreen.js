import {
    DeviceEventEmitter,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { BORDER_COLOR, ITEM_BACKGROUND_COLOR, PLACEHOLDER_COLOR, TEXT_COLOR } from '../constants/Color';
import React from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import Ionicons from '@expo/vector-icons/Ionicons';
import AddButton from '../components/AddButton';

const SettingScreen = ({navigation}) => {
    DeviceEventEmitter.addListener("event.updateBd", () => getData());

    const db = useSQLiteContext();
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        db.withTransactionAsync(async () => await getData());
    }, [db]);

    async function getData() {
        const result = await db.getAllAsync('SELECT * FROM nomenclature');
        setData(result);
    }

    async function deleteNomenclature(id) {
        await db.getAllAsync(`DELETE
                              FROM nomenclature
                              WHERE id = ?`, id);
        await getData();
    }

    const Item = ({props}) => (
        <View style={styles.item}>
            <View>
                <Text style={styles.title}>{props.name}</Text>
                <Text style={styles.price}>{props.price}</Text>
            </View>
            <TouchableOpacity
                onPress={() => deleteNomenclature(props.id)}
                style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                <Ionicons name='trash' size={32} color={PLACEHOLDER_COLOR}/>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={({item}) => <Item props={item}/>}
                keyExtractor={item => item.id}
            />
            <AddButton onAddPress={() => navigation.navigate('ItemFormModal')}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        marginLeft: 8,
        marginRight: 8,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: ITEM_BACKGROUND_COLOR,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        padding: 20,
        marginVertical: 8,
        borderRadius: 8,
    },
    title: {
        color: TEXT_COLOR,
        fontSize: 18,
    },
    price: {
        color: TEXT_COLOR,
        fontSize: 32,
    },
});

export default SettingScreen;