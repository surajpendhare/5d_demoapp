import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function FavIcon(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('FavCharacter')}
      style={{marginRight: 10}}>
      <Image source={require('../assets/HEART_FILLED.png')} />
    </TouchableOpacity>
  );
}

export default FavIcon;
