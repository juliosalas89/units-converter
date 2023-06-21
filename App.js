import store from './src/store/store';
import { Provider } from 'react-redux';
import Main from './src/components/Main.jsx'

export default function App() {

  return (
    <Provider store={store}>
      <Main></Main>
    </Provider>
  );
}

