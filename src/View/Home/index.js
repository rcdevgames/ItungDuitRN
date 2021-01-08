import React, {useLayoutEffect} from 'react';
import { View, TouchableOpacity} from 'react-native';
import { view } from '@risingstack/react-easy-state';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import homeStore from './store';
import ExpensePage from '../Expense';
import ProfilePage from '../Profile';
import { Colors } from '../../Assets';

const Tab = createBottomTabNavigator();
const HomePage = ({navigation}) => {
    
    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}
                onPress={() => {console.log("asdasd")}}
            >
                <Icon name="plus" size={25} color="#FFF"/>
            </TouchableOpacity>
          ),
        });
    }, [navigation]);

    return(
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: Colors.primary
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={ExpensePage}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                      <Icon name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Settings" 
                component={ProfilePage}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                      <Icon name="user-cog" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default view(HomePage)