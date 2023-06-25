import 'react-native-gesture-handler'; //This import must remain at the top of the file
import store from './src/store/store';
import { Provider } from 'react-redux';
import Home from './src/components/Home.jsx'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';

export default function App() {

  const Drower = createDrawerNavigator()

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Home/>
      </SafeAreaProvider>
    </Provider>
  );
}

