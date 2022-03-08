/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Home, Other} from '../screens';
import {Image, TouchableOpacity, View} from 'react-native';
import {COLORS, icons} from '../constants';
import Svg, {Path} from 'react-native-svg';
import {isIphoneX} from 'react-native-iphone-x-helper';

const Tab = createBottomTabNavigator<RootStackParamList>();

export interface TabBarCustomButtonProps {
  accessibilityState: any;
  onPress: any;
}

type RootStackParamList = {
  Home: undefined;
  Share: undefined;
  Like: undefined;
  User: undefined;
};

const TabBarCustomButton: React.FC<TabBarCustomButtonProps> = ({
  accessibilityState,
  children,
  onPress,
}) => {
  var isSelected = accessibilityState.selected;
  if (isSelected) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', position: 'absolute', top: 0}}>
          <View style={{flex: 1, backgroundColor: COLORS.white}} />
          <Svg width={70} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.white}
            />
          </Svg>
          <View style={{flex: 1, backgroundColor: COLORS.white}} />
        </View>

        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.white,
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 60,
          backgroundColor: COLORS.white,
        }}
        onPress={onPress}
        activeOpacity={1}>
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar: React.FC<any> = props => {
  if (isIphoneX()) {
    return (
      <View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 20,
            backgroundColor: COLORS.white,
          }}
        />
        <BottomTabBar {...props} />
      </View>
    );
  } else {
    return <BottomTabBar {...props} />;
  }
};

export const Tabs: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => ({
        tabBarButton: ({accessibilityState, onPress, children}) => (
          <TabBarCustomButton
            accessibilityState={accessibilityState}
            onPress={onPress}
            children={children}
          />
        ),
        tabBarIcon: ({color}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = icons.cutlery;
              break;
            case 'Share':
              iconName = icons.search;
              break;
            case 'Like':
              iconName = icons.like;
              break;
            case 'User':
              iconName = icons.user;
              break;
          }
          return (
            <Image
              source={iconName}
              resizeMode="contain"
              style={{width: 25, height: 25, tintColor: color}}
            />
          );
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        headerBackgroundContainerStyle: {
          borderRadius: 25,
        },
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWith: 0,
          elevation: 0,
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Share" component={Other} />
      <Tab.Screen name="Like" component={Other} />
      <Tab.Screen name="User" component={Other} />
    </Tab.Navigator>
  );
};
