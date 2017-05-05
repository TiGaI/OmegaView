import React, { Component, PropTypes } from 'react';
import {
  StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';

import { bindActionCreators } from 'redux';
import * as loginAction from '../../actions/loginAction';
import { connect } from 'react-redux';
import {Spinner} from 'native-base';

import {Button, SocialIcon, Icon} from 'react-native-elements'

import Slider from 'react-native-slider'

class GoalForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      studyingGoal: this.props.profile.userObject.myDailyGoal.studying,
      eatingGoal: this.props.profile.userObject.myDailyGoal.eating,
      trainingGoal: this.props.profile.userObject.myDailyGoal.training,
      hobbyGoal: this.props.profile.userObject.myDailyGoal.hobby,
      workingGoal: this.props.profile.userObject.myDailyGoal.working,
      sleepingGoal: this.props.profile.userObject.myDailyGoal.sleeping
    };
  }
  componentWillMount() {
    var self = this;
       this.props.navigator.props.navigationBar.props.routeMapper.RightButton =  function() {
           return (
              <TouchableOpacity onPress={() => self.submitForm() }>
                 <Text style = { styles.rightButton }>
                    Finish
                 </Text>
              </TouchableOpacity>
            )
          }
  }
  submitForm() {

   var form = {
     studying: this.state.studyingGoal,
     eating: this.state.eatingGoal,
     training: this.state.trainingGoal,
     hobby: this.state.hobbyGoal,
     working: this.state.workingGoal,
     sleeping: this.state.sleepingGoal
   };
   this.props.navigator.pop()
   this.props.loginActions.createGoalBackEnd(this.props.profile.userObject._id, form)
  }
  render() {
    if(this.props.login.skip){
      var checkforlogin = (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00A8BE'}}>

            <Text style={{fontSize: 20, color: 'white'}}>Login to view profile</Text>
                <View style={{  flex: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 20,
               flexDirection: 'row'}}>

                  <SocialIcon
                    light
                    type='facebook'
                    onPress={this.props.facebook}
                  />

                  <SocialIcon
                    light
                    type='google'
                  />
              </View>
        </View>
      )
    }else{
      var checkforlogin = <Spinner color='green'/>
    }

    return(
      <View style={{flex: 1, marginTop: 50, marginBottom: 50}}>
      { this.props.profile.userObject ?  (
        <View style={{flex: 1}}>

                            <View style={styles.container}>
                              <View style={styles.titleContainer}>
                                <Text style={styles.caption} numberOfLines={1}>Studying Goal</Text>
                                <Text style={styles.value}>{this.state.studyingGoal}</Text>
                              </View>
                                  <Slider
                                    value={this.state.studyingGoal}
                                    minimumTrackTintColor='#1fb28a'
                                     maximumTrackTintColor='#d3d3d3'
                                     thumbTintColor='#1a9274'
                                     minimumValue={0}
                                      maximumValue={10}
                                      step={.5}
                                      trackStyle={customStyles2.track}
                                      thumbStyle={customStyles2.thumb}
                                    onValueChange={(studyingGoal) => this.setState({studyingGoal})} />
                                    <View style={styles.titleContainer}>
                                      <Text style={styles.caption}>0</Text>
                                      <Text style={styles.valueForBar}>10</Text>
                                    </View>
                              </View>

                              <View style={styles.container}>
                                <View style={styles.titleContainer}>
                                  <Text style={styles.caption} numberOfLines={1}>Eating goal</Text>
                                  <Text style={styles.value}>{this.state.eatingGoal}</Text>
                                </View>
                                    <Slider
                                      value={this.state.eatingGoal}
                                      minimumTrackTintColor='#1fb28a'
                                       maximumTrackTintColor='#d3d3d3'
                                       thumbTintColor='#1a9274'
                                       minimumValue={0}
                                        maximumValue={10}
                                        step={.5}
                                        trackStyle={customStyles2.track}
                                        thumbStyle={customStyles2.thumb}
                                      onValueChange={(eatingGoal) => this.setState({eatingGoal})} />
                                      <View style={styles.titleContainer}>
                                        <Text style={styles.caption}>0</Text>
                                        <Text style={styles.valueForBar}>10</Text>
                                      </View>
                                </View>

                                <View style={styles.container}>
                                  <View style={styles.titleContainer}>
                                    <Text style={styles.caption} numberOfLines={1}>Training goal</Text>
                                    <Text style={styles.value}>{this.state.trainingGoal}</Text>
                                  </View>
                                      <Slider
                                        value={this.state.trainingGoal}
                                        minimumTrackTintColor='#1fb28a'
                                         maximumTrackTintColor='#d3d3d3'
                                         thumbTintColor='#1a9274'
                                         minimumValue={0}
                                          maximumValue={10}
                                          step={.5}
                                          trackStyle={customStyles2.track}
                                          thumbStyle={customStyles2.thumb}
                                        onValueChange={(trainingGoal) => this.setState({trainingGoal})} />
                                        <View style={styles.titleContainer}>
                                          <Text style={styles.caption}>0</Text>
                                          <Text style={styles.valueForBar}>10</Text>
                                        </View>
                                  </View>

                                  <View style={styles.container}>
                                    <View style={styles.titleContainer}>
                                      <Text style={styles.caption} numberOfLines={1}>Fun goal</Text>
                                      <Text style={styles.value}>{this.state.hobbyGoal}</Text>
                                    </View>
                                        <Slider
                                          value={this.state.hobbyGoal}
                                          minimumTrackTintColor='#1fb28a'
                                           maximumTrackTintColor='#d3d3d3'
                                           thumbTintColor='#1a9274'
                                           minimumValue={0}
                                            maximumValue={10}
                                            step={.5}
                                            trackStyle={customStyles2.track}
                                            thumbStyle={customStyles2.thumb}
                                          onValueChange={(hobbyGoal) => this.setState({hobbyGoal})} />
                                          <View style={styles.titleContainer}>
                                            <Text style={styles.caption}>0</Text>
                                            <Text style={styles.valueForBar}>10</Text>
                                          </View>
                                    </View>

                                  <View style={styles.container}>
                                    <View style={styles.titleContainer}>
                                      <Text style={styles.caption} numberOfLines={1}>Working goal</Text>
                                      <Text style={styles.value}>{this.state.workingGoal}</Text>
                                    </View>
                                        <Slider
                                          value={this.state.workingGoal}
                                          minimumTrackTintColor='#1fb28a'
                                           maximumTrackTintColor='#d3d3d3'
                                           thumbTintColor='#1a9274'
                                           minimumValue={0}
                                            maximumValue={10}
                                            step={.5}
                                            trackStyle={customStyles2.track}
                                            thumbStyle={customStyles2.thumb}
                                          onValueChange={(workingGoal) => this.setState({workingGoal})} />
                                          <View style={styles.titleContainer}>
                                            <Text style={styles.caption}>0</Text>
                                            <Text style={styles.valueForBar}>10</Text>
                                          </View>
                                    </View>

                                    <View style={styles.container}>
                                      <View style={styles.titleContainer}>
                                        <Text style={styles.caption} numberOfLines={1}>Sleep goal</Text>
                                        <Text style={styles.value}>{this.state.sleepingGoal}</Text>
                                      </View>
                                          <Slider
                                            value={this.state.sleepingGoal}
                                            minimumTrackTintColor='#1fb28a'
                                             maximumTrackTintColor='#d3d3d3'
                                             thumbTintColor='#1a9274'
                                             minimumValue={0}
                                              maximumValue={10}
                                              step={.5}
                                              trackStyle={customStyles2.track}
                                              thumbStyle={customStyles2.thumb}
                                            onValueChange={(sleepingGoal) => this.setState({sleepingGoal})} />
                                            <View style={styles.titleContainer}>
                                              <Text style={styles.caption}>0</Text>
                                              <Text style={styles.valueForBar}>10</Text>
                                            </View>
                                      </View>
          </View>
        ) : (
          checkforlogin
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#ffffff',
  },
  titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignContent: 'flex-end',
      alignItems: 'center',
    },
  caption: {
    //flex: 1,
    color: '#212121'
  },
  value: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
    fontWeight: '800'
  },
  valueForBar: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
    top: -5
  }

});

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
    profile: state.get('profile')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loginActions: bindActionCreators(loginAction, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalForm);
