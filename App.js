import React from 'react';
import { StyleSheet } from 'react-native';
import { ACTIVE_COLOR, BACKGROUND_COLOR, BORDER_COLOR, ITEM_BACKGROUND_COLOR, TEXT_COLOR } from './constants/Color';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingScreen from './screens/SettingScreen';
import TodayScreen from './screens/TodayScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import DarculaTheme from './constants/DarculaTheme';

const Tab = createBottomTabNavigator();

function App() {
    return (
        <NavigationContainer theme={DarculaTheme}>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarStyle: {backgroundColor: ITEM_BACKGROUND_COLOR},
                    headerStyle: {
                        backgroundColor: ITEM_BACKGROUND_COLOR,
                    },
                    headerTintColor: TEXT_COLOR,
                    tabBarIcon: ({focused, color, size}) => {
                        color = focused ? ACTIVE_COLOR : TEXT_COLOR;

                        let iconName;
                        if (route.name === 'Production') {
                            iconName = 'man-sharp';
                        } else if (route.name === 'Settings') {
                            iconName = 'settings';
                        }
                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}>
                <Tab.Screen name="Production"
                            component={TodayScreen}
                            options={{title: 'Выработка'}}/>
                <Tab.Screen name="Settings"
                            component={SettingScreen}
                            options={{title: 'Настройки'}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR
    },
});
