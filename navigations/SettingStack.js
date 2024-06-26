import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingScreen from '../screens/SettingScreen';
import ItemFormModal from '../screens/ItemFormModal';
import NomenclatureSettingScreen from '../screens/NomenclatureSettingScreen';
import RatioScreen from '../screens/RatioScreen';

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
                <Stack.Screen name="NomenclatureSettingScreen" component={NomenclatureSettingScreen}/>
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="RatioScreen" component={RatioScreen}/>
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: 'card'}}>
                <Stack.Screen name="ItemFormModal" component={ItemFormModal}/>
            </Stack.Group>
        </Stack.Navigator>
    );
}

export default SettingStack;