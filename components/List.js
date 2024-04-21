import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { BORDER_COLOR, ITEM_BACKGROUND_COLOR, TEXT_COLOR } from '../constants/Color';
import AddButton from './AddButton';
import React from 'react';

const Item = ({props}) => (
    <View style={styles.item}>
        <Text style={styles.title}>{props.nomenclature}</Text>
        <Text style={styles.price}>{props.price}</Text>
    </View>
);
export default function List({navigation}) {

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            nomenclature: 'Гайка М8',
            price: 23,
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            nomenclature: 'Сфера радиус 99',
            price: 150,
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            nomenclature: 'Шпиндель',
            price: 200,
        },
    ];

    const [data] = React.useState(DATA);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={({item}) => <Item props={item} />}
                keyExtractor={item => item.id}
            />
            <AddButton onAddPress={() => navigation.navigate('ItemFormModal', data)}/>
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
