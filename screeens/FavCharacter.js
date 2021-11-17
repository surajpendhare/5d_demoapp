import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const FavCharacter = ({navigation}) => {
  const items = useSelector(state => state);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000000',
      }}>
      {items.length !== 0 ? (
        <FlatList
          data={items}
          numColumns={2}
          renderItem={({item}) => (
            <TouchableOpacity
              //   onPress={() => addItemToCart(item)}
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
                      // fontFamily: Platform.OS === 'android' && 'Roboto-Bold',
                    }}>
                    {item.name.length < 15
                      ? `${item.name}`
                      : `${item.name.substring(0, 14)}`}
                  </Text>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 14,
                      // fontFamily: Platform.OS === 'android' && 'Roboto-Medium',
                    }}>
                    {item.status}
                  </Text>
                </View>
                <Image
                  style={{width: 22, height: 20}}
                  source={require('../assets/HEART_FILLED.png')}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartMessage}>Your cart is empty :'(</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bookItemContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  thumbnail: {
    width: 100,
    height: 150,
  },
  bookItemMetaContainer: {
    padding: 5,
    paddingLeft: 10,
  },
  textTitle: {
    fontSize: 22,
    fontWeight: '400',
  },
  textAuthor: {
    fontSize: 18,
    fontWeight: '200',
  },
  buttonContainer: {
    position: 'absolute',
    top: 110,
    left: 10,
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#ff333390',
    padding: 5,
  },
  buttonText: {
    fontSize: 22,
    color: '#fff',
  },
  emptyCartContainer: {
    marginTop: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartMessage: {
    fontSize: 28,
  },
});

export default FavCharacter;
