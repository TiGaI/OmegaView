import React, { Component, PropTypes } from 'react';
import {
  StyleSheet, View, Text } from 'react-native';
import { Spinner } from 'native-base';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/getDataAction';
import { connect } from 'react-redux';
import { Button, SocialIcon } from 'react-native-elements'

class MainFeed extends Component{
  constructor(props){
    super(props);
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
            <Text>Main Page Test</Text>
        </View>
        ) : (
          checkforlogin
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({

});

function mapStateToProps(state) {
	return {
    // goal: state.get('goal'),
    login: state.get('login'),
    profile: state.get('profile')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actionCreators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainFeed);
