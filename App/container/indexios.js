import React, { Component, PropTypes } from 'react';
import { View, ActivityIndicator, AsyncStorage, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/loginAction';
import Tabs from '../components/tabs';
import Login from '../components/login'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk'

var Environment = require('../Environment.js')

import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAcY1_e9lOIncECVUUJlpHHzg38Gz4MhCE",
    authDomain: "docbit-26951.firebaseapp.com",
    databaseURL: "https://docbit-26951.firebaseio.com",
    storageBucket: "docbit-26951.appspot.com",
    messagingSenderId: "81290310087"
};
firebase.initializeApp(config);


const styles = StyleSheet.create({
  wrapper: {
      marginTop: 20,
      flex: 1
  },
  text: {
      fontSize: 20,
      color: '#01579B'
  }
})

class PinVuew extends Component {
  componentDidMount() {
    this._loadInitialState();
    this._setupGoogleSignin();
  }
  async _setupGoogleSignin() {
     try {
       await GoogleSignin.hasPlayServices({ autoResolve: true });
       await GoogleSignin.configure({
         iosClientId: Environment.IOS_CLIENT_ID,
         webClientId: Environment.WEB_CLIENT_ID,
         offlineAccess: false
       });
       const user = await GoogleSignin.currentUserAsync();
     }
     catch(err) {
       console.log("Google signin error", err.code, err.message);
     }
   }
  _loadInitialState = async () => {
    try {
      var user = await AsyncStorage.getItem("USER");
      if (user !== null){
        this.props.actions.facebookLogin(JSON.parse(user));
    }
    } catch (error) {
      console.log(error.message);
    }
  };
  _removeStorage = async () => {
     try {
       await AsyncStorage.removeItem("USER_ID");
     } catch (error) {
       console.log(error.message);
     }
   };
  async googleLogin() {
     GoogleSignin.signIn().then(async (user) => {
            var credential = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken);
            const newUser = await firebase.auth().signInWithCredential(credential);
            this.props.actions.googleLogin(user);
        }).then()
        .catch((err) => {
          console.log('WRONG SIGNIN', err);
        })
        .done();

  }
  async facebookLogin(){
    const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends', 'user_about_me']);
    const newUser = result
    const tokenData = await AccessToken.getCurrentAccessToken();
    const token = tokenData.accessToken.toString();
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    const user = await firebase.auth().signInWithCredential(credential);
    this.props.actions.facebookLogin(user);
  }
  render() {
        const { actions, login, profile } = this.props;
        console.log(this.props)
        let tabsComponent = <Tabs onPress={() => actions.logout()} profile={profile} />;
        let loginComponent = <Login google={() => this.googleLogin()} facebook={() => this.facebookLogin()} onSkip={() => actions.skip()} />;

        if(login.error) {
            loginComponent = <View><Login onPress={() => actions.login()} /><Text style={styles.text}>{login.error}</Text></View>;
        }

        if(login.loading) {
          loginComponent = <ActivityIndicator size="large" color="#3b5998" />;
          profileComponent = <ActivityIndicator size="large" color="#3b5998" />;
        }

        return (
            <View style={styles.wrapper}>
            { login.loggedIn || login.skip ? tabsComponent : loginComponent }
            </View>
        );
  }
}

PinVuew.propTypes = {
    login: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return {
        login: state.get('login'),
        profile: state.get('profile')

    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PinVuew);
