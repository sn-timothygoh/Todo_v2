import * as React from 'react';
import {Button, Text, TextInput, View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './store/storeConfig';

import HomeScreen from './components/home';
import ImportantTask from './components/importantTask';
import IncompleteTask from './components/incompleteTask';
import CompletedTask from './components/completedTask';
import CreateTask from './components/createTask';
import EditTask from './components/editTask';

const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading ...</Text>
    </View>
  );
}

function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn} = React.useContext(AuthContext);

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => signIn({username, password})} />
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
      gestureEnabled="false">
      <Tab.Screen name="All" component={HomeScreen} />
      <Tab.Screen name="Important" component={ImportantTask} />
      <Tab.Screen name="Ongoing" component={IncompleteTask} />
      <Tab.Screen name="Completed" component={CompletedTask} />
    </Tab.Navigator>
  );
};

export default function App({navigation}) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <StatusBar hidden />
            <Stack.Navigator>
              {state.isLoading ? (
                // We haven't finished checking for the token yet
                <Stack.Screen
                  name="Splash"
                  component={SplashScreen}
                  options={{
                    headerStyle: {
                      header: null,
                    },
                  }}
                />
              ) : state.userToken == null ? (
                // No token found, user isn't signed in
                <Stack.Screen
                  name="SignIn"
                  component={SignInScreen}
                  options={{
                    title: 'Sign in',
                    // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />
              ) : (
                // User is signed in
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
        </PersistGate>
      </Provider>
    </AuthContext.Provider>
  );
}
