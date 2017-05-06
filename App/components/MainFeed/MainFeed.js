import React, { Component, PropTypes } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image, ListView } from 'react-native';
import { Spinner } from 'native-base';
import { Button, SocialIcon,  Icon } from 'react-native-elements'
import { bindActionCreators } from 'redux';
import * as getDataActions from '../../actions/getDataAction';
import * as activityActions from '../../actions/activityAction';
import { connect } from 'react-redux';

class MainFeed extends Component{
  constructor(props){
    super(props);
    console.log('MAIN FEED PROPS', this.props)
    this.state = {
      dataSource: null
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
  getTime(date){
    var myDate = new Date(date);
    var hours = myDate.getHours();
    var minutes = myDate.getMinutes();
    // var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes;
    return strTime;
  }
  getAMPM(date){
    var myDate = new Date(date);
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
  render() {
    if(this.props.login.skip){
      var checkforlogin = <Spinner color='green'/>
    }

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(this.props.data.feedObject)

    return(

      <View style={{flex: 1}}>
      <View style={{flex: 0.085, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 70, borderBottomWidth: 1, borderColor: 'grey'}}>

      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
            </View>

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 20}}>
                  <Text style={{textAlign: 'center'}}>New Feed</Text>
            </View>

            <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 20}}>
                  <Icon
                     name='perm-data-setting'
                     onPress={() => {this.props.navigator.push({
                          id: 'GoalForm'
                     })}}/>
            </View>
      </View>


      </View>
      { this.props.profile.userObject ?  (
        <View style={{flex: 1, backgroundColor: '#FFF', marginTop: 10}}>
          <ListView
            dataSource={dataSource}
            renderRow={(rowData) =>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', height: 75, marginLeft: 10, marginRight: 10, marginBottom: 0}}>

                  <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 0.35, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Text style={{color: '#8AC0FF', fontSize: 22, fontWeight: '700'}}>{this.getDate(rowData.createdAt)}</Text>
                    <Text style={{color: '#8AC0FF', fontSize: 12, fontWeight: '400'}}>{this.getMonth(rowData.createdAt)}</Text>
                  </View>
                  <View style={{flex: 0.75, justifyContent: 'center', alignItems: 'center', borderRightWidth: 2, borderColor: '#EB3F54'}}>
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
                    <Icon
                       name='delete'
                       onPress={this.deleteActivity.bind(this, rowData._id)}
                      />
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
