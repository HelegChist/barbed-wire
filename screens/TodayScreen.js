import React from 'react';
import { DeviceEventEmitter, Text, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import { useIsFocused } from '@react-navigation/native';
import ActiveWorkday from '../components/ActiveWorkday';
import FinishButton from '../components/FinishButton';

const TodayScreen = ({navigation}) => {
    DeviceEventEmitter.addListener("event.recalculateWorkday",
        () => setProductions(loadWorkdayById(workdayId)));

    const db = useSQLiteContext();
    const isFocused = useIsFocused();

    const [newWorkday, setIsNewWorkday] = React.useState(true);
    const [workdayId, setWorkdayId] = React.useState();
    const [productions, setProductions] = React.useState([]);

    React.useEffect(() => {
        const id = getNotClosedDayId();
        if (id) {
            setWorkdayId(id);
            setProductions(loadWorkdayById(id));
            setIsNewWorkday(false);

        } else {
            setIsNewWorkday(true);
        }
    }, [isFocused]);

    React.useEffect(() => {
        const sum = productions.map(product => product.sum).reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0);
        navigation.setOptions({
            title: "Итог: " + sum,
            headerRight: () => <FinishButton onAddPress={() => {
            }}></FinishButton>,
        });
    }, [productions])

    const getNotClosedDayId = () => {
        let firstSync = db.getFirstSync('SELECT * FROM workday w WHERE w.end_to IS NULL');
        return firstSync.id;
    }

    const loadWorkdayById = (id) => {
        return db.getAllSync(`
            SELECT n.id, n.name, COUNT(n.name) as count, SUM(n.price) as sum
            FROM workday w
                JOIN production p
            ON w.id = p.workday_id
                JOIN nomenclature n ON n.id = p.nomenclature_id
            WHERE w.id = ?
            GROUP BY p.nomenclature_id;`, id);
    }

    if (newWorkday) {
        return (
            <View>
                <Text>Создать новый день</Text>
            </View>
        );
    }

    return <ActiveWorkday productions={productions} workdayId={workdayId}/>;
};

export default TodayScreen;