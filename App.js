import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ConfigureStore } from './redux/configureStore';
import Main from './components/MainComponent';
import { Loading } from './components/LoadingComponent';

const { store, persistor } = ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loading />}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
