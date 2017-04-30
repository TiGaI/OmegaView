import React, { Component, PropTypes } from 'react';
import {
  StyleSheet, View , Text} from 'react-native';
//
// import Modal from 'react-native-modalbox';

// import { Button, List, SocialIcon, Icon} from 'react-native-elements'
// import { Container, Content, Card, CardItem, Text, Body, Spinner, Radio, ListItem} from 'native-base';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import Icons from 'react-native-vector-icons/Ionicons';

import Slider from 'react-native-slider';
import { AnimatedCircularProgress } from 'react-native-circular-progress';



class StatsPage extends Component{
  constructor(props){
    super(props);
    this.state={
      goalHours: 1000,
      totalHours: 744,
      dailyHours: 3,
      totalPins: 15,
      totalStreak: 3,


    }
  }
  submitGoalForm(){

  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#152D44'}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
      <Text style={{fontSize: 15, fontWeight: '700', color: 'white', textAlign: 'center', marginBottom: 5, backgroundColor: 'transparent'}}>
        Total
      </Text>
      <AnimatedCircularProgress
        size={175}
        width={10}
        fill={((this.state.totalHours/this.state.goalHours)*100)}
        rotation={0}
        tintColor="#00e0ff"
        backgroundColor="#3d5875">
        {
          (fill) => (
            <View style={{height: 175, width: 175, justifyContent: 'center', alignItems: 'center' ,position: 'absolute', top: 0, left: 0}}>
            <Icons style={{fontSize: 75, color: 'white', backgroundColor: 'transparent'}} name="md-time"/>

            </View>
          )
        }
</AnimatedCircularProgress>
<View style={{flexDirection: 'row', alignItems: 'center', flex: 0, justifyContent: 'center'}}>
<Text style={{fontSize: 25, fontWeight: '500', color: 'white', textAlign: 'center', marginTop: 15, backgroundColor: 'transparent'}}>
  {this.state.totalHours}
</Text>
<Text style={{fontSize: 15, fontWeight: '500', color: 'white', textAlign: 'center', marginTop: 15, marginLeft: 10, backgroundColor: 'transparent'}}>
  hrs
</Text>
</View>
</View>
      <View style={{flex: 1, flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <AnimatedCircularProgress
            size={75}
            width={5}
            fill={80}
            rotation={0}
            tintColor="#00e0ff"
            backgroundColor="#3d5875">
            {
              (fill) => (
                <View style={{height: 75, width: 75, justifyContent: 'center', alignItems: 'center' ,position: 'absolute', top: 0, left: 0}}>

                <Icons style={{fontSize: 35, color: 'white', backgroundColor: 'transparent'}} name="md-pin"/>
                </View>
              )
            }
          </AnimatedCircularProgress>
          <Text style={{fontSize: 20, fontWeight: '500', color: 'white', textAlign: 'center', marginTop: 5, backgroundColor: 'transparent'}}>
            {this.state.totalPins}
          </Text>
          <Text style={{fontSize: 15, fontWeight: '400', color: 'white', textAlign: 'center', marginTop: 5, backgroundColor: 'transparent'}}>
            pins
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <AnimatedCircularProgress
            size={75}
            width={5}
            fill={20}
            rotation={0}
            tintColor="#00e0ff"
            backgroundColor="#3d5875">
            {
              (fill) => (
                <View style={{height: 75, width: 75, justifyContent: 'center', alignItems: 'center' ,position: 'absolute', top: 0, left: 0}}>
                  <Icons style={{fontSize: 35, color: 'white', backgroundColor: 'transparent'}} name="md-pie"/>
                </View>
              )
            }
          </AnimatedCircularProgress>
          <Text style={{fontSize: 20, fontWeight: '500', color: 'white', textAlign: 'center', marginTop: 5, backgroundColor: 'transparent'}}>
            {this.state.dailyHours}
          </Text>
          <Text style={{fontSize: 15, fontWeight: '400', color: 'white', textAlign: 'center', marginTop: 5, backgroundColor: 'transparent'}}>
            hours
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <AnimatedCircularProgress
            size={75}
            width={5}
            fill={50}
            rotation={0}
            tintColor="#00e0ff"
            backgroundColor="#3d5875">
            {
              (fill) => (
                <View style={{height: 75, width: 75, justifyContent: 'center', alignItems: 'center' ,position: 'absolute', top: 0, left: 0}}>
                <Icons style={{fontSize: 35, color: 'white', backgroundColor: 'transparent'}} name="md-stats"/>
                </View>
              )
            }
          </AnimatedCircularProgress>
          <Text style={{fontSize: 20, fontWeight: '500', color: 'white', textAlign: 'center', marginTop: 5, backgroundColor: 'transparent'}}>
            {this.state.totalStreak}
          </Text>
          <Text style={{fontSize: 15, fontWeight: '400', color: 'white', textAlign: 'center', marginTop: 5, backgroundColor: 'transparent'}}>
            streak
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
    // goal: state.get('goal'),
    login: state.get('login')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// actions: bindActionCreators(actionCreators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
