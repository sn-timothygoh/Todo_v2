import React from 'react';
import {connect} from 'react-redux';
import {Button, StyleSheet, View, AsyncStorage} from 'react-native';

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

export default function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
