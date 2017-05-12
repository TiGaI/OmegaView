import React, { Component } from 'react';
import { Navigator, View, NavigationBar, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
   navigationBar: {
      backgroundColor: 'white',
			height: 50,
			borderBottomWidth: 1,
			borderColor: '#F6F6F6',
			padding: 10,
			shadowColor: '#F3F3F3',
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowOpacity: 0.3
   },
	 leftButton: {

		   color: '#A6A6A6',
			 margin: 10,
			 marginTop: -1,
       fontSize: 16
	 },
   title: {
      color: '#222222',
      justifyContent: 'center',
			marginTop: -1,
      fontSize: 18
   },
   rightButton: {
      color: '#222222',
      margin: 10,
			marginTop: -1,
      fontSize: 16
   }
})

module.exports = ProfilePageIndex;
