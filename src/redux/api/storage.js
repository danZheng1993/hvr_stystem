import AsyncStorage from '@react-native-community/async-storage';

const saveItem = async (key, value)  => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('AsyncStorage Saving Error: ' + error.message);
  }
}

const loadItem =  async (key)  => {
  try {
    var value = await AsyncStorage.getItem(key);
    console.log("Ansyc Item Loaded.",value)
    return value
  } catch (error) {
    console.log('AsyncStorage Loading Error: ' + error.message);
  }
}

const deleteItem = async(key) => {
  try{
    await AsyncStorage.removeItem(key)
    
  } catch (error) {
    console.log('AsyncStorage Delete Error: ' + error.message);
  }
}

const clearItem = async() => {
  try{
    await AsyncStorage.clear()
  } catch (error) {
    console.log('AsyncStorage Clear Error: ', + error.message)
  }
}
export {
  saveItem,
  loadItem,
  deleteItem,
  clearItem
};