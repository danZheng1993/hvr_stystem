import { AsyncStorage } from 'react-native';

class deviceStorage  {
    state = {
      jwt: '',
      loading: false
    }
    // our AsyncStorage functions will go here :)
    async saveItem(key, value) {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.log('AsyncStorage Error: ' + error.message);
      }
    }

    async loadJWT() {
      try {
        const value = await AsyncStorage.getItem('hvr_auth');
        if (value !== null) {
          this.setState({
            jwt: value,
            loading: false
          });
        } else {
          this.setState({
            loading: false
          });
        }
      } catch (error) {
        console.log('AsyncStorage Error: ' + error.message);
      }
    }
    
    async deleteJWT() {
      try{
        await AsyncStorage.removeItem('hvr_auth')
        
      } catch (error) {
        console.log('AsyncStorage Error: ' + error.message);
      }
    }
};

export default deviceStorage;