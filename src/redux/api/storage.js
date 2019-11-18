import { AsyncStorage } from 'react-native';

const saveItem = async (key, value)  => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('AsyncStorage Error: ' + error.message);
  }
}

const loadJWT =  async ()  => {
  try {
    await AsyncStorage.getItem('hvr_auth');

  } catch (error) {
    console.log('AsyncStorage Error: ' + error.message);
  }
}

const deleteJWT = async() => {
  try{
    await AsyncStorage.removeItem('hvr_auth')
    
  } catch (error) {
    console.log('AsyncStorage Error: ' + error.message);
  }
}

export {
  saveItem,
  loadJWT,
  deleteJWT
};