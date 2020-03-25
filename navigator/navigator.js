import React from 'react';
import HomeScreen from '../components/home';
import SignInScreen from '../components/login';
import Create from '../components/createTask';
import AuthLoadingScreen from '../components/authLoading';

import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';


const AppStack = createStackNavigator({ Home: HomeScreen, Other: Create });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export const AppNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);