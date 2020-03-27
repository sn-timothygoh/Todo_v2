/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import {login, register} from '../actions/auth';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const users = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  const handleLogin = (userName, password) => {
    const checkExist = users.some(user => user.userName === userName);

    if (!checkExist) {
      if (username !== '' && password !== '')
        dispatch(register(username, password));
      else setErrorMsg('Username and Password cannot be blank!');
    } else {
      dispatch(login(username, password));

      const valid = users.some(user => user.loggedIn === true);

      !username
        ? setErrorMsg('')
        : !valid
        ? setErrorMsg('User existed, wrong password')
        : '';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>LOGIN</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          value={username}
          onChangeText={e => setUsername(e)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          value={password}
          onChangeText={e => setPassword(e)}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => handleLogin(username, password)}>
        {errorMsg !== '' && <Text style={styles.text}>{errorMsg}</Text>}
        <Text style={styles.loginText}>Connect to App</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => dispatch(login('Anonymous', '123456'))}>
        <Text style={styles.loginText}>Access as Anonymous</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#0084FF',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#DDD',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#000',
  },
  loginBtn: {
    width: '60%',
    backgroundColor: '#0084FF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: '#fff',
  },
  errMsg: {
    color: '#f00',
  },
});

export default connect()(LoginScreen);
