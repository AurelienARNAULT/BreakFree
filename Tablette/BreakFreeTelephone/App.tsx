import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './src/page/Main';
import Scanner from './src/page/Scanner';
import Histoire from './src/page/Histoire';
import Poche from './src/page/Poche';
import About from './src/page/About';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main2">
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="Scanner" component={Scanner}/>
        <Stack.Screen name="Histoire" component={Histoire}/>
        <Stack.Screen name="Poche" component={Poche}/>
          <Stack.Screen name="About" component={About}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
