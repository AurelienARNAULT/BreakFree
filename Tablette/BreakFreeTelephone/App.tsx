import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './src/page/Main';
import Scanner from './src/page/Scanner';
import Histoire from './src/page/Histoire';
import Poche from './src/page/Poche';
import Enigme from './src/page/Enigme';
import socket from './src/socket/socket';
import {useList, ListProvider} from './src/context/ListContext';
import SocketManager from "./src/socket/SocketManager";
import {BienJoueScreen} from "./src/page/Scanner";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <ListProvider>
            <SocketManager></SocketManager>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Main">
                    <Stack.Screen name="Main" component={Main}/>
                    <Stack.Screen name="Scanner" component={Scanner}/>
                    <Stack.Screen name="Histoire" component={Histoire}/>
                    <Stack.Screen name="Poche" component={Poche}/>
                    <Stack.Screen name="Enigme" component={Enigme}/>
                  <Stack.Screen name="BienJoue" component={BienJoueScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </ListProvider>
    );
}

export default App;
