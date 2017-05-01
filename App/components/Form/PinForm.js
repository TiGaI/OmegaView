  import React, { Component, PropTypes } from 'react';
  import {StyleSheet,
  Text, View, ImagePickerIOS, Image, TextInput } from 'react-native';
  import {Button, Switch} from 'native-base';

  import { connect } from 'react-redux';
  import { bindActionCreators } from 'redux';

  import * as loginAction from '../../actions/loginAction';

  import Video from 'react-native-video';
  import ImagePicker from 'react-native-image-crop-picker';
  import { RNS3 } from 'react-native-aws3';

  import Slider from 'react-native-slider'
  import { Icon } from 'react-native-elements'

  // import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
  //
  // studyGoal: this.props.profile.userObject.dailyGoal.studyGoal,
  // eatingGoal: this.props.profile.userObject.dailyGoal.eatingGoal,
  // trainingGoal: this.props.profile.userObject.dailyGoal.trainingGoal,
  // hobbyGoal: this.props.profile.userObject.dailyGoal.hobbyGoal,
  // workGoal: this.props.profile.userObject.dailyGoal.studyGoal,
  // sleepingGoal: this.props.profile.userObject.dailyGoal.studyGoal
  //
  //
  //

  var radio_props = [
    {label: 'Studying', activityCategory: 'studying' },
    {label: 'Eating', activityCategory: 'eating' },
    {label: 'Training', activityCategory: 'training' },
    {label: 'Hobby', activityCategory: 'hobby' },
    {label: 'Working', activityCategory: 'working' },
    {label: 'Sleeping', activityCategory: 'sleeping' },
  ];

  var PinForm = React.createClass({
    getInitialState() {
      return {
        activityCategory: "",
        activityCategoryIndex: 0,
        activityDuration: 0.5,
        activityNote: '',
        public: true,
        // position: {
        //   latitude: this.props.latitude,
        //   longitude: this.props.longitude
        // },
        photoData: null
      };
    },
    pickSingleWithCamera(cropping) {
       ImagePicker.openCamera({
         cropping: cropping,
         width: 500,
         height: 500,
       }).then(image => {
         console.log('received image', image);
         this.setState({
           image: {uri: image.path, width: image.width, height: image.height},
           images: null
         });
       }).catch(e => alert(e));
     },
     cleanupSingleImage() {
        let image = this.state.image || (this.state.images && this.state.images.length ? this.state.images[0] : null);
        console.log('will cleanup image', image);

        ImagePicker.cleanSingle(image ? image.uri : null).then(() => {
          console.log(`removed tmp image ${image.uri} from tmp directory`);
        }).catch(e => {
          alert(e);
        })
      },
     renderImage(image) {
        return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
      },
      renderAsset(image) {
        if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
          return this.renderVideo(image);
        }

        return this.renderImage(image);
      },
      render() {
        const { profile } = this.props;
        console.log(this.state)
        return(
        <View style={{flex: 1, padding: 5, marginTop: 50}}>

          <View style={{flex: 0.5}}>
            <View style={styles.inputContainer}>
                <Image style={styles.activityImage} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
                <TextInput
                    multiline = {true}
                    numberOfLines = {4}
                    placeholder="Write Something About It..."
                    blurOnSubmit= {true}
                    editable = {true}
                    maxLength = {100}
                    onChangeText={(text) => this.setState({activityNote: text})}
                    value={this.state.activityNote}
                    style={styles.multiline}
                  />
            </View>
          </View>
          <Text style={{marginTop: 15, marginLeft: 15}}> Choose a Category </Text>
          <View style={{flex: 0.5, flexDirection: 'row', flexWrap: 'wrap', margin: 15}}>

          {radio_props.map((obj, i) => {
            var onPressOne = (value, obj) => {
              this.setState({
                activityCategory: obj,
                activityCategoryIndex: value
              })
            }

            return (
              <View style={{margin: 10, marginBottom: 20}} key={i}>
              {this.state.activityCategoryIndex === i ? (
                     <Button light style={{height: 30, backgroundColor: '#212121', borderWidth: 2, paddingTop: 2, paddingBottom: 2, paddingLeft: 15, paddingRight: 15,  borderColor: '#212121'}} onPress={onPressOne.bind(obj, i, obj.label)}>
                        <Text style={{color: 'white'}}>{obj.label}</Text>
                    </Button>
                  ) : (<Button light style={{height: 30, borderColor: '#212121', borderWidth: 2, paddingTop: 2, paddingBottom: 2, paddingLeft: 15, paddingRight: 15, backgroundColor: 'white'}} onPress={onPressOne.bind(obj, i)}>
                        <Text>{obj.label}</Text>
                      </Button>

                  )}
              </View>
            )
          })}
          </View>
            <View style={{flex: 1.5, margin: 5}}>
                <View style={styles.container}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.caption} numberOfLines={1}>Activity Duration?</Text>
                    <Text style={styles.value}>{this.state.activityDuration}</Text>
                  </View>
                      <Slider
                          value={this.state.activityDuration}
                          minimumTrackTintColor='#212121'
                          minimumValue={0.5}
                          maximumValue={10}
                          step={.5}
                          trackStyle={customStyles3.track}
                          thumbStyle={customStyles3.thumb}
                          onValueChange={(activityDuration) => this.setState({activityDuration})} />
                          <View style={styles.titleContainer}>
                            <Text style={styles.caption}>0</Text>
                            <Text style={styles.valueForBar}>10</Text>
                          </View>
                </View>

                <View style={{flex: 1, margin: 20}}>
                  <View style={styles.titleContainer}>
                  <Icon
                      size={25}

                      name='add-a-photo' />
                      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>

                          <Text>Public: </Text>
                          <Switch onTintColor="#212121" onValueChange={(value) => this.setState({public: value})} value={this.state.public} />
                      </View>
                  </View>
                </View>
              </View>
      </View>
        )
      }
    })

    var styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5, borderColor: '#212121'
      },
      inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', alignContent: 'center', paddingLeft: 15,
        paddingRight: 15, borderBottomWidth: 0.5, borderColor: '#212121'
      },
      multiline: {
        flex: 1,
        fontSize: 13,
        marginTop: 25, marginBottom: 25,
        height: 60,
        marginLeft: 10
      },
      titleContainer: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignContent: 'flex-end',
          alignItems: 'center',
        },
        caption: {
          //flex: 1,
          color: '#212121'
        },
        value: {
          flex: 1,
          textAlign: 'right',
          marginLeft: 10
        },
        valueForBar: {
          flex: 1,
          textAlign: 'right',
          marginLeft: 10,
          top: -5,
        },
        activityImage: {
          width: 50,
          height: 50
        }
    });

    var customStyles3 = StyleSheet.create({
      track: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#d0d0d0',
      },
      thumb: {
        width: 10,
        height: 30,
        borderRadius: 5,
        backgroundColor: '#212121',
          top: 25
      }
    });

    function mapStateToProps(state) {
      return {
        login: state.get('login'),
        profile: state.get('profile')
      };
    }

    function mapDispatchToProps(dispatch) {
      return {
        actions: bindActionCreators(loginAction, dispatch)
      };
    }

    export default connect(mapStateToProps, mapDispatchToProps)(PinForm);
