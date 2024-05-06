import { ACTIVE_COLOR, ITEM_BACKGROUND_COLOR, TEXT_COLOR } from '../constants/Color';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingStack from './SettingStack';
import WorkdayStack from './WorkdayStack';
import WorkdayHistoryScreen from '../screens/WorkdayHistoryScreen';

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
                    if (route.name === 'Workday') {
                        iconName = 'man-sharp';
                    } else if (route.name === 'Settings') {
                        iconName = 'list-outline';
                    } else if (route.name === 'History') {
                        iconName = 'server-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: ACTIVE_COLOR,
                tabBarInactiveTintColor: TEXT_COLOR,
            })}>
            <Tab.Screen name="Workday"
                        component={WorkdayStack}
                        options={{title: 'Рабочий период'}}/>
            <Tab.Screen name="History"
                        component={WorkdayHistoryScreen}
                        options={{title: 'История'}}/>
            <Tab.Screen name="Settings"
                        component={SettingStack}
                        options={{title: 'Настройки'}}/>
        </Tab.Navigator>
    );
};

export default TabNavigators;