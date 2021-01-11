import React, { useLayoutEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { view } from '@risingstack/react-easy-state';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import expenseStore from '../Expense/store';
import ExpensePage from '../Expense';
import ProfilePage from '../Profile';
import { Colors } from '../../Assets';
import ConnectionInfo from '../../Components/netinfo';

const Tab = createBottomTabNavigator();
const HomePage = ({navigation}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}
                onPress={() => {
                    expenseStore.setDatePicker(true);
                }}
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
                inactiveTintColor: "rgba(255, 255, 255, 0.5)",
                activeTintColor: "#FFF",
                style: {
                    backgroundColor: Colors.primary
                }
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
                listeners={{
                    tabPress: e => {
                        navigation.setOptions({
                            headerShown: true
                        })
                    },
                }}
            />
            <Tab.Screen 
                name="Settings" 
                component={ProfilePage}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                      <Icon name="user-cog" color={color} size={size} />
                    ),
                }}
                listeners={{
                    tabPress: e => {
                        navigation.setOptions({
                            headerShown: false
                        })
                    },
                }}
            />
        </Tab.Navigator>
    );
}

export default view(HomePage)