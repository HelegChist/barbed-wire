import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import { GET_ALL_NOMENCLATURES, INSERT_PRODUCTION } from '../utils/sqlQueries';
import { BORDER_COLOR, ITEM_BACKGROUND_COLOR } from '../constants/Color';

export const AddNewProduct = props => {
    const db = useSQLiteContext();

    const getNomenclatures = () => {
        return db.getAllSync(GET_ALL_NOMENCLATURES)
    }

    const Item = ({id, price, name}) => (
        <TouchableOpacity style={styles.item} onPress={() => props.callback(id)}>
            <View>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.price}>{price}</Text>
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <FlatList data={getNomenclatures()}
                      renderItem={({item}) =>
                          <Item id={item.id} price={item.price} name={item.name}/>
                      }
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

