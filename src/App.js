import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import LoginForm from './components/LoginForm';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyD4X1jPyboX8mY9uEZyahwXyXFuMJUTRWQ',
      authDomain: 'manager-61ae1.firebaseapp.com',
      databaseURL: 'https://manager-61ae1.firebaseio.com',
      projectId: 'manager-61ae1',
      storageBucket: 'manager-61ae1.appspot.com',
      messagingSenderId: '842746417508',
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
  }
}

export default App;
