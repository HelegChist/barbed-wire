import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TodayScreen from '../screens/TodayScreen';
import ActiveWorkdayScreen from '../screens/ActiveWorkdayScreen';
import WorkdayHistoryScreen from '../screens/WorkdayHistoryScreen';

const Stack = createStackNavigator();

const WorkdayStack = () => {
    return (
        <Stack.Navigator initialRouteName="WorkdayStack"
                         screenOptions={{
                             headerShown: false
                         }}>
            <Stack.Group>
                <Stack.Screen name="TodayScreen" component={TodayScreen}/>
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="ActiveWorkdayScreen" component={ActiveWorkdayScreen}/>
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="WorkdayHistoryScreen" component={WorkdayHistoryScreen}/>
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default WorkdayStack;