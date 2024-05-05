import React from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { useFocusEffect } from '@react-navigation/native';
import ActiveWorkday from '../components/ActiveWorkday';
import FinishButton from '../components/FinishButton';
import { FINISH_ACTIVE_WORKDAY, GET_ACTIVE_WORKDAY, GET_PRODUCTION } from '../utils/sqlQueries';
import WorkdayHistory from '../components/WorkdayHistory';

const TodayScreen = ({navigation}) => {
    const db = useSQLiteContext();
    const [newWorkday, setIsNewWorkday] = React.useState(true);
    const [workday, setWorkday] = React.useState({});
    const [productions, setProductions] = React.useState([]);

    useFocusEffect(React.useCallback(() => {
        const findWorkday = getNotClosedDayId();
        if (findWorkday) {
            setWorkday(findWorkday);
            setProductions(loadWorkdayById(findWorkday.id));
            setIsNewWorkday(false);
        } else {
            setIsNewWorkday(true);
            navigation.setOptions({
                title: 'Рабочий период',
                headerRight: () => null,
            });
        }
    }, []));

    React.useEffect(() => {
        if (!productions) {
            return;
        }
        const sum = productions.map(product => product.sum).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
        navigation.setOptions({
            title: 'Итог: ' + sum,
            headerRight: () => <FinishButton onAddPress={() => finishWorkday()}/>,
        });
    }, [productions]);

    const callback = () => {
        setProductions(loadWorkdayById(workday.id));
    };

    const getNotClosedDayId = () => {
        return db.getFirstSync(GET_ACTIVE_WORKDAY);
    };

    const loadWorkdayById = (id) => {
        return db.getAllSync(GET_PRODUCTION, id);
    };

    const finishWorkday = () => {
        db.runSync(FINISH_ACTIVE_WORKDAY, workday.id);
        setWorkday(null);
        setProductions(null);
        setIsNewWorkday(true);
        navigation.setOptions({title: 'Рабочий период', headerRight: () => null,});
    };

    if (newWorkday) {
        return <WorkdayHistory setWorkdayId={setWorkday}/>;
    }
    return <ActiveWorkday productions={productions} workday={workday} callback={callback}/>;
};

export default TodayScreen;