import React, { Component } from 'react';
import { Navigator, View } from 'react-native';

import ReportPage from './reportPage.js';
import ProfilePage from './profilePage.js';




export default class ProfilePageIndex extends Component {
  renderScene(route, navigator) {
    const {state,actions} = this.props;
    const routeId = route.id;
    if (routeId === 'ProfilePage') {
      return (
        <ProfilePage
          {...this.props}
          navigator={navigator}
        />
      );
    }

  if (routeId === 'ReportPage') {
    return (
      <ReportPage
        {...this.props}
        navigator={navigator}
      />
    );
  }
}
  render(){
    const {actions } = this.props;
      return (
        <View style={{ flex:1 }}>
        <Navigator
          style={{ flex:1 }}
          ref={'NAV'}
          initialRoute={{ id: 'ProfilePage', name: 'ProfilePage' }}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route, routeStack) =>
            Navigator.SceneConfigs.FloatFromBottom}

        />
      </View>
      )
    }
}
module.exports = ProfilePageIndex;
