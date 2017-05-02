import React, { Component, PropTypes } from 'react';
import {
  StyleSheet, View } from 'react-native';

import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/goalandnotificationAction';
import { connect } from 'react-redux';

import Slider from 'react-native-slider'


class GoalForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      studyGoal: this.props.profile.userObject.dailyGoal.studyGoal,
      eatingGoal: this.props.profile.userObject.dailyGoal.eatingGoal,
      trainingGoal: this.props.profile.userObject.dailyGoal.trainingGoal,
      hobbyGoal: this.props.profile.userObject.dailyGoal.hobbyGoal,
      workingGoal: this.props.profile.userObject.dailyGoal.studyGoal,
      sleepingGoal: this.props.profile.userObject.dailyGoal.studyGoal
    };
  }
  submitGoalForm(){

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

      <View style={{flex: 1}}>
      { this.props.profile.userObject ?  (
        <View style={{flex: 1}}>

                            <View style={styles.container}>
                              <View style={styles.titleContainer}>
                                <Text style={styles.caption} numberOfLines={1}>Studying Goal</Text>
                              </View>
                                  <Slider
                                    value={this.state.studyGoal}
                                    minimumTrackTintColor='#1fb28a'
                                     maximumTrackTintColor='#d3d3d3'
                                     thumbTintColor='#1a9274'
                                     minimumValue={0}
                                      maximumValue={8}
                                      step={.5}
                                      trackStyle={customStyles2.track}
                                      thumbStyle={customStyles2.thumb}
                                    onValueChange={(studyGoal) => this.setState({studyGoal})} />

                                    <Text style={styles.value, {textAlign: 'center'}} numberOfLines={1}>{this.state.studyGoal}</Text>
                              </View>

                              <View style={styles.container}>
                                <View style={styles.titleContainer}>
                                  <Text style={styles.caption} numberOfLines={1}>Eating goal</Text>
                                </View>
                                    <Slider
                                      value={this.state.studyGoal}
                                      minimumTrackTintColor='#1fb28a'
                                       maximumTrackTintColor='#d3d3d3'
                                       thumbTintColor='#1a9274'
                                       minimumValue={0}
                                        maximumValue={8}
                                        step={.5}
                                        trackStyle={customStyles2.track}
                                        thumbStyle={customStyles2.thumb}
                                      onValueChange={(eatingGoal) => this.setState({eatingGoal})} />

                                      <Text style={styles.value, {textAlign: 'center'}} numberOfLines={1}>{this.state.eatingGoal}</Text>
                                </View>

                                <View style={styles.container}>
                                  <View style={styles.titleContainer}>
                                    <Text style={styles.caption} numberOfLines={1}>Training goal</Text>
                                  </View>
                                      <Slider
                                        value={this.state.studyGoal}
                                        minimumTrackTintColor='#1fb28a'
                                         maximumTrackTintColor='#d3d3d3'
                                         thumbTintColor='#1a9274'
                                         minimumValue={0}
                                          maximumValue={8}
                                          step={.5}
                                          trackStyle={customStyles2.track}
                                          thumbStyle={customStyles2.thumb}
                                        onValueChange={(trainingGoal) => this.setState({trainingGoal})} />

                                        <Text style={styles.value, {textAlign: 'center'}} numberOfLines={1}>{this.state.trainingGoal}</Text>
                                  </View>

                                  <View style={styles.container}>
                                    <View style={styles.titleContainer}>
                                      <Text style={styles.caption} numberOfLines={1}>Working goal</Text>
                                    </View>
                                        <Slider
                                          value={this.state.studyGoal}
                                          minimumTrackTintColor='#1fb28a'
                                           maximumTrackTintColor='#d3d3d3'
                                           thumbTintColor='#1a9274'
                                           minimumValue={0}
                                            maximumValue={8}
                                            step={.5}
                                            trackStyle={customStyles2.track}
                                            thumbStyle={customStyles2.thumb}
                                          onValueChange={(workingGoal) => this.setState({workingGoal})} />

                                          <Text style={styles.value, {textAlign: 'center'}} numberOfLines={1}>{this.state.workingGoal}</Text>
                                    </View>

                                    <View style={styles.container}>
                                      <View style={styles.titleContainer}>
                                        <Text style={styles.caption} numberOfLines={1}>Sleep goal</Text>
                                      </View>
                                          <Slider
                                            value={this.state.studyGoal}
                                            minimumTrackTintColor='#1fb28a'
                                             maximumTrackTintColor='#d3d3d3'
                                             thumbTintColor='#1a9274'
                                             minimumValue={0}
                                              maximumValue={8}
                                              step={.5}
                                              trackStyle={customStyles2.track}
                                              thumbStyle={customStyles2.thumb}
                                            onValueChange={(sleepingGoal) => this.setState({sleepingGoal})} />

                                            <Text style={styles.value, {textAlign: 'center'}} numberOfLines={1}>{this.state.sleepingGoal}</Text>
                                      </View>


                              <Button
                                large
                                backgroundColor={'#20C48A'}
                                onPress={this.submitGoalForm.bind(this)}
                                title='Submit Goal' />
          </View>
        ) : (
          checkforlogin
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  value: {
    flex: 1,
    textAlign: 'center',
    marginLeft: 10,
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
    // goal: state.get('goal'),
    login: state.get('login')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actionCreators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalForm);
