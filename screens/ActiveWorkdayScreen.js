import React from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BORDER_COLOR, ITEM_BACKGROUND_COLOR, PLACEHOLDER_COLOR, TEXT_COLOR } from '../constants/Color';
import Ionicons from '@expo/vector-icons/Ionicons';
import AddButton from '../components/AddButton';
import SlideModal from '../components/SlideModal';
import { AddNewProduct } from '../components/AddNewProduct';
import { useSQLiteContext } from 'expo-sqlite/next';
import {
    DELETE_LAST_PRODUCTION,
    FINISH_ACTIVE_WORKDAY,
    GET_ALL_NOMENCLATURES,
    GET_PRODUCTION,
    INSERT_PRODUCTION
} from '../utils/sqlQueries';
import FinishButton from '../components/FinishButton';

const ActiveWorkdayScreen = ({navigation, route}) => {
    const db = useSQLiteContext();
    const parentNavigation = navigation.getParent();

    const [openModal, setOpenModal] = React.useState(false);
    const {workday} = route.params;
    const [productions, setProductions] = React.useState([]);

    React.useEffect(() => {
        loadWorkdayById(workday.id);
    }, []);

    React.useEffect(() => {
        if (!productions) {
            return;
        }
        parentNavigation.setOptions({
            title: 'Итог: ' + calculateSum(),
            headerRight: () => <FinishButton onAddPress={() => finishWorkday()}/>,
        });
    }, [productions]);

    const calculateSum = () => {
        let sum = productions.map(product => product.sum).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
        if (workday.ratio) {
            sum *= workday.ratio;
        }
        return sum;
    };

    const loadWorkdayById = () => {
        return setProductions(db.getAllSync(GET_PRODUCTION, workday.id));
    };

    const addProduct = (nomenclatureId) => {
        db.runAsync(INSERT_PRODUCTION, nomenclatureId, workday.id)
            .then(() => loadWorkdayById());
        setOpenModal(false);
    };

    const removeProduct = (nomenclatureId) => {
        db.runAsync(DELETE_LAST_PRODUCTION, nomenclatureId, workday.id)
            .then(() => loadWorkdayById());
    };

    const finishWorkday = () => {
        db.runAsync(FINISH_ACTIVE_WORKDAY, calculateSum(), workday.id)
            .then(() => {
                navigation.goBack();
            });
    };

    const Item = ({props}) => (
        <View style={styles.item}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.title}>{props.name}</Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => removeProduct(props.id)}>
                        <Ionicons name="remove-circle-outline" size={32}
                                  color={PLACEHOLDER_COLOR}/>
                    </TouchableOpacity>
                    <Text style={styles.count}>{props.count}</Text>
                    <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => addProduct(props.id)}>
                        <Ionicons name="add-circle-outline" size={32} color={PLACEHOLDER_COLOR}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <>
            <View style={styles.container}>
                <FlatList
                    data={productions}
                    renderItem={({item}) => <Item props={item}/>}
                    keyExtractor={item => item.id}
                />
                <AddButton onAddPress={() => setOpenModal(true)}/>
            </View>
            <SlideModal visible={openModal} setVisible={setOpenModal}>
                <AddNewProduct data={db.getAllSync(GET_ALL_NOMENCLATURES)}
                               callback={addProduct}/>
            </SlideModal>
        </>

    );
};

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
    },
    title: {
        color: TEXT_COLOR,
        fontSize: 18,
    },
    count: {
        marginLeft: 12,
        marginRight: 12,
        textAlign: 'center',
        justifyContent: 'center',
        color: TEXT_COLOR,
        fontSize: 32,
    },
});

export default ActiveWorkdayScreen;