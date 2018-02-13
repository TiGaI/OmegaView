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


const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


var x = 0;

var coordinatesArray = [];
var coord = []

var latitude = 0;
var longitude = 0;


class MapPage extends Component{
  constructor(props){
    super(props);

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
    ,
    markers: [{
      title: 'hello',
      coordinates: {
        latitude: 37.788561,
        longitude: -122.652778
      },
    },
    {
      title: 'hello',
      coordinates: {
        latitude: 37.789771,
        longitude: -122.655449
      },
    }]
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

componentWillUnmount() {
  navigator.geolocation.clearWatch(this.watchID);
}

  render() {
    console.log('inside map: ', this.props.profile.userObject.sortedPing);
    for (var key in this.props.profile.userObject.sortedPing) {
       var obj = this.props.profile.userObject.sortedPing[key];
       for (var prop in obj) {
          if(prop === "eating"){
            coord = [...coord,...obj[prop].activities.map(function(data){
              var coordinatesObj = {};
              latitude = data.activityLatitude;
              longitude = data.activityLongitude;
              coordinatesObj["latitude"] = latitude;
              coordinatesObj["longitude"] = longitude;
              // coordinatesArray.push(coordinatesObj);
              // console.log("INSIDE EATING"
              return coordinatesObj
            })]
          }
          if(prop === "hobby"){
            coord = [...coord,...obj[prop].activities.map(function(data){
              var coordinatesObj = {};
              latitude = data.activityLatitude;
              longitude = data.activityLongitude;
              coordinatesObj["latitude"] = latitude;
              coordinatesObj["longitude"] = longitude;
              // coordinatesArray.push(coordinatesObj);
              // console.log("INSIDE EATING"
              return coordinatesObj
            })]
          }
          if(prop === "sleeping"){
            coord = [...coord,...obj[prop].activities.map(function(data){
              var coordinatesObj = {};
              latitude = data.activityLatitude;
              longitude = data.activityLongitude;
              coordinatesObj["latitude"] = latitude;
              coordinatesObj["longitude"] = longitude;
              // coordinatesArray.push(coordinatesObj);
              // console.log("INSIDE EATING"
              return coordinatesObj
            })]
          }
          if(prop === "studying"){
            coord = [...coord,...obj[prop].activities.map(function(data){
              var coordinatesObj = {};
              latitude = data.activityLatitude;
              longitude = data.activityLongitude;
              coordinatesObj["latitude"] = latitude;
              coordinatesObj["longitude"] = longitude;
              // coordinatesArray.push(coordinatesObj);
              // console.log("INSIDE EATING"
              return coordinatesObj
            })]
          }if(prop === "training"){
            coord = [...coord,...obj[prop].activities.map(function(data){
              var coordinatesObj = {};
              latitude = data.activityLatitude;
              longitude = data.activityLongitude;
              coordinatesObj["latitude"] = latitude;
              coordinatesObj["longitude"] = longitude;
              // coordinatesArray.push(coordinatesObj);
              // console.log("INSIDE EATING"
              return coordinatesObj
            })]
          }
          if(prop === "working"){
            coord = [...coord,...obj[prop].activities.map(function(data){
              var coordinatesObj = {};
              latitude = data.activityLatitude;
              longitude = data.activityLongitude;
              coordinatesObj["latitude"] = latitude;
              coordinatesObj["longitude"] = longitude;
              // coordinatesArray.push(coordinatesObj);
              // console.log("INSIDE EATING"
              return coordinatesObj
            })]
          }

       }
      }

    return (
      <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#152D44'}}>
      {this.state.currentPosition.latitude !== 1 && this.state.currentPosition.longitude !== 1 ? (
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
     {coord.map((marker, index) => (
       <MapView.Marker key={index}
     coordinate={{latitude: marker.latitude,
     longitude: marker.longitude
     }}
     ></MapView.Marker>
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
