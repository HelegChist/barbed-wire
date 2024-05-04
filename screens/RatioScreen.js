import React from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BackButton from '../components/BackButton';

const RatioScreen = ({navigation}) => {

    useFocusEffect(React.useCallback(() => {
        const tabNavigator = navigation.getParent();
        if (tabNavigator) {
            tabNavigator.setOptions({
                headerTitle: 'Коэффициенты',
                headerRight: () => <BackButton onAddPress={navigation.goBack}/>
            });
        }
    }, [navigation]));

    return (
        <View>
            <Text>Привет</Text>
        </View>
    );
};

export default RatioScreen;