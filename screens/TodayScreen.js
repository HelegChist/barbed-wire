import React from 'react';
import { Text, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ActiveWorkday from '../components/ActiveWorkday';
import FinishButton from '../components/FinishButton';

const TodayScreen = () => {
    const db = useSQLiteContext();
    const isFocused = useIsFocused();
    const nav = useNavigation();


    const [newWorkday, setIsNewWorkday] = React.useState(true);
    const [productions, setProductions] = React.useState([]);

    React.useEffect(() => {
        const id = getNotClosedDayId();
        if (id) {
            setProductions(loadWorkdayById(id));
            setIsNewWorkday(false);
            nav.setOptions({
                headerRight: () => <FinishButton onAddPress={() => {}}></FinishButton>,
            });
        } else {
            setIsNewWorkday(true);
        }
    }, [isFocused]);

    const getNotClosedDayId = () => {
        let firstSync = db.getFirstSync('SELECT * FROM workday w WHERE w.end_to IS NULL');
        return firstSync.id;
    }

    const loadWorkdayById = (id) => {
        return db.getAllSync(`
            SELECT w.id, n.name, COUNT(n.name) as count, SUM(n.price) as sum
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

    return <ActiveWorkday productions={productions}/>;
};

export default TodayScreen;