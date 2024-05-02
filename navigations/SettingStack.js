import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingScreen from '../screens/SettingScreen';
import ItemFormModal from '../screens/ItemFormModal';
import NomenclatureSettingScreen from '../screens/NomenclatureSettingScreen';

const Stack = createStackNavigator();

const SettingStack = () => {
    return (
        <Stack.Navigator initialRouteName='SettingScreen'
                         screenOptions={{
                             headerShown: false
                         }}>
            <Stack.Group>
                <Stack.Screen name="SettingScreen" component={SettingScreen}/>
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="NomenclatureSettingModal" component={NomenclatureSettingScreen}/>
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="ItemFormModal" component={ItemFormModal}/>
            </Stack.Group>
        </Stack.Navigator>
    );
}

export default SettingStack;