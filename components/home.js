/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Text,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {connect} from 'react-redux';
import {deleteTask, markAsDone} from '../actions/task';

console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

const closeRow = (rowMap, rowKey) => {
  if (rowMap[rowKey]) {
    rowMap[rowKey].closeRow();
  }
};

const TodoList = ({navigation, reduxDeleteTask, reduxMarkTaskAsDone}) => {
  const todos = useSelector(state => state.taskReducer);
  const users = useSelector(state => state.authReducer);
  var loggedUser;
  let k = 0;
  for (k in users) {
    if (users[k].loggedIn) {
      loggedUser = users[k].username;
      break;
    }
  }

  let userTask = [],
    userUndone = 0;
  let i = 0,
    j = 0;
  for (i in todos) {
    todos[i].user === loggedUser ? userTask.push(todos[i]) : null;
  }
  for (j in userTask) {
    !userTask[j].completed ? userUndone++ : null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.taskCountContainer}>
        <Text style={{textAlign: 'right'}}>
          You have {userUndone} ongoing task
        </Text>
      </View>
      {todos.length === 0 ? (
        <View style={styles.titleContainer}>
          <TouchableHighlight>
            <Text>You do not have any task</Text>
          </TouchableHighlight>
        </View>
      ) : (
        <SwipeListView
          data={userTask}
          renderItem={({item}) => (
            <TouchableHighlight
              style={[
                item.important && !item.completed
                  ? styles.impRowFront
                  : [item.completed ? styles.comRowFront : styles.defRowFront],
              ]}
              underlayColor={'#FFF'}
              onPress={() => {
                navigation.navigate('EditTask', {item});
              }}>
              <View
                style={
                  (styles.taskContainer,
                  {
                    padding: 20,
                    width: '100%',
                  })
                }>
                <Text
                  numberOfLines={1}
                  style={
                    (styles.taskTitle,
                    {
                      textDecorationLine: item.completed
                        ? 'line-through'
                        : 'none',
                    })
                  }>
                  {item.title}
                </Text>
                <Text
                  numberOfLines={1}
                  style={
                    (styles.taskDesc,
                    {
                      textDecorationLine: item.completed
                        ? 'line-through'
                        : 'none',
                    })
                  }>
                  {item.desc}
                </Text>
              </View>
            </TouchableHighlight>
          )}
          renderHiddenItem={({item}, rowMap, rowKey) => (
            <View style={styles.rowBack}>
              <TouchableOpacity
                style={styles.backLeftBtn}
                onPress={() => {
                  closeRow(rowMap, rowKey);
                  reduxMarkTaskAsDone(item.id);
                }}>
                {item.completed ? <Text>Undone</Text> : <Text>Done</Text>}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.backRightBtn}
                onPress={() => {
                  reduxDeleteTask(item.id);
                }}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={100}
          rightOpenValue={-100}
        />
      )}
      <View style={styles.footerInner}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('CreateTask')}>
          {/* <Text style={styles.btnCreate}>+</Text> */}
          <FontAwesome5 name="plus" size={16} color="white" />
          {/* <Icon name="plus" size={25} color="white" /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  taskCountContainer: {
    height: 30,
    margin: 12,
    padding: 5,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  taskContainer: {
    height: 100,
    borderBottomColor: '#777',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  taskDesc: {
    marginTop: 12,
  },
  defRowFront: {
    backgroundColor: '#EEE',
  },
  comRowFront: {
    backgroundColor: '#AAA',
  },

  impRowFront: {
    backgroundColor: '#FCA',
  },

  rowBack: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    height: 100,
  },
  backRightBtn: {
    alignItems: 'center',
    right: 0,
    width: 100,
    height: 100,
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'red',
    color: 'white',
  },

  backLeftBtn: {
    alignItems: 'center',
    height: 100,
    width: 100,
    left: 0,
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'green',
    color: 'white',
  },

  footer: {
    position: 'absolute',
    width: '100%',
    height: 100,
    bottom: 0,
    flex: 1,
  },

  btn: {
    zIndex: 1,
    position: 'absolute',
    right: 25,
    bottom: 25,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0084FF',
  },

  btnCreate: {
    color: '#fff',
    fontSize: 25,
  },

  textInput: {
    zIndex: 0,
    flex: 1,
    padding: 20,
    paddingRight: 75,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#262526',
  },

  end: {
    backgroundColor: '#123456',
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
    reduxDeleteTask: id => dispatch(deleteTask(id)),
    reduxMarkTaskAsDone: id => dispatch(markAsDone(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
