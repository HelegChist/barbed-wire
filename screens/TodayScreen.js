import React from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { useFocusEffect } from '@react-navigation/native';
import { GET_ACTIVE_WORKDAY } from '../utils/sqlQueries';

const TodayScreen = ({navigation}) => {
    const db = useSQLiteContext();

    useFocusEffect(React.useCallback(() => {
        getNotClosedDayId().then(findWorkday => {
            if (findWorkday) {
                navigation.navigate('ActiveWorkdayScreen', {workday: findWorkday});
            } else {
                navigation.navigate('WorkdayHistoryScreen');
            }
        });

    }, []));

    const getNotClosedDayId = async () => {
        return db.getFirstAsync(GET_ACTIVE_WORKDAY);
    };
};

export default TodayScreen;