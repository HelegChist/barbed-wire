import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DarculaTheme from './constants/DarculaTheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigators from './navigations/TabNavigators';
import { init, openDatabase } from './db/sqlUtil';

function App() {
    const [dbLoaded, setDbLoaded] = React.useState(false);

    React.useEffect(() => {
        const db = openDatabase()
            .then(db => {
                setDbLoaded(true);
                db.transaction((tx) => {
                    tx.executeSql(
                        "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, value  TEXT NOT NULL, completed BOOLEAN NOT NULL)"
                    );
                    tx.executeSql(
                        "INSERT INTO tasks (value, completed) VALUES ('12313', true);"
                    );
                    db.transaction((tx) => {
                        tx.executeSql(
                            "SELECT * FROM tasks;",
                            undefined,
                            (_, { rows: { _array } }) => console.log(_array),
                            (_, error) => console.log(error)
                        );
                    });
                });
            })
            .catch((e) => console.error(e));


    }, []);


    return (
        <SafeAreaProvider>
            <NavigationContainer theme={DarculaTheme}>
                <TabNavigators/>
            </NavigationContainer>
        </SafeAreaProvider>

    );
}

export default App
