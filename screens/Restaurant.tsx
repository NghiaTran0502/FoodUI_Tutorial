/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../App';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {ICurrentLocation, IRestaurant} from './Home';

export const Restaurant: React.FC<
  NativeStackScreenProps<RootStackParamList, 'Restaurant'>
> = ({route, navigation}) => {
  const {item, location} = route.params;
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [currentLocation, setCurrentLocation] =
    useState<ICurrentLocation | null>(null);

  useEffect(() => {
    setRestaurant(item);
    setCurrentLocation(location);
  }, [item, location]);

  const renderHeader = () => (
    <View
      style={
        Platform.OS === 'android'
          ? {...styles.header, marginTop: SIZES.padding}
          : {...styles.header}
      }>
      <TouchableOpacity
        style={{
          width: 50,
          paddingLeft: SIZES.padding * 2,
          justifyContent: 'center',
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '83%',
            height: '100%',
            backgroundColor: COLORS.lightGray3,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: SIZES.radius,
          }}>
          <Text style={{...FONTS.h3, color: 'black'}}>{restaurant?.name}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: 50,
          justifyContent: 'center',
          paddingRight: SIZES.padding * 2,
        }}>
        <Image
          source={icons.list}
          resizeMode="contain"
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  );

  return <SafeAreaView style={styles.container}>{renderHeader()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    height: 50,
  },
});
