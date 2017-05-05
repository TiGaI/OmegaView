import React, { Component, PropTypes } from 'react';
import {
  StyleSheet, View , Text, Dimensions, TouchableOpacity} from 'react-native';
//
// import Modal from 'react-native-modalbox';

// import { Button, List, SocialIcon, Icon} from 'react-native-elements'
// import { Container, Content, Card, CardItem, Text, Body, Spinner, Radio, ListItem} from 'native-base';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icons from 'react-native-vector-icons/Ionicons';

import Slider from 'react-native-slider';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ModalDropdown from 'react-native-modal-dropdown';
import MapView from 'react-native-maps';
import * as actionCreators from '../../actions/activityAction';

//Import Components
import MapFilter from './mapFilter'


var {height, width} = Dimensions.get('window');

//MAP Variables
var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE = 1;
const LONGITUDE = 1;

const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


var x = 0;

class MapPage extends Component{
  constructor(props){
    super(props);
    console.log('MAP PAGE PROPS', props);
    console.log('GET ACTIVITIES', this.props.actions.getActivityForMap(this.props.profile.userObject._id));
    this.state = {
      initialPosition: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      currentPosition: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    }
  }
  watchID: ?number = null;

componentDidMount() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      var initialPosition = JSON.stringify(position);
      this.setState({initialPosition: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA

      }});
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );
  this.watchID = navigator.geolocation.watchPosition((position) => {
    var lastPosition = JSON.stringify(position);
    this.setState({currentPosition: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }});
  },
  );
}

filter () {

  // this.props.navigator.push({
  //   id: 'MapFilter'
  // })

  // this.props.data.populatedActivities
}

componentWillUnmount() {
  navigator.geolocation.clearWatch(this.watchID);
}

  render() {
      if(this.props.data.populatedActivities.length > 0){
        console.log('FILTER', this.props);
      }
    return (
      <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#152D44'}}>
      {this.state.currentPosition.latitude !== 1 && this.state.currentPosition.longitude !== 1 && this.props.data.populatedActivities.length !== 0 ? (
      <MapView
     resizeMode = "stretch"
      style={{flex: 1, height: null, width: null, justifyContent: 'flex-start', alignItems: 'center'}}
      region={{
        latitude: this.state.currentPosition.latitude,
        longitude: this.state.currentPosition.longitude,
        latitudeDelta: this.state.currentPosition.latitudeDelta,
        longitudeDelta: this.state.currentPosition.longitudeDelta,
      }}
    >
    <View style={{backgroundColor: 'black', padding: 10}}>
    <TouchableOpacity onPress={this.filter.bind(this)}>
    <Text style={{color: 'white', fontSize: 20}}>Filter</Text>
    </TouchableOpacity>
    </View>
    {this.state.markers.map(marker => (
       <MapView.Marker
         coordinate={{latitude: marker.activityLatitude,
      longitude: marker.activityLongitude}}
         title={marker.title}
         description={marker.description}
       />
     ))}

        </MapView>
  ) : (<View><Text>LOADING...</Text></View>)

  }
  </View>
)
}
}


function mapStateToProps(state) {
	return {
    profile: state.get('profile'),
    data: state.get('data'),
    login: state.get('login')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actionCreators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);