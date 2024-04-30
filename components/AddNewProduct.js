import React from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import { GET_ALL_NOMENCLATURES, INSERT_PRODUCTION } from '../utils/sqlQueries';
import { BORDER_COLOR, ITEM_BACKGROUND_COLOR } from '../constants/Color';

export const AddNewProduct = props => {
    const db = useSQLiteContext();

    const getNomenclatures = () => {
        return db.getAllSync(GET_ALL_NOMENCLATURES)
    }

    const insertProduct = (nomenclatureId) => {
        db.runSync(INSERT_PRODUCTION, nomenclatureId, props.workdayId);
        props.callback();
    }

    const Item = ({props}) => (
        <TouchableOpacity style={styles.item} onPress={() => insertProduct(props.id)}>
            <View>
                <Text style={styles.title}>{props.name}</Text>
                <Text style={styles.price}>{props.price}</Text>
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <FlatList data={getNomenclatures()}
                      renderItem={({item}) => <Item props={item}/>}
                      keyExtractor={item => item.id}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    }
});

