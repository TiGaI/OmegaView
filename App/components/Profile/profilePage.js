import React, { Component, PropTypes } from 'react';
import {
  StyleSheet, View , Text, Dimensions, TouchableOpacity, Image, ListView, NavigationBar, ScrollView} from 'react-native';
//
// import Modal from 'react-native-modalbox';

// import { Button, List, SocialIcon, Icon} from 'react-native-elements'
// import { Container, Content, Card, CardItem, Text, Body, Spinner, Radio, ListItem} from 'native-base';

import { bindActionCreators } from 'redux';
import * as getDataActions from '../../actions/getDataAction';
import * as activityActions from '../../actions/activityAction';

import { connect } from 'react-redux';
import Icons from 'react-native-vector-icons/Ionicons';

import Slider from 'react-native-slider';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import ModalDropdown from 'react-native-modal-dropdown';

var {height, width} = Dimensions.get('window');

var days  = [{day: 'Monday'},{day: 'Tuesday'},{day: 'Wednesday'},{day: 'Thursday'},{day: 'Friday'},{day: 'Saturaday'}, {day: 'Sunday'}]

import ReportPage from './reportPage.js';

class ProfilePage extends Component{
  constructor(props){
    super(props);
      console.log('PROFILE PAGE PROPS', this.props)
      this.props.getDataActions.pushReportObjectAction(this.props.profile.userObject._id)
      console.log("IDDDDDDD", this.props.profile.userObject._id);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows(days),

      };
  }
  report(rowData) {
    console.log('ROWWWWW', rowData);
    this.props.navigator.push({
      id: "ReportPage",
      passProps: {
      reportData: rowData
    }
    })
  }
  render() {
    var x = 1;
    if(this.props.profile.userObject){
      x = 0;
      console.log('INSIDE IN IF STATEMENT', this.props.profile)
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      var dataSource2 = ds.cloneWithRows(this.props.profile.userObject.sortedPing ? this.props.profile.userObject.sortedPing  : [])


    }
    console.log('PROFILE PAGE PROPS INSIDE RENDER', this.props)
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        {x === 1 ? <View><Text>loading</Text></View> :
          (<View style={{flex: 1}}>
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
                    source={{uri: this.props.profile.userObject.profileImg}}
                  />
                <Text style={{color: 'white', fontSize: 20, fontWeight: "400", marginTop: 10}}>{this.props.profile.userObject.firstName + " " + this.props.profile.userObject.lastName}</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: 'white', fontSize: 25, fontWeight: "400"}}>{this.props.profile.userObject.totalHoursLogged}</Text>
                  <Text style={{color: 'white', fontSize: 12, fontWeight: "400"}}>Total Hours</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: 'white', fontSize: 25, fontWeight: "400"}}>{this.props.profile.userObject.myActivity.length}</Text>
                  <Text style={{color: 'white', fontSize: 12, fontWeight: "400"}}>Total Pins</Text>
                </View>
              </View>
          </View>
          <View style={{flex: 1, backgroundColor: '#F4F2F2'}}>
            <ScrollView>
              <ListView
                dataSource={dataSource2}
                renderRow={(rowData) =>
                  <TouchableOpacity onPress={this.report.bind(this, rowData)} style={{flex: 1, backgroundColor: 'white', height: 75, margin: 10, marginBottom: 0}}>
                    {console.log('ROWDATA 2',rowData )}
                      <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#8AC0FF', fontSize: 25, fontWeight: '700'}}>{rowData.date.substring(0,2)}</Text>
                        <Text style={{color: '#8AC0FF', fontSize: 15, fontWeight: '400'}}>Jan</Text>
                      </View>
                      <View style={{flex: 3, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Text style={{color: 'grey', fontSize: 20, fontWeight: '500'}} numberOfLines={1}>Total Hours {rowData.totalHoursPerDay} hrs</Text>
                        <Text style={{color: 'black', fontSize: 12, fontWeight: '400'}}>Total Pins {rowData.totalPinsPerDay} </Text>
                      </View>
                    </View>
                </TouchableOpacity>}
              />


            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) =>
                <TouchableOpacity onPress={this.report.bind(this, rowData)} style={{flex: 1, backgroundColor: 'white', height: 75, margin: 10, marginBottom: 0}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{color: '#8AC0FF', fontSize: 25, fontWeight: '700'}}>03</Text>
                      <Text style={{color: '#8AC0FF', fontSize: 15, fontWeight: '400'}}>Jan</Text>
                    </View>
                    <View style={{flex: 3, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Text style={{color: 'grey', fontSize: 20, fontWeight: '500'}} numberOfLines={1}>{rowData.day}</Text>
                      <Text style={{color: 'black', fontSize: 12, fontWeight: '400'}}>Tuesday, 11:30 AM</Text>
                    </View>
                  </View>
              </TouchableOpacity>}
            />
          </ScrollView>
          </View>
          </View>
        )}

      </View>
    )
  }
}

function mapStateToProps(state) {
	return {
    // goal: state.get('goal'),
    login: state.get('login'),
    profile: state.get('profile'),
    data: state.get('data')
	};
}

function mapDispatchToProps(dispatch) {
	return {
    getDataActions: bindActionCreators(getDataActions, dispatch),
    activityActions: bindActionCreators(activityActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
