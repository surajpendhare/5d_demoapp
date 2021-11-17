import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-tiny-toast';

export const ADD_TO_FAV = 'ADD_TO_FAV';

export default Home = ({navigation}) => {
  const [list, setList] = useState([]);
  const cartItems = useSelector(state => state);

  const dispatch = useDispatch();
  const addItemToCart = (item, i) => {
    if (cartItems.length !== 0) {
      var isItemPresent = false;
      cartItems.map((favitem, index) => {
        if (item.name === favitem.name) {
          Toast.show('Character Already Added in Favourite');
          isItemPresent = true;
        }
      });
      if (isItemPresent === false) {
        Toast.show('Character Added In Favourite');
        dispatch({type: ADD_TO_FAV, payload: item});
      }
    } else {
      dispatch({type: ADD_TO_FAV, payload: item});
    }
  };
  useEffect(() => {
    let mounted = true;
    fetch('https://www.breakingbadapi.com/api/characters')
      .then(response => response.json())
      .then(data => setList(data))
      .catch(function (error) {
        console.log(error);
      });
    return () => (mounted = false);
  }, []);

  return (
    <View style={styles.sectionContainer}>
      {list.length !== 0 && (
        <FlatList
          data={list}
          numColumns={2}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => addItemToCart(item, index)}
              key={item.key}
              style={{margin: 10, padding: 10}}>
              <Image
                style={{height: 180, width: 140, borderRadius: 4}}
                source={{uri: item.img}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <View>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 16,
                    }}>
                    {item.name.length < 15
                      ? `${item.name}`
                      : `${item.name.substring(0, 14)}`}
                  </Text>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 14,
                    }}>
                    {item.status}
                  </Text>
                </View>
                <Image
                  style={{width: 22, height: 20}}
                  source={require('../assets/HEART.png')}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  taskWraper: {
    padding: 80,
    paddingHorizontal: 20,
  },
  headerStyle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemContainer: {
    marginTop: 30,
  },
  textWriter: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 60,
    backgroundColor: '#FFF',
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 60,
  },
  addText: {},
});
