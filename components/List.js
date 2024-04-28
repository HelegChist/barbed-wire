import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { BORDER_COLOR, ITEM_BACKGROUND_COLOR, TEXT_COLOR } from '../constants/Color';
import AddButton from './AddButton';
import React from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';

const Item = ({props}) => (
    <View style={styles.item}>
        <Text style={styles.title}>{props.name}</Text>
        <Text style={styles.price}>{props.price}</Text>
    </View>
);
export default function List({navigation}) {

    const db = useSQLiteContext();
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        db.withTransactionAsync(async () => {
            await getData();
        });
    }, [db]);

    async function getData() {
        const result = await db.getAllAsync('SELECT * FROM nomenclature');
        console.log(result);
        setData(result);
    }

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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        marginLeft: 8,
        marginRight: 8,
    },
    item: {
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
