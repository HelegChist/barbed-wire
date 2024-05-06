import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DarculaTheme from './constants/DarculaTheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigators from './navigations/TabNavigators';
import { deleteDatabase, loadDatabase } from './utils/FileUtils';
import { SQLiteProvider } from 'expo-sqlite/next';

function App() {

    const [dbLoaded, setDbLoaded] = React.useState(false);

    React.useEffect(() => {
        deleteDatabase().then(async () => {
            loadDatabase()
                .then(() => setDbLoaded(true))
                .catch((e) => console.error(e));
        })
    }, []);

    if (!dbLoaded)
        return (
            <View style={{flex: 1}}>
                <ActivityIndicator size={'large'}/>
                <Text>Loading Database...</Text>
            </View>
        );

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
