import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import About from './src/page/About';
import Main2 from './src/page/Main2';
import Scanner from './src/page/Scanner';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main2">
        <Stack.Screen name="Main2" component={Main2} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen
          name="Main"
          component={Main2}
          options={{headerShown: false}}
        />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
