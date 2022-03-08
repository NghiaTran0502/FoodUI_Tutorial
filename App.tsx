import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Other, Restaurant} from './screens';
import {Tabs} from './navigation/tabs';
import {ICurrentLocation, IRestaurant} from './screens/Home';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Restaurant: {
    item: IRestaurant;
    location: ICurrentLocation;
  };
  Other: undefined;
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Tabs'}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen name="Other" component={Other} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
