import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    Alert,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView
                style={{
                    backgroundColor: '#FFF',
                    marginBottom: 60,
                }}
            />

            <View style={styles.footerInner}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnCreate}>+</Text>
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
    defRowFront: {
        backgroundColor: '#EEE',
        borderBottomColor: '#777',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    comRowFront: {
        backgroundColor: '#AAA',
        borderBottomColor: '#777',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },

    impRowFront: {
        backgroundColor: '#FCA',
        borderBottomColor: '#777',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },

    row: {
        padding: 10,
        flexDirection: 'row',
    },

    footer: {
        position: 'absolute',
        width: '100%',
        height: 60,
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
        backgroundColor: '#262526',
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

export default HomeScreen;
