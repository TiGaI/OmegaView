import React, { Component } from 'react';
import { Navigator, View } from 'react-native';

import MapPage from './mapPage.js';
import MapFilter from './mapFilter.js';




export default class MapPapgeIndex extends Component {
  renderScene(route, navigator) {
    const {state,actions} = this.props;
    const routeId = route.id;

    if (routeId === 'MapPage') {
      return (
        <MapPage
          {...this.props}
          navigator={navigator}
        />
      );
    }
    if (routeId === 'MapFilter') {
      return (
        <MapFilter
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
          initialRoute={{ id: 'MapPage', name: 'MapPage' }}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route, routeStack) =>
            Navigator.SceneConfigs.FloatFromBottom}

        />
      </View>
      )
    }
}
module.exports = MapPapgeIndex;
