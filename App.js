import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screeens/Home';
import FavCharacter from './screeens/FavCharacter';
import FavIcon from './components/FavIcon';
import {Provider as StoreProvider} from 'react-redux';
import store from './redux/store';
import {
  Image,
  Modal,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import Toast from 'react-native-tiny-toast';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isFirstLaunch, setFirstLaunch] = useState(null);
  const [modalVisible, isModalVisible] = useState(false);
  const [list, setList] = useState([]);
  const [text, setText] = useState('');

  // useEffect (()=>{
  // AsyncStorage.getItem('alreadyLaunched').then(value =>
  //   {
  // if(value === null){
  //   AsyncStorage.setItem('alreadyLaunched', 'true');
  //   setFirstLaunch(true);
  // }else{
  // setFirstLaunch(false);
  // }
  //   })
  // })

  // if(isFirstLaunch === null){
  //   return (<View>
  //     <Text>dfhdhf</Text>
  //   </View>)
  // }else if(isFirstLaunch === true){

  searchApi = () => {
    fetch('https://www.breakingbadapi.com/api/characters?name=' + `${text}`)
      .then(response => response.json())
      .then(data => setList(data))
      .catch(function (error) {
        console.log(error);
      });
  };
  // useEffect(() => {
  //   let mounted = true;
  //   fetch('https://www.breakingbadapi.com/api/characters?name=walter')
  //     .then(response => response.json())
  //     .then(data => setList(data))
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return () => (mounted = false);
  // }, []);

  return (
    <StoreProvider store={store}>
      <NavigationContainer headerMode="none">
        <Stack.Navigator initialRouteName={'OnBoarding'} headerMode="none">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: 'The Breaking Bad',
              headerTitleAlign: 'left',
              headerTintColor: '#FFFFFF',
              headerRight: props => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity onPress={() => isModalVisible(true)}>
                    <Image
                      style={{height: 28, width: 28, right: 10}}
                      source={require('./assets/search.png')}
                    />
                  </TouchableOpacity>
                  <FavIcon {...props} />
                </View>
              ),
              headerTitleStyle: {
                fontSize: 24,
                color: '#FFFFFF',
                fontWeight: 'bold',
              },
              headerStyle: {
                backgroundColor: '#000000',
              },
            }}
          />
          <Stack.Screen
            name="FavCharacter"
            component={FavCharacter}
            options={{
              headerTitle: 'Favourites',
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontSize: 24,
                color: '#FFFFFF',
                fontWeight: 'bold',
              },
              headerStyle: {
                backgroundColor: '#000000',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Modal
        style={{backgroundColor: '#000000'}}
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          //alert('Modal has been closed.');
           isModalVisible(false); 
        }}>
        <View style={{flex: 1, backgroundColor: '#000000'}}>
          <View style={{marginTop: 35}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <SearchBar
                fontColor="#c6c6c6"
                iconColor="#c6c6c6"
                cancelIconColor="#FFFFFF"
                placeholder="Search"
                style={{height: 70, width: '90%'}}
                // onPress={() => alert('onPress')}
                onChangeText={text => {
                  setText(text);
                }}
                height={70}
                darkMode
                style={{borderRadius: 0}}
              />
              <TouchableOpacity
                onPress={() => {
                  text !== ""
                    ? searchApi()
                    : alert('Please Enter Some input Character');
                }}>
                <Text style={{color: '#FFFFFF'}}>Search</Text>
              </TouchableOpacity>
            </View>
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
                        source={require('./assets/HEART.png')}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </Modal>
    </StoreProvider>
  );
  // }else{
  //  return <Home/>
  // }
};

export default App;
