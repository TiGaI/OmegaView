import React, { Component, PropTypes } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image, ListView } from 'react-native';
import PushNotification from 'react-native-push-notification';

import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider'

import { Spinner } from 'native-base';
import { Button, SocialIcon,  Icon } from 'react-native-elements'
import { bindActionCreators } from 'redux';
import * as getDataActions from '../../actions/getDataAction';
import * as activityActions from '../../actions/activityAction';
import { connect } from 'react-redux';

class MainFeed extends Component{
  constructor(props){
    super(props);
    this.state = {
      dataSource: null,
      isOpen: false,
      productivity: 1
    };
  }
  getDate(date){
    var myDate = new Date(date);
    myDate = myDate.getDate();
    return ('0' + myDate).slice(-2)
  }
  getMonth(date){
    var myDate = new Date(date);
    myDate = myDate.getMonth();
    return "JanFebMarAprMayJunJulAugSepOctNovDec".slice(myDate*3, myDate*3+3)
  }
  getTime(date, addTime){
    var myDate = new Date(date);

    if(addTime){
      myDate = new Date(myDate.getTime() + (addTime*60*60*1000));
    }
    var hours = myDate.getHours();
    var minutes = myDate.getMinutes();
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes;
    return strTime;

  }
  getAMPM(date, addTime){
    var myDate = new Date(date);
    if(addTime){
      myDate = new Date(myDate.getTime() + (addTime*60*60*1000));
    }
    var hours = myDate.getHours();
    var ampm = hours >= 12 ? 'pm' : 'am';
    return ampm;
  }
  renderImage(image) {
     return <Image style={styles.activityImage} source={image} />
  }
  renderVideo(video) {
       return (<View style={{height: 300, width: 300}}>
         <Video source={{uri: video.uri, type: video.mime}}
            style={{position: 'absolute',
               top: 0,
               left: 0,
               bottom: 0,
               right: 0
             }}
            rate={1}
            paused={false}
            volume={1}
            muted={false}
            resizeMode={'cover'}
            onError={e => console.log(e)}
            onLoad={load => console.log(load)}
            repeat={true} />
        </View>);
  }
  renderAsset(image) {
     if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
       return this.renderVideo(image);
     }

     return this.renderImage(image);
  }
  deleteActivity(activityID){
    this.props.activityActions.deleteActivity(this.props.data.feedObject, activityID, this.props.profile.userObject._id)
  }
  componentDidMount(){
    PushNotification.configure({
      onNotification: function(notification){
        this.setState({
          open: true
        })
      },
      permissions: {
          alert: true,
          badge: true,
          sound: true
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }
  pushNotificationOnGoal(message, createdAt){
    PushNotification.localNotificationSchedule({
      message: message,
      date: new Date(object)
    })
  }
  submitGoalForm(){
    if(this.state.productivity !== 1){
      this.props.getDataActions.changeProductivityAction(this.props.profile.userObject.myLastActivity, this.state.productivity)
    }

    this.setState({
      isOpen: false,
      productivity: 1
    });
  }
  render() {
    console.log(this.props)
    if(this.props.login.skip){
      var checkforlogin = <Spinner color='green'/>
    }

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(this.props.data.feedObject)
    if(this.props.data.feedObject.length === 0){
      console.log('there is nothing in here');

      var mainPageContent =
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon
               style={{marginTop: -50}}
               color={'#6D6E70'}
               size={60}
               name='location-off'
              />

            <Text style={{color: 'black', fontSize: 20, padding: 10, paddingLeft: 50, paddingRight: 50, textAlign: 'center'}}>
              Nothing logged within these 5 days
            </Text>
        </View>

    }else{
      console.log('there is something in here');
      var mainPageContent =
        <ListView
          dataSource={dataSource}
          renderRow={(rowData) =>
            <TouchableOpacity style={{flex: 1, backgroundColor: 'white', height: 110, marginLeft: 10, marginRight: 10, marginBottom: 0}}>

                <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 0.35, justifyContent: 'center', alignItems: 'flex-end'}}>
                  <Text style={{color: '#8AC0FF', fontSize: 22, fontWeight: '700'}}>{this.getDate(rowData.createdAt)}</Text>
                  <Text style={{color: '#8AC0FF', fontSize: 12, fontWeight: '400'}}>{this.getMonth(rowData.createdAt)}</Text>
                </View>
                <View style={{flex: 0.75, justifyContent: 'center', alignItems: 'center', borderRightWidth: 2, borderColor: '#EB3F54'}}>
                  <Text style={{color: '#5A6C76', fontSize: 18, fontWeight: '700'}}>{this.getTime(rowData.createdAt, rowData.activityDuration)}</Text>
                  <Text style={{color: '#5A6C76', fontSize: 8, fontWeight: '400'}}>{this.getAMPM(rowData.createdAt, rowData.activityDuration)}</Text>
                  <Text style={{color: '#5A6C76', fontSize: 22, fontWeight: '400'}}>-</Text>
                  <Text style={{color: '#5A6C76', fontSize: 18, fontWeight: '700'}}>{this.getTime(rowData.createdAt)}</Text>
                  <Text style={{color: '#5A6C76', fontSize: 8, fontWeight: '400'}}>{this.getAMPM(rowData.createdAt)}</Text>
                </View>
                <View style={{flex: 3, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10}}>
                  { rowData.activityImage ? this.renderAsset(this.state.photoData) : null}
                  <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                    <Text style={{color: 'grey', fontSize: 17, fontWeight: '500'}} numberOfLines={1}>{rowData.activityDuration} hr -> {rowData.activityCategory}</Text>
                    <Text style={{color: 'grey', fontSize: 12, fontWeight: '500'}} numberOfLines={1}>Note: {rowData.activityNote}</Text>
                  </View>
                </View>
                <View style={{flex: 0.5, justifyContent: 'center'}}>
                { new Date(rowData.createdAt).toLocaleString().split(',')[0]  == new Date().toLocaleString().split(',')[0] ?
                  (<Icon
                     name='delete'
                     onPress={this.deleteActivity.bind(this, rowData._id)}
                    />) : (null)
                  }
                </View>
              </View>
          </TouchableOpacity>}
        />

    }
    return(
      <View style={{flex: 1}}>
      <View style={{flex: 0.12, flexDirection: 'row', backgroundColor: '#21CE99', justifyContent: 'center', alignItems: 'center', height: 170}}>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
            </View>

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 20}}>
                  <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>New Feed</Text>
            </View>

            <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 20}}>
                  <Icon
                     color={'white'}
                     size={30}
                     name='perm-data-setting'
                     onPress={() => {this.props.navigator.push({
                          id: 'GoalForm'
                     })}}/>
            </View>
      </View>
      </View>
      { this.props.profile.userObject ?  (
        <View style={{flex: 1, backgroundColor: '#FFF', marginTop: 10}}>

          {mainPageContent}
          <Modal isOpen={this.state.isOpen} onClosed={() => this.setState({isOpen: false})} style={[styles.modal, styles.modal4]} position={"top"}>

                                  <View style={styles.container}>
                                  <View style={styles.titleContainer}>
                                    <Text style={styles.caption} numberOfLines={1}>How productive were you?</Text>
                                  </View>
                                      <Slider
                                        value={this.state.productivity}
                                        minimumTrackTintColor='#1fb28a'
                                         maximumTrackTintColor='#d3d3d3'
                                         thumbTintColor='#1a9274'
                                         minimumValue={0}
                                          maximumValue={1}
                                          step={0.05}
                                          trackStyle={customStyles2.track}
                                          thumbStyle={customStyles2.thumb}
                                        onValueChange={(value) => this.setState({value})} />

                                        <Text style={styles.value, {textAlign: 'center'}} numberOfLines={1}>{this.state.productivity}</Text>
                                  </View>

                                  <Button
                                    large
                                    backgroundColor={'#20C48A'}
                                    onPress={() => this.submitProductivityForm()}
                                    title='Submit Goal' />
              </Modal>
        </View>
        ) : (
          checkforlogin
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  modal4: {
    height: 350,
    backgroundColor: "#3B5998"
  },
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  caption: {
    //flex: 1,
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(MainFeed);
