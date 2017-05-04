import React, { Component, PropTypes } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image, ListView } from 'react-native';
import { Spinner } from 'native-base';
import { Button, SocialIcon } from 'react-native-elements'
import { bindActionCreators } from 'redux';
import * as getDataActions from '../../actions/getDataAction';
import * as loginActions from '../../actions/loginAction';
import { connect } from 'react-redux';

var days  = [{day: 'Monday'},{day: 'Tuesday'},{day: 'Wednesday'},{day: 'Thursday'},{day: 'Friday'},{day: 'Saturaday'}, {day: 'Sunday'}]

class MainFeed extends Component{
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(days),
    };
  }
  render() {
    console.log(this.props.profile.userObject)
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
      { true ?  (
        <View style={{flex: 1, backgroundColor: '#FFF', marginTop: 10}}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', height: 75, marginLeft: 10, marginRight: 10, marginBottom: 0}}>

                  <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 0.35, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Text style={{color: '#8AC0FF', fontSize: 22, fontWeight: '700'}}>03</Text>
                    <Text style={{color: '#8AC0FF', fontSize: 12, fontWeight: '400'}}>Jan</Text>
                  </View>
                  <View style={{flex: 0.75, justifyContent: 'center', alignItems: 'center', borderRightWidth: 2, borderColor: '#EB3F54'}}>
                    <Text style={{color: '#5A6C76', fontSize: 18, fontWeight: '700'}}>11:30</Text>
                    <Text style={{color: '#5A6C76', fontSize: 8, fontWeight: '400'}}>AM</Text>
                  </View>
                  <View style={{flex: 3, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10}}>
                    <Text style={{color: 'grey', fontSize: 12, fontWeight: '500'}} numberOfLines={1}>Today I landed on Mars</Text>
                  </View>
                </View>
            </TouchableOpacity>}
          />
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
		getDataActions: bindActionCreators(getDataActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainFeed);
