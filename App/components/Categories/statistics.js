import React, { Component, PropTypes } from 'react';
import {
  StyleSheet, View , Text, Dimensions, TouchableOpacity} from 'react-native';
//
// import Modal from 'react-native-modalbox';

// import { Button, List, SocialIcon, Icon} from 'react-native-elements'
// import { Container, Content, Card, CardItem, Text, Body, Spinner, Radio, ListItem} from 'native-base';

import { bindActionCreators } from 'redux';
import * as getDataActions from '../../actions/getDataAction';
import * as loginActions from '../../actions/loginAction';

import { connect } from 'react-redux';
import { Button, SocialIcon,  Icon } from 'react-native-elements'

import Slider from 'react-native-slider';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import ModalDropdown from 'react-native-modal-dropdown';

var {height, width} = Dimensions.get('window');



class StatsPage extends Component{
  constructor(props){
    super(props);
    this.props.getDataActions.pushReportObjectAction(this.props.profile.userObject._id)

    this.state={
      goalHours: 1000,
      totalHours: 744,
      dailyHours: 3,
      totalPins: 15,
      totalStreak: 3,
      category: 'Select a category'
    }
  }
  select(idx, value){
    this.setState({
      category: value
    })
  }
  render() {
    console.log('SELECTED CATEGORY', this.state.category)
      console.log("STATS PROPS", this.props)
    if(this.state.category)
    return (
      <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#21CE99'}}>
        <View style={{flex: 0.20, justifyContent: 'flex-start', padding: 10}}>
          <Text style={{fontSize: 25, fontWeight: '600', color: 'white', textAlign: 'center', marginTop: 5, backgroundColor: 'transparent'}}>
            Daily Streaks
          </Text>

        </View>

      <View style={{flex: 1, flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>

        <View style={{flex: 1, alignItems: 'center'}}>
          <AnimatedCircularProgress
            size={100}
            width={10}
            fill={100}
            rotation={0}
            tintColor="white"
            backgroundColor="#ABABAB">
            {
              (fill) => (
                <View style={{height: 100, width: 100, justifyContent: 'center', alignItems: 'center' ,position: 'absolute', top: 0, left: 0}}>
                  <Icon name='ios-pizza'
                  type='ionicon'
                  color='#fff'/>
                </View>
              )
            }
          </AnimatedCircularProgress>
          <Text style={{fontSize: 20, fontWeight: '500', color: 'white', textAlign: 'center', marginTop: 5, backgroundColor: 'transparent'}}>
            {this.props.profile.userObject.activityStreak.eating }
          </Text>
          <Text style={{fontSize: 15, fontWeight: '500', color: 'white', textAlign: 'center', marginTop: 5, backgroundColor: 'transparent'}}>
            Eating
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <AnimatedCircularProgress
            size={100}
            width={10}
            fill={100}
            rotation={0}
            tintColor="white"
            backgroundColor="#ABABAB">
            {
              (fill) => (
                <View style={{height: 100, width: 100, justifyContent: 'center', alignItems: 'center' ,position: 'absolute', top: 0, left: 0}}>
                <Icon name='ios-game-controller-b'
                type='ionicon'
                color='#fff'/>
                </View>
              )
            }
          </AnimatedCircularProgress>
          <Text style={{fontSize: 20, fontWeight: '500', color: 'white', textAlign: 'center', marginTop: 5, backgroundColor: 'transparent'}}>
            {this.props.profile.userObject.activityStreak.hobby }
          </Text>
          <Text style={{fontSize: 15, fontWeight: '500', color: 'white', textAlign: 'center', marginTop: 5, backgroundColor: 'transparent'}}>
            Hobbies
          </Text>
        </View>

      </View>

      <View style={{flex: 1, flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>

        <View style={{flex: 1, alignItems: 'center'}}>
          <AnimatedCircularProgress
            size={100}
            width={10}
            fill={100}
            rotation={0}
            tintColor="white"
            backgroundColor="#ABABAB">
            {
              (fill) => (
                <View style={{height: 100, width: 100, justifyContent: 'center', alignItems: 'center' ,position: 'absolute', top: 0, left: 0}}>
                  <Icon type='font-awesome'
                  name='bed'
                  color='#fff'/>
                </View>
              )
            }
          </AnimatedCircularProgress>
          <Text style={{fontSize: 20, fontWeight: '500', color: 'white', textAlign: 'center', marginTop: 5, backgroundColor: 'transparent'}}>
            {this.props.profile.userObject.activityStreak.sleeping }
          </Text>
          <Text style={{fontSize: 15, fontWeight: '500', color: 'white', textAlign: 'center', marginTop: 5, backgroundColor: 'transparent'}}>
            Sleeping
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <AnimatedCircularProgress
            size={100}
            width={10}
            fill={100}
            rotation={0}
            tintColor="white"
            backgroundColor="#ABABAB">
            {
              (fill) => (
                <View style={{height: 100, width: 100, justifyContent: 'center', alignItems: 'center' ,position: 'absolute', top: 0, left: 0}}>
                <Icon name='book'
                type='font-awesome'
                color='#fff'/>
                </View>
              )
            }
          </AnimatedCircularProgress>
          <Text style={{fontSize: 20, fontWeight: '500', color: 'white', textAlign: 'center', marginTop: 5, backgroundColor: 'transparent'}}>
            {this.props.profile.userObject.activityStreak.studying }
          </Text>
          <Text style={{fontSize: 15, fontWeight: '500', color: 'white', textAlign: 'center', marginTop: 5, backgroundColor: 'transparent'}}>
            Studying
          </Text>
        </View>

      </View>

      <View style={{flex: 1, flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>

        <View style={{flex: 1, alignItems: 'center'}}>
          <AnimatedCircularProgress
            size={100}
            width={10}
            fill={100}
            rotation={0}
            tintColor="white"
            backgroundColor="#ABABAB">
            {
              (fill) => (
                <View style={{height: 100, width: 100, justifyContent: 'center', alignItems: 'center' ,position: 'absolute', top: 0, left: 0}}>
                  <Icon name='fitness-center'
                  color='#fff'/>
                </View>
              )
            }
          </AnimatedCircularProgress>
          <Text style={{fontSize: 20, fontWeight: '500', color: 'white', textAlign: 'center', marginTop: 5, backgroundColor: 'transparent'}}>
            {this.props.profile.userObject.activityStreak.training }
          </Text>
          <Text style={{fontSize: 15, fontWeight: '500', color: 'white', textAlign: 'center', marginTop: 5, backgroundColor: 'transparent'}}>
            Training
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <AnimatedCircularProgress
            size={100}
            width={10}
            fill={100}
            rotation={0}
            tintColor="white"
            backgroundColor="#ABABAB">
            {
              (fill) => (
                <View style={{height: 100, width: 100, justifyContent: 'center', alignItems: 'center' ,position: 'absolute', top: 0, left: 0}}>
                <Icon name='laptop-chromebook'
                color='#fff'/>
                </View>
              )
            }
          </AnimatedCircularProgress>
          <Text style={{fontSize: 20, fontWeight: '500', color: 'white', textAlign: 'center', marginTop: 5, backgroundColor: 'transparent'}}>
            {this.props.profile.userObject.activityStreak.working }
          </Text>
          <Text style={{fontSize: 15, fontWeight: '500', color: 'white', textAlign: 'center', marginTop: 5, backgroundColor: 'transparent'}}>
            Working
          </Text>
        </View>

      </View>




    </View>
    )
  }
}




var customStyles2 = StyleSheet.create({
  track: {
    height: 4,
    borderRadius: 2,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    borderColor: '#30a935',
    borderWidth: 2,
    top: 22
  }
});

function mapStateToProps(state) {
	return {
    login: state.get('login'),
    profile: state.get('profile'),
    data: state.get('data')
	};
}

function mapDispatchToProps(dispatch) {
  return {
    getDataActions: bindActionCreators(getDataActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
