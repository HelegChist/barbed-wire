import React from 'react';
import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR } from './constants/Color';
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR
    },
});
