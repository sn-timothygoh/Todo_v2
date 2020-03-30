/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {TextInput as RNTextInput} from 'react-native-gesture-handler';
import {TextInput as PaperTextInput} from 'react-native-paper';
import ToggleSwitch from 'toggle-switch-react-native';
import DatePicker from 'react-native-datepicker';

import {connect, useSelector} from 'react-redux';

import {createTask} from '../actions/task';

const CreateTask = ({navigation, reduxCreateTask}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [important, setImportant] = useState(false);
  const users = useSelector(state => state.authReducer);
  var loggedUser,
    i = 0;
  for (i in users) {
    if (users[i].loggedIn) {
      loggedUser = users[i].username;
      break;
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>Title</Text>
        <KeyboardAvoidingView style={styles.inputArea} behavior="padding">
          <View style={styles.innerInputArea}>
            <RNTextInput
              style={styles.textInput}
              placeholder="Remind me to..."
              value={title}
              onChangeText={e => setTitle(e)}
            />
          </View>
        </KeyboardAvoidingView>
        <Text>Description</Text>
        <KeyboardAvoidingView style={styles.inputArea} behavior="padding">
          <View style={styles.innerInputArea}>
            <PaperTextInput
              style={styles.textInput}
              placeholder="Description"
              multiline
              value={desc}
              onChangeText={e => setDesc(e)}
            />
          </View>
        </KeyboardAvoidingView>
        <Text>Start Date</Text>
        <KeyboardAvoidingView style={styles.inputArea} behavior="padding">
          <View>
            <DatePicker
              value={startDate}
              onDateChange={e => setStartDate(e)}
              mode="date"
              format="DD-MM-YYYY"
              androidMode="spinner"
            />
          </View>
        </KeyboardAvoidingView>
        <Text>End Date</Text>
        <KeyboardAvoidingView style={styles.inputArea} behavior="padding">
          <View>
            <DatePicker
              value={endDate}
              onDateChange={e => setEndDate(e)}
              mode="date"
              format="DD-MM-YYYY"
              androidMode="spinner"
            />
          </View>
        </KeyboardAvoidingView>
        <View style={{marginBottom: 12}}>
          <ToggleSwitch
            isOn={important}
            value={important}
            onColor="green"
            offColor="gray"
            label="Important"
            labelStyle={{color: 'black', fontWeight: '900'}}
            onToggle={isOn => {
              setImportant(isOn);
            }}
          />
        </View>
        <View style={{bottom: 0, position: 'absolute', right: 0}}>
          <Button
            title="Save"
            onPress={() => {
              reduxCreateTask(
                loggedUser,
                title,
                desc,
                startDate,
                endDate,
                important,
              );
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  innerContainer: {
    margin: 12,
  },

  inputArea: {
    width: '100%',
    flex: 1,
    marginBottom: 12,
  },

  innerInputArea: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },

  textInput: {
    zIndex: 0,
    padding: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  dateTime: {
    zIndex: 0,
    flexDirection: 'column',
    padding: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    width: '33.3%',
  },
});

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    user: state.authReducer.user,
    title: state.taskReducer.title,
    desc: state.taskReducer.desc,
    startDate: state.taskReducer.startDate,
    endDate: state.taskReducer.endDate,
    important: state.taskReducer.important,
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    reduxCreateTask: (user, title, desc, startDate, endDate, important) =>
      dispatch(createTask(user, title, desc, startDate, endDate, important)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
