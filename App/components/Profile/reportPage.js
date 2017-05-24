import React, { Component, PropTypes } from 'react';
import {
  StyleSheet, View , Text, Dimensions, TouchableOpacity, Image, ListView, ScrollView} from 'react-native';
  import { Container, Content, Tab, Tabs } from 'native-base';


  import { TabViewAnimated, TabBar } from 'react-native-tab-view';
  import {Bar, SmoothLine} from "react-native-pathjs-charts";

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import Icons from 'react-native-vector-icons/Ionicons';

import Slider from 'react-native-slider';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import ModalDropdown from 'react-native-modal-dropdown';

var {height, width} = Dimensions.get('window');
//
// var days  = [{day: 'Monday'},{day: 'Tuesday'},{day: 'Wednesday'},{day: 'Thursday'},{day: 'Friday'},{day: 'Saturaday'}, {day: 'Sunday'}]
//
class ReportPage extends Component{
  constructor(props){
    super(props);
      console.log('REPORT PAGE PROPS', this.props)
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state={
        goalHours: 1000,
        totalHours: 744,
        dailyHours: 3,
        totalPins: 15,
        totalStreak: 3,
        index: 0,
        routes: [
      { key: '1', title: 'First' },
      { key: '2', title: 'Second' },
      ]

      }

  }
  componentDidMount(){
      console.log('REPORT PAGE PROPS MOUNTSSS', this.props)
  }

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBar {...props} />;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <View style={[ styles.page, { backgroundColor: '#ff4081' } ]} />;
    case '2':
      return <View style={[ styles.page, { backgroundColor: '#673ab7' } ]} />;
    default:
      return null;
    }
  };
  render() {
    let data = [
    [{
      "v": 49,
      "name": "Jan"
    }, {
      "v": 42,
      "name": "Feb"
    }],
    [{
      "v": 120,
      "name": "March"
    }, {
      "v": 62,
      "name": "April"
    }],
    [{
      "v": 29,
      "name": "May"
    }, {
      "v": 15,
      "name": "June"
    }]
  ]

  let datas = [
    [{
      "x": 0,
      "y": 10
    }, {
      "x": 1,
      "y": 22
    }, {
      "x": 2,
      "y": 22
    }, {
      "x": 3,
      "y": 33
    }, {
      "x": 4,
      "y": 64
    }, {
      "x": 5,
      "y": 12
    }, {
      "x": 6,
      "y": 89
    }, {
      "x": 7,
      "y": 32
    }, {
      "x": 8,
      "y": 76
    }, {
      "x": 9,
      "y": 44
    }, {
      "x": 10,
      "y": 98
    }],
    [{
      "x": 0,
      "y": 10
    }, {
      "x": 1,
      "y": 12
    }, {
      "x": 2,
      "y": 40
    }, {
      "x": 3,
      "y": 93
    }, {
      "x": 4,
      "y": 62
    }, {
      "x": 5,
      "y": 12
    }, {
      "x": 6,
      "y": 36
    }, {
      "x": 7,
      "y": 22
    }, {
      "x": 8,
      "y": 64
    }, {
      "x": 9,
      "y": 22
    }, {
      "x": 10,
      "y": 100
    }]
  ]

  let options = {
    width: 300,
    height: 200,
    margin: {
      top: 20,
      left: 25,
      bottom: 50,
      right: 20
    },
    color: '#55A5FF',
    gutter: 10,
    animate: {
      type: 'oneByOne',
      duration: 200,
      fillTransition: 3
    },
    axisX: {
      showAxis: true,
      showLines: false,
      showLabels: true,
      showTicks: true,
      zeroAxis: true,
      orient: 'bottom',
      label: {
        fontFamily: 'Arial',
        fontSize: 12,
        fontWeight: true,
        fill: 'white'
      }
    },
    axisY: {
      showAxis: true,
      showLines: true,
      showLabels: true,
      showTicks: false,
      zeroAxis: false,
      orient: 'left',
      label: {
        fontFamily: 'Arial',
        fontSize: 12,
        fontWeight: true,
        fill: 'white'
      }
    }
  }

    return (
      <View style={{flex: 1, justifyContent: 'center'}}>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 2, justifyContent: 'center', alignItems: 'flex-start', backgroundColor: 'white', padding: 10}}>
            <Text style={{fontSize: 25, fontWeight: '500', color: 'black', textAlign: 'center', backgroundColor: 'transparent'}}>
              REPORT
            </Text>
            <Text style={{fontSize: 15, fontWeight: '400', color: 'grey', textAlign: 'center', backgroundColor: 'transparent'}}>
              Your Grade is based on your tracked hours vs goal hours.
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          <AnimatedCircularProgress
            size={75}
            width={15}
            fill={((this.state.totalHours/this.state.goalHours)*100)}
            rotation={0}
            tintColor="#4FB1FF"
            backgroundColor="#C6C6C6">
            {
              (fill) => (
                <View style={{height: 75, width: 75, justifyContent: 'center', alignItems: 'center' ,position: 'absolute', top: 0, left: 0}}>
                <Text style={{fontSize: 25, fontWeight: '700', color: 'black', textAlign: 'center', backgroundColor: 'transparent'}}>
                  A
                </Text>
                </View>
              )
            }
          </AnimatedCircularProgress>
          </View>
        </View>


        <View style={{flex: 4, backgroundColor: '#152D44'}}>
          <Tabs>
                  <Tab heading="STATS">
                    <ScrollView>
                    <View style={{flex: 1, backgroundColor: '#F0F0F0'}}>
                      <View style={{height: 250, backgroundColor: 'white', margin: 15, marginBottom: 0}}>
                        <View style={{flex: 1/2, flexDirection: 'row', padding: 10}}>
                          <Text style={{fontSize: 20, fontWeight: '500', color: 'black', textAlign: 'center', backgroundColor: 'transparent'}}>
                            GOALS
                          </Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
                              <Text style={{fontSize: 15, fontWeight: '400', color: '#404040', textAlign: 'left', backgroundColor: 'transparent'}}>
                                Eating
                              </Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                              <AnimatedCircularProgress
                                size={50}
                                width={5}
                                fill={(100)}
                                rotation={0}
                                tintColor="#44CB60"
                                backgroundColor="#C6C6C6">
                                {
                                  (fill) => (
                                    <View style={{height: 50, width: 50, justifyContent: 'center', alignItems: 'center' ,position: 'absolute', top: 0, left: 0}}>
                                    <Text style={{fontSize: 15, fontWeight: '700', color: 'black', textAlign: 'left', backgroundColor: 'transparent'}}>
                                      12
                                    </Text>
                                    </View>
                                  )
                                }
                              </AnimatedCircularProgress>
                            </View>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
                              <Text style={{fontSize: 15, fontWeight: '400', color: '#404040', textAlign: 'left', backgroundColor: 'transparent'}}>
                                Hobby
                              </Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                              <AnimatedCircularProgress
                                size={50}
                                width={5}
                                fill={((this.state.totalHours/this.state.goalHours)*100)}
                                rotation={0}
                                tintColor="#FFA042"
                                backgroundColor="#C6C6C6">
                                {
                                  (fill) => (
                                    <View style={{height: 50, width: 50, justifyContent: 'center', alignItems: 'center' ,position: 'absolute', top: 0, left: 0}}>
                                    <Text style={{fontSize: 15, fontWeight: '700', color: 'black', textAlign: 'center', backgroundColor: 'transparent'}}>
                                      5
                                    </Text>
                                    </View>
                                  )
                                }
                              </AnimatedCircularProgress>
                            </View>
                          </View>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
                              <Text style={{fontSize: 15, fontWeight: '400', color: '#404040', textAlign: 'left', backgroundColor: 'transparent'}}>
                                Sleeping
                              </Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                              <AnimatedCircularProgress
                                size={50}
                                width={5}
                                fill={((this.state.totalHours/this.state.goalHours)*100)}
                                rotation={0}
                                tintColor="#4FB1FF"
                                backgroundColor="#C6C6C6">
                                {
                                  (fill) => (
                                    <View style={{height: 50, width: 50, justifyContent: 'center', alignItems: 'center' ,position: 'absolute', top: 0, left: 0}}>
                                    <Text style={{fontSize: 15, fontWeight: '700', color: 'black', textAlign: 'center', backgroundColor: 'transparent'}}>
                                      7
                                    </Text>
                                    </View>
                                  )
                                }
                              </AnimatedCircularProgress>
                            </View>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
                              <Text style={{fontSize: 15, fontWeight: '400', color: '#404040', textAlign: 'left', backgroundColor: 'transparent'}}>
                                Studying
                              </Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                              <AnimatedCircularProgress
                                size={50}
                                width={5}
                                fill={((this.state.totalHours/this.state.goalHours)*100)}
                                rotation={0}
                                tintColor="#D142FF"
                                backgroundColor="#C6C6C6">
                                {
                                  (fill) => (
                                    <View style={{height: 50, width: 50, justifyContent: 'center', alignItems: 'center' ,position: 'absolute', top: 0, left: 0}}>
                                    <Text style={{fontSize: 15, fontWeight: '700', color: 'black', textAlign: 'center', backgroundColor: 'transparent'}}>
                                      2
                                    </Text>
                                    </View>
                                  )
                                }
                              </AnimatedCircularProgress>
                            </View>
                          </View>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
                              <Text style={{fontSize: 15, fontWeight: '400', color: '#404040', textAlign: 'left', backgroundColor: 'transparent'}}>
                                Training
                              </Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                              <AnimatedCircularProgress
                                size={50}
                                width={5}
                                fill={((this.state.totalHours/this.state.goalHours)*100)}
                                rotation={0}
                                tintColor="#FF4646"
                                backgroundColor="#C6C6C6">
                                {
                                  (fill) => (
                                    <View style={{height: 50, width: 50, justifyContent: 'center', alignItems: 'center' ,position: 'absolute', top: 0, left: 0}}>
                                    <Text style={{fontSize: 15, fontWeight: '700', color: 'black', textAlign: 'center', backgroundColor: 'transparent'}}>
                                      19
                                    </Text>
                                    </View>
                                  )
                                }
                              </AnimatedCircularProgress>
                            </View>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
                              <Text style={{fontSize: 15, fontWeight: '400', color: '#404040', textAlign: 'left', backgroundColor: 'transparent'}}>
                                Working
                              </Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                              <AnimatedCircularProgress
                                size={50}
                                width={5}
                                fill={((this.state.totalHours/this.state.goalHours)*100)}
                                rotation={0}
                                tintColor="#434344"
                                backgroundColor="#C6C6C6">
                                {
                                  (fill) => (
                                    <View style={{height: 50, width: 50, justifyContent: 'center', alignItems: 'center' ,position: 'absolute', top: 0, left: 0}}>
                                    <Text style={{fontSize: 15, fontWeight: '700', color: 'black', textAlign: 'center', backgroundColor: 'transparent'}}>
                                      7
                                    </Text>
                                    </View>
                                  )
                                }
                              </AnimatedCircularProgress>
                            </View>
                          </View>
                        </View>

                      </View>

<Text>//////////////////GOALS///////////////////////</Text>

                    <View style={{height: 250, backgroundColor: 'white', margin: 15, marginBottom: 0}}>
                      <View style={{flex: 1/2, flexDirection: 'row', padding: 10}}>
                        <Text style={{fontSize: 20, fontWeight: '500', color: 'black', textAlign: 'center', backgroundColor: 'transparent'}}>
                          PINS
                        </Text>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
                            <Text style={{fontSize: 15, fontWeight: '400', color: '#404040', textAlign: 'left', backgroundColor: 'transparent'}}>
                              Eating
                            </Text>
                          </View>
                          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                            <Icons style={{fontSize: 35, color: '#44CB60', backgroundColor: 'transparent'}} name="md-pin"/>
                            <Text style={{fontSize: 15, fontWeight: '700', color: 'black', textAlign: 'center', backgroundColor: 'transparent'}}>3</Text>
                          </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
                            <Text style={{fontSize: 15, fontWeight: '400', color: '#404040', textAlign: 'left', backgroundColor: 'transparent'}}>
                              Hobby
                            </Text>
                          </View>
                          <View style={{flex: 1, justifyContent: 'center'}}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                              <Icons style={{fontSize: 35, color: '#FFA042', backgroundColor: 'transparent'}} name="md-pin"/>
                              <Text style={{fontSize: 15, fontWeight: '700', color: 'black', textAlign: 'center', backgroundColor: 'transparent'}}>12</Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
                            <Text style={{fontSize: 15, fontWeight: '400', color: '#404040', textAlign: 'left', backgroundColor: 'transparent'}}>
                              Sleeping
                            </Text>
                          </View>
                          <View style={{flex: 1, justifyContent: 'center'}}>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                                <Icons style={{fontSize: 35, color: '#4FB1FF', backgroundColor: 'transparent'}} name="md-pin"/>
                                <Text style={{fontSize: 15, fontWeight: '700', color: 'black', textAlign: 'center', backgroundColor: 'transparent'}}>5</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
                            <Text style={{fontSize: 15, fontWeight: '400', color: '#404040', textAlign: 'left', backgroundColor: 'transparent'}}>
                              Studying
                            </Text>
                          </View>
                          <View style={{flex: 1, justifyContent: 'center'}}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                              <Icons style={{fontSize: 35, color: '#D142FF', backgroundColor: 'transparent'}} name="md-pin"/>
                              <Text style={{fontSize: 15, fontWeight: '700', color: 'black', textAlign: 'center', backgroundColor: 'transparent'}}>9</Text>
                            </View>

                          </View>
                        </View>
                      </View>

                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
                            <Text style={{fontSize: 15, fontWeight: '400', color: '#404040', textAlign: 'left', backgroundColor: 'transparent'}}>
                              Training
                            </Text>
                          </View>
                          <View style={{flex: 1, justifyContent: 'center'}}>

                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                              <Icons style={{fontSize: 35, color: '#FF4646', backgroundColor: 'transparent'}} name="md-pin"/>
                              <Text style={{fontSize: 15, fontWeight: '700', color: 'black', textAlign: 'center', backgroundColor: 'transparent'}}>12</Text>
                            </View>
                          </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
                            <Text style={{fontSize: 15, fontWeight: '400', color: '#404040', textAlign: 'left', backgroundColor: 'transparent'}}>
                              Working
                            </Text>
                          </View>
                          <View style={{flex: 1, justifyContent: 'center'}}>

                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                              <Icons style={{fontSize: 35, color: '#434344', backgroundColor: 'transparent'}} name="md-pin"/>
                              <Text style={{fontSize: 15, fontWeight: '700', color: 'black', textAlign: 'center', backgroundColor: 'transparent'}}>12</Text>
                            </View>
                          </View>
                        </View>
                      </View>

                    </View>

                    </View>
                    </ScrollView>
                  </Tab>
                  <Tab heading="GRAPHS">
                    <View style={{flex: 2, backgroundColor: '#152D44', justifyContent: 'center', alignItems: 'center'}}>
                      <ScrollView>
                        <View style={{flex: 1, backgroundColor: "white", justifyContent: 'center', padding: 10, margin: 5}}>
                          <Text style={{fontSize: 20, fontWeight: '500', color: 'black', textAlign: 'left', backgroundColor: 'transparent'}}>Daily Insights</Text>
                          <Text style={{fontSize: 15, fontWeight: '300', color: 'grey', textAlign: 'left', backgroundColor: 'transparent'}}>
                            See your daily progress by tracking your productivity throughout the day.
                          </Text>
                        </View>
                      <View style={{flex: 4, backgroundColor: '#152D44', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: '500', color: 'white', textAlign: 'left', backgroundColor: 'transparent'}}>Goals</Text>
                        <SmoothLine data={datas} options={options} xKey='x' yKey='y' />
                        <Text style={{fontSize: 20, fontWeight: '500', color: 'white', textAlign: 'left', backgroundColor: 'transparent'}}>Productivity</Text>
                        <Bar data={data} options={options} accessorKey='v'/>
                      </View>

                      </ScrollView>
                    </View>

                  </Tab>

              </Tabs>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
		// actions: bindActionCreators(actionCreators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage);
