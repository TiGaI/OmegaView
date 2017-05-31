import React, { Component, PropTypes } from 'react';
import { View, ActivityIndicator, AsyncStorage, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/loginAction';
import * as getDataAction from '../actions/getDataAction';
import Tabs from '../components/tabs';
import Login from '../components/login'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
var Environment = require('../Environment.js')
const styles = StyleSheet.create({
  wrapper: {
      marginTop: 20,
      flex: 1
  },
  text: {
      fontSize: 20,
      color: 'white'
      // color: '#01579B'
  }
})

class PinVuew extends Component {
  componentDidMount() {
    this._loadInitialState();
    this._setupGoogleSignin();
  }
  _loadInitialState = async () => {
    try {
      var value = await AsyncStorage.getItem("USER_ID");
      var user = await AsyncStorage.getItem("USER");
      var feed = await AsyncStorage.getItem("FEED")

      if (value !== null && user !== null){
        this.props.actions.updateUserProfile(JSON.parse(user))
        this.props.actions.getGraphDataForAsyn(value)
        this.props.getDataActions.updateFeedObjectAction(JSON.parse(feed))
      }
    } catch (error) {
      console.log(error.message);
    }
  };
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
  render() {
        const { actions, login, profile } = this.props;
        let tabsComponent = <Tabs onPress={() => actions.logout()} profile={profile} />;
        let loginComponent = <Login google={() => actions.googleLogin()} facebook={() => actions.login()} onSkip={() => actions.skip()} />;

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
        actions: bindActionCreators(actionCreators, dispatch),
        getDataActions: bindActionCreators(getDataAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PinVuew);
