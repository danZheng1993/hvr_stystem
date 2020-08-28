import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.configure({
  name: 'WeMoney',
})
  .use(reactotronRedux())
  .useReactNative()
  .connect();

export default reactotron;
