import { ACTIVE_COLOR, ITEM_BACKGROUND_COLOR, TEXT_COLOR } from '../constants/Color';
import Ionicons from '@expo/vector-icons/Ionicons';
import TodayScreen from '../screens/TodayScreen';
import SettingScreen from '../screens/SettingScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

const TabNavigators = () => {
    return (
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
                tabBarActiveTintColor: ACTIVE_COLOR,
                tabBarInactiveTintColor: TEXT_COLOR,
            })}>
            <Tab.Screen name="Production"
                        component={TodayScreen}
                        options={{title: 'Выработка'}}/>
            <Tab.Screen name="Settings"
                        component={SettingScreen}
                        options={{title: 'Настройки'}}/>
        </Tab.Navigator>
    );
}

export default TabNavigators;