import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from './Assets'

// Routes
import LoginPage from './View/Login';
import HomePage from './View/Home';

const Stack = createStackNavigator();
const Route = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="/">
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name="/"
                    component={LoginPage}
                />
                <Stack.Screen
                    options={{
                        title: "Itung Duit",
                        headerStyle: {
                            backgroundColor: Colors.primary,
                        },
                        headerTintColor: '#fff',
                    }}
                    name="/home"
                    component={HomePage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Route;