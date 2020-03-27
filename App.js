/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Text, View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {store, persistor} from './store/storeConfig';
import {Button} from 'react-native-paper';
import LoginScreen from './components/login';
import HomeScreen from './components/home';
import ImportantTask from './components/importantTask';
import IncompleteTask from './components/incompleteTask';
import CompletedTask from './components/completedTask';
import CreateTask from './components/createTask';
import EditTask from './components/editTask';

import {logout} from './actions/auth';

function SplashScreen() {
  return (
    <View>
      <Text>Loading ...</Text>
    </View>
  );
}

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TaskCategory = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{labelStyle: {fontSize: 10}}}
      gestureHandlerProps={{swipeEnabled: false}}
      swipeEnabled="false"
      gestureEnabled="false"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'All') {
            iconName = 'home';
          } else if (route.name === 'Important') {
            iconName = 'star';
          } else if (route.name === 'Completed') {
            iconName = 'check';
          } else if (route.name === 'Ongoing') {
            iconName = 'list';
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="All" component={HomeScreen} />
      <Tab.Screen
        name="Important"
        component={ImportantTask}
        tabBarIcon="star"
      />
      <Tab.Screen name="Ongoing" component={IncompleteTask} />
      <Tab.Screen name="Completed" component={CompletedTask} />
    </Tab.Navigator>
  );
};

export default function App() {
  function HeadTitle() {
    return (
      <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
        Todo
      </Text>
    );
  }

  function Main() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.authReducer);
    var loggedUser;
    let i = 0;
    for (i in users) {
      console.log(users[i]);
      if (users[i].loggedIn) {
        loggedUser = users[i].username;
        break;
      }
    }
    return (
      <NavigationContainer>
        <StatusBar hidden />
        <Stack.Navigator>
          {/* <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            /> */}
          {!loggedUser ? (
            <Stack.Screen
              name="SignIn"
              component={LoginScreen}
              options={{
                title: 'Sign in',
                headerShown: false,
              }}
            />
          ) : (
            <Stack.Screen
              name="Home"
              component={TaskCategory}
              options={{
                title: 'Todo',
                gestureEnabled: false,
                headerStyle: {
                  backgroundColor: '#0084FF',
                },
                headerTitleStyle: {
                  color: '#FFF',
                  textAlign: 'center',
                  alignSelf: 'center',
                  flexGrow: 1,
                  justifyContent: 'space-between',
                },
                headerTitle: props => <HeadTitle {...props} />,
                headerRight: () => (
                  <Button
                    style={{
                      backgroundColor: '#FFF',
                      marginRight: 12,
                      color: '#000',
                    }}
                    title="1"
                    onPress={() => {
                      console.log(loggedUser);
                      dispatch(logout(loggedUser));
                    }}
                  />
                ),
              }}
            />
          )}

          <Stack.Screen
            name="CreateTask"
            component={CreateTask}
            options={{
              title: 'Create Task',
              headerStyle: {
                backgroundColor: '#0084FF',
              },
              headerTitleStyle: {
                color: '#FFF',
              },
            }}
          />
          <Stack.Screen
            name="EditTask"
            component={EditTask}
            options={{
              title: 'Edit Task',
              headerStyle: {backgroundColor: '#0084FF'},
              headerTitleStyle: {color: '#FFF'},
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
