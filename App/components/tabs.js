import { Tabs, Tab, Icon } from 'react-native-elements'
import React, { Component, PropTypes } from 'react';
import styles from './styles';
import { connect } from 'react-redux';

import PinForm from './form/PinForm';

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

			  </Tab>
				<Tab
					titleStyle={{fontWeight: 'bold', fontSize: 10}}
					selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
					selected={selectedTab === 'goalsPage'}
					title={selectedTab === 'goalsPage' ? 'Goals' : null}
					renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='map' size={50} />}
					renderSelectedIcon={() => <Icon color={'#6296f9'} name='map' size={30} />}
					onPress={() => this.changeTab('goalsPage')}>


				</Tab>

				<Tab
					selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
					selected={selectedTab === 'goalsPage'}
					title={selectedTab === 'goalsPage' ? 'Goals' : null}
					renderIcon={() => <Icon containerStyle={{justifyContent: 'flex-start', alignItems: 'center', marginTop: 12}} color={'#1BB49C'} name='add-circle' size={33} />}
					renderSelectedIcon={() => <Icon color={'#1BB49C'} name='add-circle' size={50} />}
					onPress={() => this.changeTab('goalsPage')}>
						<PinForm />
				</Tab>


			  <Tab
			    titleStyle={{fontWeight: 'bold', fontSize: 10}}
			    selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
			    selected={selectedTab === 'profile'}
			    title={selectedTab === 'profile' ? 'PROFILE' : null}
			    renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='date-range' size={33} />}
			    renderSelectedIcon={() => <Icon color={'#6296f9'} name='date-range' size={30} />}
			    onPress={() => this.changeTab('profile')}>


			  </Tab>
				<Tab
					titleStyle={{fontWeight: 'bold', fontSize: 10}}
					selectedTitleStyle={{marginTop: -1, marginBottom: 6}}
					selected={selectedTab === 'profile'}
					title={selectedTab === 'profile' ? 'PROFILE' : null}
					renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='person-pin' size={33} />}
					renderSelectedIcon={() => <Icon color={'#6296f9'} name='person-pin' size={30} />}
					onPress={() => this.changeTab('profile')}>


				</Tab>
			</Tabs>
		);
	}
}

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
