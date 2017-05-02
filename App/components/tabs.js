import { Tabs, Tab, Icon } from 'react-native-elements'
import React, { Component, PropTypes } from 'react';
import {
   StyleSheet,
   Text,
   Navigator,
   TouchableOpacity
} from 'react-native'


import { connect } from 'react-redux';

import MainFeed from './MainFeed/MainFeed.js';
import PinForm from './Form/PinForm';
import StatsPage from './Categories/statistics.js';
import ProfilePage from './Profile/profilePage.js';

var NavigationBarRouteMapper = {
   LeftButton(route, navigator, index, navState) {
         return (
            <TouchableOpacity>
               <Text style={ styles.leftButton }>
                  Save
               </Text>
            </TouchableOpacity>
         )
   },
   RightButton(route, navigator, index, navState) {
		 	return (
         <TouchableOpacity>
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
};

class ApplicationTabs extends Component {
	constructor() {
	  super()
	  this.state = {
	    selectedTab: 'homepage',
	  }
	}
	changeTab (selectedTab) {
		  this.setState({selectedTab})
	}
	renderScene( route, nav ) {
    switch (route.id) {
      case 'PinForm':
        return <PinForm navigator={ nav } title={ "Activity" } />
    }
  }
	render() {

		const { selectedTab } = this.state

		return (
			<Tabs>
			  <Tab
			    titleStyle={{fontWeight: 'bold', fontSize: 10}}
			    selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
			    selected={selectedTab === 'homepage'}
			    title={selectedTab === 'homepage' ? 'MyPins' : null}
			    renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='home' size={33} />}
			    renderSelectedIcon={() => <Icon color={'#6296f9'} name='home' size={30} />}
			    onPress={() => this.changeTab('homepage')}>
						<MainFeed />
			  </Tab>

				<Tab
					titleStyle={{fontWeight: 'bold', fontSize: 10}}
					selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
					selected={selectedTab === 'mapPage'}
					title={selectedTab === 'mapPage' ? 'Maps' : null}
					renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='map' size={33} />}
					renderSelectedIcon={() => <Icon color={'#6296f9'} name='map' size={30} />}
					onPress={() => this.changeTab('mapPage')}>

						<StatsPage />
				</Tab>

				<Tab
					selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
					selected={selectedTab === 'goalsPage'}
					title={selectedTab === 'goalsPage' ? 'Add Goals' : null}
					renderIcon={() => <Icon containerStyle={{marginTop: -24}} color={'#1BB49C'} name='add-circle' size={80} />}
					renderSelectedIcon={() => <Icon color={'#1BB49C'} name='add-circle' size={80} />}
					onPress={() => this.changeTab('goalsPage')}>
					<Navigator
						initialRoute={{ id: 'PinForm', title: 'Activity' }}
						renderScene={ this.renderScene }

						navigationBar = {
							 <Navigator.NavigationBar
									style = { styles.navigationBar }
									routeMapper = { NavigationBarRouteMapper } />
						}
						/>

				</Tab>


			  <Tab
			    titleStyle={{fontWeight: 'bold', fontSize: 10}}
			    selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
			    selected={selectedTab === 'Stats'}
			    title={selectedTab === 'Stats' ? 'Stats' : null}
			    renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='date-range' size={33} />}
			    renderSelectedIcon={() => <Icon color={'#6296f9'} name='date-range' size={30} />}
			    onPress={() => this.changeTab('Stats')}>

					<PinForm />
			  </Tab>
				<Tab
					titleStyle={{fontWeight: 'bold', fontSize: 10}}
					selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
					selected={selectedTab === 'profile'}
					title={selectedTab === 'profile' ? 'PROFILE' : null}
					renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='person-pin' size={33} />}
					renderSelectedIcon={() => <Icon color={'#6296f9'} name='person-pin' size={30} />}
					onPress={() => this.changeTab('profile')}>

					<ProfilePage />
				</Tab>
			</Tabs>
		);
	}
}

const styles = StyleSheet.create({
   navigationBar: {
      backgroundColor: 'white',
			height: 50,
			borderBottomWidth: 1,
			borderColor: '#F6F6F6',
			padding: 10,
			shadowColor: '#F3F3F3',
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowOpacity: 0.3
   },
	 leftButton: {

		   color: '#A6A6A6',
			 margin: 10,
			 marginTop: -1,
       fontSize: 16
	 },
   title: {
      color: '#222222',
      justifyContent: 'center',
			marginTop: -1,
      fontSize: 18
   },
   rightButton: {
      color: '#222222',
      margin: 10,
			marginTop: -1,
      fontSize: 16
   }
})


ApplicationTabs.propTypes = {
    onPress: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

function mapStateToProps(state) {
	return {
		activitiesPageState: state.get('activitiesPageState')
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationTabs);
