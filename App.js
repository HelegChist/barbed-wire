import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DarculaTheme from './constants/DarculaTheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigators from './navigations/TabNavigators';

function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer theme={DarculaTheme}>
                <TabNavigators/>
            </NavigationContainer>
        </SafeAreaProvider>

    );
}

export default App
