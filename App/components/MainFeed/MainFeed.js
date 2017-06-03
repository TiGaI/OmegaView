import React, { Component, PropTypes } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image, ListView } from 'react-native';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';

import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider'

import { Spinner } from 'native-base';
import { Button, SocialIcon,  Icon } from 'react-native-elements'
import { bindActionCreators } from 'redux';
import * as getDataActions from '../../actions/getDataAction';
import * as activityActions from '../../actions/activityAction';
import { connect } from 'react-redux';

function arrayToListViewDataSourceBlob(list) {

  var blob = {
    sections: {},
    rows: {},
    sectionIds: [],
    rowIdsBySection: []
  }

  list.map((entry, i) => {

		var sectionId =  moment(entry.createdAt).format('dddd MMM Do');

		var rowId = entry._id;

    var sectionIndex = blob.sectionIds.indexOf(sectionId);
      if(sectionIndex === -1) {
  			sectionIndex = blob.sectionIds.push(sectionId) - 1;
  			blob.rowIdsBySection[sectionIndex] = [];
  		}

		blob.rowIdsBySection[sectionIndex].push(rowId);

		blob.rows[rowId] = entry;

	});
  return blob;

}

class MainFeed extends Component{
  constructor(props){
    super(props);
    this.state = {
      check: true,
      isOpen: false,
      productivity: 1,
      pageNumber: 0
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
  renderSectionHeader(sectionData, sectionID) {
       return (
           <View style={styles.section}>
               <Text style={styles.text}>{sectionID}</Text>
           </View>
       );
   }
  getIcon(category){
    if(category === 'eating'){
      return (
        <View style={{flex: 0.7, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D7601C'}}>
                <Icon
                  name='ios-pizza'
                  type='ionicon'
                  color='#fff'/>
        </View>
              );
    }else if(category === 'studying'){
      return (
        <View style={{flex: 0.7, justifyContent: 'center', alignItems: 'center', backgroundColor: '#009CD4'}}>
                <Icon
                  name='book'
                  type='font-awesome'
                  color='#fff'/>
        </View>
              );

    }else if(category === 'working'){
      return (
        <View style={{flex: 0.7, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D21F23'}}>
                <Icon
                  name='laptop-chromebook'
                  color='#fff'/>
          </View>
              );

    }else if(category === 'hobby'){
      return (
        <View style={{flex: 0.7, justifyContent: 'center', alignItems: 'center', backgroundColor: '#008E48'}}>
                <Icon
                  name='ios-game-controller-b'
                  type='ionicon'
                  color='#fff'/>
          </View>
              );
    }else if(category === 'sleeping'){
      return (
        <View style={{flex: 0.7, justifyContent: 'center', alignItems: 'center', backgroundColor: '#03386E'}}>
                <Icon
                  type='font-awesome'
                  name='bed'
                  color='#fff'/>
        </View>
              );

    }else if(category === 'training'){
      return (
        <View style={{flex: 0.7, justifyContent: 'center', alignItems: 'center', backgroundColor: '#01366A'}}>
                <Icon
                  name='fitness-center'
                  color='#fff'/>
        </View>
              );

    }
  }
  _endReached(){
    if(!this.state.check){
      this.props.getDataActions.pushFeedObjectActionForEndReach(this.props.profile.userObject._id, this.state.pageNumber)
      this.setState({
        pageNumber: this.state.pageNumber + 1
     })
     this.setState({
       check: false
     })
    }
  }
  onScroll(){
    if (this.refs.listview.scrollProperties.offset + this.refs.listview.scrollProperties.visibleLength >= this.refs.listview.scrollProperties.contentLength){
        this._endReached();
    }
    }
  render() {
    console.log('inside mainFeed: ', this.props.profile.userObject.sortedPing);
    if(this.props.login.skip){
      var checkforlogin = <Spinner color='green'/>
    }


    if(this.props.data.feedObject.length != 0){
              var blob = arrayToListViewDataSourceBlob(this.props.data.feedObject);

              var ds = new ListView.DataSource({
                  	sectionHeaderHasChanged: (h1, h2) => h1 !== h2,
                  	rowHasChanged: (r1, r2) => r1 !== r2,
                  	getSectionHeaderData: (blob, sectionId) => blob.sections[sectionId],
                  	getRowData: (blob, sectionId, rowId) => blob.rows[rowId]
                  });

              var dataSource = ds.cloneWithRowsAndSections(blob, blob.sectionIds, blob.rowIdsBySection)
    }

    return (
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
        <View style={{flex: 1, backgroundColor: '#FFF'}}>
                  <View style={styles.container}>
                        { !dataSource ?  (
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
                        ) : (
                              <ListView
                                      ref="listview"
                                      style={styles.listview}
                                      onScroll={this.onScroll.bind(this)}
                                      dataSource={dataSource}
                                      onEndReachedThreshold = {2000}
                                      onEndReached={() => {
                                           this._endReached();
                                        }}
                                        automaticallyAdjustContentInsets={false}
                                      keyboardDismissMode="on-drag"
                                      keyboardShouldPersistTaps={"always"}
                                      showsVerticalScrollIndicator={true}
                                      renderSectionHeader={this.renderSectionHeader}
                                      renderRow={(rowData) =>
                                            <TouchableOpacity style={{flex: 1, backgroundColor: 'white', height: 70, marginRight: 10, marginBottom: 0}}>
                                                <View style={{flex: 1, flexDirection: 'row'}}>

                                                  {this.getIcon(rowData.activityCategory)}

                                                <View style={{flex: 0.5, justifyContent: 'space-around', alignItems: 'flex-start'}}>
                                                  <View style={{flex: 1, flexDirection: 'row'}}>
                                                    <Text style={{color: '#5A6C76', fontSize: 15, fontWeight: '700'}}>{this.getTime(rowData.createdAt)}</Text>
                                                    <Text style={{color: '#5A6C76', fontSize: 10, fontWeight: '400'}}>{this.getAMPM(rowData.createdAt)}</Text>
                                                  </View>
                                                  <View style={{flex: 1, flexDirection: 'row', alignItems:'flex-end'}}>
                                                    <Text style={{color: '#5A6C76', fontSize: 15, fontWeight: '700'}}>{this.getTime(rowData.createdAt, rowData.activityDuration)}</Text>
                                                    <Text style={{color: '#5A6C76', fontSize: 10, fontWeight: '400'}}>{this.getAMPM(rowData.createdAt, rowData.activityDuration)}</Text>
                                                  </View>
                                                </View>
                                                <View style={{flex: 2, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10}}>
                                                  { rowData.activityImage ? this.renderAsset(this.state.photoData) : null}
                                                  <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                                                    <Text style={{color: 'grey', fontSize: 17, fontWeight: '500'}} numberOfLines={1}>{rowData.activityDuration} total hr of {rowData.activityCategory}</Text>
                                                    { rowData.activityNote ? <Text style={{color: 'grey', fontSize: 12, fontWeight: '500'}} numberOfLines={1}>Note: {rowData.activityNote}</Text>: null}
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
                                          </TouchableOpacity>
                                        }
                                    />
                        )}
                  </View>

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
    borderTopWidth: 6,
    borderTopColor: '#C5D6E0',
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
  },
  section: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6,
        backgroundColor: '#2671B1'
    },
  text: {
      color: 'white',
      paddingHorizontal: 8,
      fontSize: 16,
      textAlign: 'center'
  },
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
