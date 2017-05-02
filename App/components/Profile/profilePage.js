import React, { Component, PropTypes } from 'react';
import {
  StyleSheet, View , Text, Dimensions, TouchableOpacity, Image, ListView} from 'react-native';
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

var {height, width} = Dimensions.get('window');

var days  = [{day: 'Monday'},{day: 'Tuesday'},{day: 'Wednesday'},{day: 'Thursday'},{day: 'Friday'},{day: 'Saturaday'}, {day: 'Sunday'}]

class ProfilePage extends Component{
  constructor(props){
    super(props);
      console.log('PROFILE PAGE PROPS', this.props)
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows(days),
      };

  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{flex: 1, backgroundColor: '#152D44'}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 15}}>
                <TouchableOpacity>
                  <Icons style={{fontSize: 35, color: 'white', backgroundColor: 'transparent'}} name="md-settings"/>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 15}}>
                <TouchableOpacity>
                  <Icons style={{fontSize: 35, color: 'white', backgroundColor: 'transparent'}} name="md-images"/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                  style={{width: 100, height: 100, borderRadius: 50}}
                  source={{uri: 'https://pi.tedcdn.com/r/pe.tedcdn.com/images/ted/8299f92848bc96ee92a8f03057f64cc554a2208f_254x191.jpg?'}}
                />
              <Text style={{color: 'white', fontSize: 20, fontWeight: "400", marginTop: 10}}>Elon Musk</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 25, fontWeight: "400"}}>123</Text>
                <Text style={{color: 'white', fontSize: 12, fontWeight: "400"}}>Total Hours</Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 25, fontWeight: "400"}}>123</Text>
                <Text style={{color: 'white', fontSize: 12, fontWeight: "400"}}>Streak</Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 25, fontWeight: "400"}}>123</Text>
                <Text style={{color: 'white', fontSize: 12, fontWeight: "400"}}>Total Pins</Text>
              </View>
            </View>
        </View>
        <View style={{flex: 1, backgroundColor: '#F4F2F2'}}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', height: 75, margin: 10, marginBottom: 0}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#8AC0FF', fontSize: 25, fontWeight: '700'}}>03</Text>
                    <Text style={{color: '#8AC0FF', fontSize: 15, fontWeight: '400'}}>Jan</Text>
                  </View>
                  <View style={{flex: 3, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text style={{color: 'grey', fontSize: 20, fontWeight: '500'}} numberOfLines={1}>Today I landed on Mars</Text>
                    <Text style={{color: 'black', fontSize: 12, fontWeight: '400'}}>Tuesday, 11:30 AM</Text>
                  </View>
                </View>
            </TouchableOpacity>}
          />
        </View>

      </View>
    )
  }
}



function mapStateToProps(state) {
	return {
    // goal: state.get('goal'),
    login: state.get('login')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// actions: bindActionCreators(actionCreators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
