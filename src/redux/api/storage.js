import AsyncStorage from 'react-native'

const storeData = async(item, selectedValue) => {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
}
export {
    storeData
}