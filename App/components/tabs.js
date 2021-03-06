import { Tabs, Tab, Icon } from 'react-native-elements'
import React, { Component, PropTypes } from 'react';
import {
   StyleSheet,
   Text,
   Navigator,
   TouchableOpacity, Dimensions, Alert, AsyncStorage
} from 'react-native'


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MainFeed from './MainFeed/MainFeed.js';
import PinForm from './Form/PinForm';
import GoalForm from './Form/GoalForm';
import StatsPage from './Categories/statistics.js';
import ReportPage from './Profile/reportPage.js';
import ProfilePage from './Profile/profilePage.js';
import MapPage from './Map/mapPage.js';
import MapPageIndex from './Map/mapPageIndex.js';

import * as activityAction from '../actions/activityAction';
import * as loginAction from '../actions/loginAction';

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE = 1;
const LONGITUDE = 1;

const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class NavigationBar extends Navigator.NavigationBar {
  render() {
    var routes = this.props.navState.routeStack;

    if (routes.length) {
      var route = routes[routes.length - 1];

      if (route.display === false) {
        return null;
      }
    }

    return super.render();
  }
}

class ApplicationTabs extends Component {
	constructor() {
	  super()
	  this.state = {
	    selectedTab: 'homepage',
      initialPosition: {
       latitude: LATITUDE,
       longitude: LONGITUDE,
       latitudeDelta: LATITUDE_DELTA,
       longitudeDelta: LONGITUDE_DELTA
     },
     currentPosition: {
       latitude: LATITUDE,
       longitude: LONGITUDE,
       latitudeDelta: LATITUDE_DELTA,
       longitudeDelta: LONGITUDE_DELTA
     }
	  }
	}

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({currentPosition: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }});
    },
    );
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
	changeTab (selectedTab) {
		  this.setState({selectedTab})
	}
  submitForm(){
    var currentTime = new Date();
    currentTime = currentTime.getTime();

    //IF YOU WANT TO activate the time limit uncomment the below code

    // if(this.props.profile.userObject.myLastActivity){
    //   var lastActivityTime = new Date(this.props.profile.userObject.myLastActivity.createdAt);
    //   lastActivityTime = lastActivityTime.getTime();
    //
    //   var timeDuration = this.props.profile.userObject.myLastActivity.activityDuration * 3600;
    //
    //   console.log((currentTime - lastActivityTime)/1000, timeDuration)
    //
    //   if((currentTime - lastActivityTime)/1000 > timeDuration){
    //     this.props.activityActions.createActivity(this.props.data.feedObject, {
    //       activityCreator: this.props.profile.userObject._id,
    //       activityNote: this.props.form.formObject.activityNote,
    //       activityCategory: this.props.form.formObject.activityCategory,
    //       activityLatitude: this.state.currentPosition.latitude,
    //       activityLongitude: this.state.currentPosition.longitude,
    //       activityDuration: this.props.form.formObject.activityDuration,
    //       activityGoal: this.props.profile.userObject.myDailyGoal[this.props.form.formObject.activityCategory]
    //     }, this.props.form.formObject.photoData)
    //   }else{
    //     Alert.alert(
    //           'Activity Error',
    //           'You cannot create an activity within the time period of another activity'
    //         )
    //   }
    // }else{
      this.props.activityActions.createActivity(this.props.data.feedObject, {
        activityCreator: this.props.profile.userObject._id,
        activityNote: this.props.form.formObject.activityNote,
        activityCategory: this.props.form.formObject.activityCategory,
        activityLatitude: this.state.currentPosition.latitude,
        activityLongitude: this.state.currentPosition.longitude,
        activityDuration: this.props.form.formObject.activityDuration,
        activityGoal: this.props.profile.userObject.myDailyGoal[this.props.form.formObject.activityCategory]
      }, this.props.form.formObject.photo)
    // }
    this.changeTab('homepage');
  }
	renderScene( route, nav ) {
    switch (route.id) {
      case 'PinForm':
        return <PinForm navigator={ nav } title={ "Activity" } />
      case 'GoalForm':
        return <GoalForm navigator={ nav } title={ "Activity" } />
    }
  }
  renderMainScene(route, nav){
    switch (route.id) {
      case 'MainFeed':
        return <MainFeed navigator={ nav } title={ "MainFeed" } />
      case 'GoalForm':
        return <GoalForm navigator={ nav } title={ "GoalForm" } />
    }
  }
  renderProfileScene(route, nav){
    switch (route.id) {
      case 'ProfilePage':
        return <ProfilePage navigator={ nav } title={ "ProfilePage" } {...route.passProps}/>
      case 'ReportPage':
        return <ReportPage navigator={ nav } title={ "ReportPage" } {...route.passProps} />
    }
  }
  _removeStorage = async () => {
     try {
       await AsyncStorage.removeItem("USER_ID");
       await AsyncStorage.removeItem("USER");
       await AsyncStorage.removeItem("FEED");
     } catch (error) {
       console.log(error.message);
     }
   }
  signout(){
    this._removeStorage();
    var x = this.props.profile.userObject.profileImg
    if(x.indexOf('google') >= 0){
      this.props.loginActions.googlelogout();
    }else{
      this.props.loginActions.logout();
    }
  }
	render() {
		const { selectedTab } = this.state
    var self = this;
		return (
			<Tabs tabBarStyle={{backgroundColor: '#fff', overflow: 'visible', height: 50}} tabBarShadowStyle={{height: 0}}>
			  <Tab
			    titleStyle={{fontWeight: 'bold', fontSize: 10, color: "#21CE99"}}
			    selectedTitleStyle={{marginTop: -1, marginBottom: 6, color: "#21CE99"}}
			    selected={selectedTab === 'homepage'}
			    title={selectedTab === 'homepage' ? 'MyPins' : null}
			    renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#2671B1'} name='home' size={33} />}
			    renderSelectedIcon={() => <Icon color={'#21CE99'} name='home' size={30} />}
			    onPress={() => this.changeTab('homepage')}>

          <Navigator
            initialRoute={{ id: 'MainFeed', title: 'MainFeed', display: false }}
            renderScene={ this.renderMainScene }

            navigationBar = {
							 <NavigationBar
									style = { styles.mainFeednavigationBar }
									routeMapper = {{
                     LeftButton(route, navigator, index, navState) {
                       if(index > 0){
                         return (
                            <TouchableOpacity onPress={() => navigator.pop()}>
                               <Text style={ styles.leftButton }>
                                  Back
                               </Text>
                            </TouchableOpacity>
                         )
                       }else {return null}

                     },
                     RightButton(route, navigator, index, navState) {
                       if(index == 0){
                  		 	return null
                      }
                     },
                     Title(route, navigator, index, navState) {
                       if(index > 0){
                        return (
                           <Text style = { styles.title }>
                              Daily Goals
                           </Text>
                         )
                       }else {return null}
                     }
                  }} />
						}

            />
			  </Tab>

				<Tab
          titleStyle={{fontWeight: 'bold', fontSize: 10, color: "#21CE99"}}
          selectedTitleStyle={{marginTop: -1, marginBottom: 6, color: "#21CE99"}}
					selected={selectedTab === 'mapPage'}
					title={selectedTab === 'mapPage' ? 'Maps' : null}
					renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#2671B1'} name='map' size={33} />}
					renderSelectedIcon={() => <Icon color={'#21CE99'} name='map' size={30} />}
					onPress={() => this.changeTab('mapPage')}>
						<MapPage />
				</Tab>

				<Tab
          titleStyle={{marginTop: -1, marginBottom: 6, color: 'black', opacity: 1}}
					selectedTitleStyle={{marginTop: -1, marginBottom: 6, color: "#21CE99"}}
					selected={selectedTab === 'goalsPage'}
					title={'Add Tasks'}
          tabStyle={{opacity: 1}}
					renderIcon={() =>
            <Icon containerStyle={{zIndex: 1, marginTop: -24, borderRadius: 30, borderColor: 'white', borderWidth: 1, backgroundColor: '#2671B1', height: 60, width: 60, opacity: 1}}
            color={'white'} name='border-color' size={30} />}
					renderSelectedIcon={() => <Icon containerStyle={{marginTop: -24, borderColor: 'white', borderWidth: 1, borderRadius: 30, backgroundColor: '#21CE99', height: 60, width: 60}} color={'white'} name='border-color' size={30} />}
					onPress={() => this.changeTab('goalsPage')}>
					<Navigator
						initialRoute={{ id: 'PinForm', title: 'Activity' }}
						renderScene={ this.renderScene }
            navigationBar = {
							 <Navigator.NavigationBar
									style = { styles.navigationBar }
									routeMapper = {{
                     LeftButton(route, navigator, index, navState) {
                           return (
                              <TouchableOpacity onPress={() => self.changeTab('homepage')}>
                                 <Text style={ styles.leftButton }>
                                    Back
                                 </Text>
                              </TouchableOpacity>
                           )
                     },
                     RightButton(route, navigator, index, navState) {
                  		 	return (
                           <TouchableOpacity onPress={() => self.submitForm()}>
                              <Text style = { styles.rightButton }>
                                 Done
                              </Text>
                           </TouchableOpacity>
                  			 )
                     },
                     Title(route, navigator, index, navState) {
                        return (
                           <Text style = { styles.title }>
                              {route.title}
                           </Text>
                        )
                     }
                  }} />
						}
						/>
				</Tab>

			  <Tab
          titleStyle={{fontWeight: 'bold', fontSize: 10, color: "#21CE99"}}
          selectedTitleStyle={{marginTop: -1, marginBottom: 6, color: "#21CE99"}}
			    selected={selectedTab === 'Stats'}
			    title={selectedTab === 'Stats' ? 'Stats' : null}
			    renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#2671B1'} name='date-range' size={33} />}
			    renderSelectedIcon={() => <Icon color={'#21CE99'} name='date-range' size={30} />}
			    onPress={() => this.changeTab('Stats')}>
					<StatsPage />
			  </Tab>

				<Tab
          titleStyle={{fontWeight: 'bold', fontSize: 10, color: "#21CE99"}}
          selectedTitleStyle={{marginTop: -1, marginBottom: 6, color: "#21CE99"}}
					selected={selectedTab === 'profile'}
					title={selectedTab === 'profile' ? 'PROFILE' : null}
					renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#2671B1'} name='person-pin' size={33} />}
					renderSelectedIcon={() => <Icon color={'#21CE99'} name='person-pin' size={30} />}
					onPress={() => this.changeTab('profile')}>
            <Navigator
  						initialRoute={{ id: 'ProfilePage', title: 'Profile'}}
  						renderScene={ this.renderProfileScene }
  						navigationBar = {
  							 <Navigator.NavigationBar
                    style = {{backgroundColor: 'transparent', height: 75, overflow: 'visible'}}
                    routeMapper = {{
                       LeftButton(route, navigator, index, navState) {
                         if(index > 0){
                           return (
                              <TouchableOpacity onPress={() => {
                                 navigator.props.navigationBar.props.routeMapper.Title =  function Title(route, navigator, index, navState) {
                                    return null
                                  }
                                  navigator.pop()
                              }}>
                                 <Text style={ styles.leftButton }>
                                    Back
                                 </Text>
                              </TouchableOpacity>
                           )
                         }else{
                           return (
                              <TouchableOpacity style={{flex: 1, marginLeft: 20}} onPress={()=>{ self.signout() }}>
                                <Icon color='#2671B1' size={30} type='ionicon' name="md-power"/>
                              </TouchableOpacity>
                            )
                        }
                       },
                       RightButton(route, navigator, index, navState) {
                         return null
                       },
                       Title(route, navigator, index, navState) {
                         if(index > 0){
                           return (
                              <Text style = { styles.title }>
                                 {route.title}
                              </Text>
                           )
                         }else{
                           return null
                         }
                       }
                    }}
  									 />
  						}
  						/>
				</Tab>
			</Tabs>
		);
	}
}

const styles = StyleSheet.create({
   navigationBar: {
      backgroundColor: '#21CE99',
			height: 50,
			padding: 10,
      borderBottomWidth: 0,
      borderColor: 'transparent'
   },
   mainFeednavigationBar: {
     backgroundColor:'#21CE99',
     height: 50,
     borderBottomWidth: 0
   },
	 leftButton: {
		   color: 'white',
			 margin: 10,
			 marginTop: -1,
       fontSize: 16
	 },
   title: {
      color: 'white',
      justifyContent: 'center',
			marginTop: -1,
      fontSize: 18
   },
   rightButton: {
      color: 'white',
      margin: 10,
			marginTop: -1,
      fontSize: 16
   },
   tabStyleBarstyle: {
     borderWidth: 0,
     borderColor: 'white'
   }
})


ApplicationTabs.propTypes = {
    onPress: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
	return {
		activityActions: bindActionCreators(activityAction, dispatch),
    loginActions: bindActionCreators(loginAction, dispatch)
	};
}

function mapStateToProps(state) {
	return {
    profile: state.get('profile'),
		form: state.get('form'),
    data: state.get('data')
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationTabs);
