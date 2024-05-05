import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PALE_ACTIVE_COLOR, TEXT_COLOR } from '../constants/Color';
import { listStyle } from '../style';

export const AddNewProduct = props => {

    const Item = ({id, price, name}) => (
        <TouchableOpacity style={listStyle.item} onPress={() => props.callback(id)}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.price}>{price}</Text>
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={listStyle.container}>
            <FlatList data={props.data}
                      renderItem={({item}) =>
                          <Item id={item.id} price={item.price} name={item.name}/>
                      }
                      keyExtractor={item => item.id}/>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        color: TEXT_COLOR,
        fontSize: 18,
    },
    price: {
        marginLeft: 12,
        marginRight: 12,
        textAlign: 'center',
        justifyContent: 'center',
        color: PALE_ACTIVE_COLOR,
        fontSize: 32,
    }
});

