import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DarculaTheme from './constants/DarculaTheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigators from './navigations/TabNavigators';
import { loadDatabase } from './utils/FileUtils';
import { SQLiteProvider } from 'expo-sqlite/next';

function App() {

    React.useEffect(() => {
        loadDatabase()
            .catch((e) => console.error(e));
    }, []);


    return (
        <SafeAreaProvider>
            <NavigationContainer theme={DarculaTheme}>
                <SQLiteProvider databaseName="barbedWire.db">
                    <TabNavigators/>
                </SQLiteProvider>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;
