import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from './Assets'

// Routes
import LoginPage from './View/Login';
import HomePage from './View/Home';
import DetailExpensePage from './View/Expense/Detail';
import OTPPage from './View/OTP';
import SplashScreenPage from './View/SplashScreen';

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
                    component={SplashScreenPage}
                />
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name="/login"
                    component={LoginPage}
                />
                <Stack.Screen
                    options={{
                        title: "",
                        headerBackTitleVisible: false,
                        headerTintColor: '#fff',
                        headerTransparent: true
                        
                    }}
                    name="/otp"
                    component={OTPPage}
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
                <Stack.Screen
                    options={{
                        title: "Detail Expense",
                        headerStyle: {
                            backgroundColor: Colors.primary,
                        },
                        headerBackTitleVisible: false,
                        headerTintColor: '#fff',
                    }}
                    name="/expense-detail"
                    component={DetailExpensePage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Route;