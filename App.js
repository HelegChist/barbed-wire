import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DarculaTheme from './constants/DarculaTheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigators from './navigations/TabNavigators';
import { loadDatabase } from './utils/FileUtils';
import { SQLiteProvider } from 'expo-sqlite/next';
import { StatusBar } from 'react-native';
import { ITEM_BACKGROUND_COLOR } from './constants/Color';

function App() {

    React.useEffect(() => {
        loadDatabase()
            .catch((e) => console.error(e));
    }, []);


    return (
        <SafeAreaProvider>
            <NavigationContainer theme={DarculaTheme}>
                <SQLiteProvider databaseName="barbedWire.db">
                    <StatusBar backgroundColor={ITEM_BACKGROUND_COLOR}/>
                    <TabNavigators/>
                </SQLiteProvider>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;
