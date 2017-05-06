import React, { Component, PropTypes } from 'react';
import {
  StyleSheet, View , Text, Dimensions, TouchableOpacity, ListView} from 'react-native';
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



var categories = [{name: 'Eating', icon: 'md-pizza'},
                  {name: 'Hobby', icon: 'md-brush'},
                  {name: 'Sleeping', icon: 'md-moon'},
                  {name: 'Studying', icon: 'ios-book'},
                  {name: 'Training', icon: 'md-walk'},
                  {name: 'Working', icon: 'md-laptop'}]


class MapFilter extends Component{
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(categories),
      selectedStartDate: null,
      selectedEndDate: null
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date, type) {
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }

  render() {

    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Today
    const maxDate = new Date(2017, 6, 3);
    const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';


    return (
      <View style={{flex: 1}}>
        <View style={{flex:1}}>

        </View>
        <View style={{flex: 1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: '#152D44', borderBottomWidth: 2, borderBottomColor: 'white' }}>
            <TouchableOpacity style={{flexDirection: 'row'}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Icons style={{fontSize: 30, color: 'white', backgroundColor: 'transparent'}} name={rowData.icon}/>
            </View>
            <View style={{flex: 3, justifyContent: 'center', alignItems: 'flex-start'}}>
              <Text style={{color: 'white'}}>{rowData.name}</Text>
            </View>
            </TouchableOpacity>
            </View>}
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

export default connect(mapStateToProps, mapDispatchToProps)(MapFilter);
