import React from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import { useSQLiteContext } from 'expo-sqlite/next';
import { DELETE_RATIO, GET_ALL_RATIO, INSERT_RATIO } from '../utils/sqlQueries';
import { listStyle, textStyle } from '../style';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PLACEHOLDER_COLOR } from '../constants/Color';
import AddButton from '../components/AddButton';

const RatioScreen = ({navigation}) => {

    const db = useSQLiteContext();
    const [data, setData] = React.useState([]);

    useFocusEffect(React.useCallback(() => {
        loadData();
        const tabNavigator = navigation.getParent();
        if (tabNavigator) {
            tabNavigator.setOptions({
                headerTitle: 'Коэффициенты',
                headerRight: () => <BackButton onAddPress={navigation.goBack}/>
            });
        }
    }, [navigation]));

    const loadData = () => {
        setData(db.getAllSync(GET_ALL_RATIO));
    };

    const deleteRatio = (id) => {
        db.runSync(DELETE_RATIO, id);
        loadData();
    };

    const Item = ({props}) => (
        <View style={{...listStyle.item, justifyContent: 'space-between'}}>
            <View>
                <Text style={textStyle.item}>{props.name}</Text>
                <Text style={textStyle.header}>{props.value}</Text>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => deleteRatio(props.id)}
                    style={{flex: 1, justifyContent: 'center'}}>
                    <Ionicons name="trash" size={32} color={PLACEHOLDER_COLOR}/>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={listStyle.container}>
            <FlatList
                data={data}
                renderItem={({item}) => <Item props={item}/>}
                keyExtractor={item => item.id}
            />
            <AddButton onAddPress={() => navigation.navigate('ItemFormModal', {
                insertScript: INSERT_RATIO,
                name1: 'Коэффициент',
                name2: 'Множитель',
            })}/>
        </SafeAreaView>
    );
};

export default RatioScreen;