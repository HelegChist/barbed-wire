import React from 'react';
import { View, Text } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite/next';
import { useIsFocused } from '@react-navigation/native';

const TodayScreen = () => {
    const db = useSQLiteContext();
    const isFocused = useIsFocused();

    const [newWorkday, setIsNewWorkday] = React.useState(true);
    const [productions, setProductions] = React.useState([]);

    React.useEffect(() => {
        const id = getNotClosedDayId();
        if (id) {
            setProductions(loadWorkdayById(id));
            setIsNewWorkday(false);
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
            SELECT n.name, COUNT(n.name) as count, SUM(n.price) as sum
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
            </View>);
    }

    return (
        <View>
            <Text>${JSON.stringify(productions)}</Text>
            <Text>Закрыть день</Text>
        </View>
    );
};

export default TodayScreen;