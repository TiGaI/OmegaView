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
  reportsList(){
    console.log('REPORTS LIST CALLED',this.props.data.reportObject )
    var totalHours;
    var totalPins;
    return this.props.data.reportObject.map((data) => {
      for (var key in data.dataObject) {
        var obj = data.dataObject[key];
         for (var prop in obj) {
           if(prop === "totalHoursPerDay"){
             totalHours = obj[prop];
           }
           if(prop === "totalPinsPerDay"){
             totalPins = obj[prop];
           }
            console.log("KEYYYSSS", prop);
         }
      }
      return (
        <TouchableOpacity onPress={this.report.bind(this, data)} style={{flex: 1, backgroundColor: 'white', height: 75, margin: 10, marginBottom: 10}}>
            <View style={{flex: 1, flexDirection: 'row'}}>

            <View style={{flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2671B1'}}>
              <Text style={{color: '#fff', fontSize: 25, fontWeight: '400'}} numberOfLines={1}>{data.createdAt.substring(5,7) + "/" + data.createdAt.substring(8,10) + "/" + data.createdAt.substring(0,4)} </Text>
              <Text style={{color: '#fff', fontSize: 15, fontWeight: '400'}}>Report</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2671B1'}}>
              <Text style={{color: '#fff', fontSize: 25, fontWeight: '400'}}>{totalPins}</Text>
              <Text style={{color: '#fff', fontSize: 15, fontWeight: '400'}}>Pins</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2671B1'}}>
              <Text style={{color: '#fff', fontSize: 25, fontWeight: '400'}}>{totalHours}</Text>
              <Text style={{color: '#fff', fontSize: 15, fontWeight: '400'}}>Hours </Text>
            </View>
          </View>
      </TouchableOpacity>
      )
    })
  }
  render() {
    var x = 1;
    if(this.props.data.reportObject){
      x = 0;
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      var dataSource2 = ds.cloneWithRows(this.props.data.reportObject ? this.props.data.reportObject  : [])

      console.log('PROFILE PAGE PROPS INSIDE IF STATEMENT', this.props)
    }

    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        {x === 1 ? <View><Text>loading</Text></View> :
          (<View style={{flex: 1}}>
            <View style={{flex: 0.6, backgroundColor: '#21CE99'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 15}}>
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
                <Text style={{color: 'white', fontSize: 20, fontWeight: "400", marginTop: 5}}>{this.props.profile.userObject.firstName + " " + this.props.profile.userObject.lastName}</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row', marginTop: 20, marginBottom: 20}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: 'white', fontSize: 25, fontWeight: "400"}}>{this.props.profile.userObject.totalHoursLogged}</Text>
                  <Text style={{color: 'white', fontSize: 12, fontWeight: "600"}}>Total Hours</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: 'white', fontSize: 25, fontWeight: "400"}}>{this.props.profile.userObject.myActivity.length}</Text>
                  <Text style={{color: 'white', fontSize: 12, fontWeight: "600"}}>Total Pins</Text>
                </View>
              </View>
          </View>
          <View style={{flex: 1, backgroundColor: '#F4F2F2'}}>
            <ScrollView>
            <View style={{backgroundColor: '#F4F2F2'}} >{this.reportsList()}</View>
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
