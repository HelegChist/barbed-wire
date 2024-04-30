import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import { useIsFocused } from '@react-navigation/native';
import ActiveWorkday from '../components/ActiveWorkday';
import FinishButton from '../components/FinishButton';
import { FINISH_ACTIVE_WORKDAY, GET_ACTIVE_WORKDAY, GET_PRODUCTION } from '../utils/sqlQueries';
import WorkdayHistory from '../components/WorkdayHistory';

const TodayScreen = ({navigation}) => {
    DeviceEventEmitter.addListener("event.recalculateWorkday",
        () => setProductions(loadWorkdayById(workdayId)));

    const db = useSQLiteContext();
    const isFocused = useIsFocused();

    const [newWorkday, setIsNewWorkday] = React.useState(true);
    const [workdayId, setWorkdayId] = React.useState();
    const [productions, setProductions] = React.useState([]);

    React.useEffect(() => {
        if (!isFocused) {
            return;
        }
        const workday = getNotClosedDayId();
        if (workday !== null) {
            setWorkdayId(workday.id);
            setProductions(loadWorkdayById(workday.id));
            setIsNewWorkday(false);
        } else {
            setIsNewWorkday(true);
            navigation.setOptions({
                title: 'Рабочий период',
                headerRight: () => null,
            });
        }
    }, [isFocused]);

    React.useEffect(() => {
        if (!productions) {
            return;
        }
        const sum = productions.map(product => product.sum).reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0);
        navigation.setOptions({
            title: "Итог: " + sum,
            headerRight: () => <FinishButton onAddPress={() => finishWorkday()}/>,
        });
    }, [productions])

    const getNotClosedDayId = () => {
        return db.getFirstSync(GET_ACTIVE_WORKDAY);
    }

    const loadWorkdayById = (id) => {
        return db.getAllSync(GET_PRODUCTION, id);
    }

    const finishWorkday = () => {
        db.runSync(FINISH_ACTIVE_WORKDAY, workdayId);
        setWorkdayId(null);
        setProductions(null);
        setIsNewWorkday(true);
        navigation.setOptions({title: "Рабочий период", headerRight: () => null,});
    }

    if (newWorkday) {
        return <WorkdayHistory/>
    }
    return <ActiveWorkday productions={productions} workdayId={workdayId}/>;
};

export default TodayScreen;