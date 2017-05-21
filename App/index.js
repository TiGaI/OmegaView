import Main from './container/indexios';
import React from 'React';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store';
import {
  setCustomTextInput,
  setCustomText,
} from 'react-native-global-props';

const store = configureStore();

const customTextInputProps = {
  underlineColorAndroid: 'rgba(0,0,0,0)'
};

const customTextProps = {
  style: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto'
  }
};

setCustomTextInput(customTextInputProps);
setCustomText(customTextProps);

function index() {
  class Root extends React.Component {
    render() {
      return (
        <Provider store={store}>
           <Main />
        </Provider>
      );
    }
  }
  return Root;
}

module.exports = index;
