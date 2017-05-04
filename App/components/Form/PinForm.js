  import React, { Component, PropTypes } from 'react';
  import {StyleSheet,
  Text, View, Image, TouchableOpacity, TextInput, ActionSheetIOS } from 'react-native';
  import {Button, Switch} from 'native-base';

  import { connect } from 'react-redux';
  import { bindActionCreators } from 'redux';

  import * as loginAction from '../../actions/loginAction';
  import * as activityAction from '../../actions/activityAction';

  import Video from 'react-native-video';
  import ImagePicker from 'react-native-image-crop-picker';
  import { RNS3 } from 'react-native-aws3';

  import Slider from 'react-native-slider'
  import { Icon } from 'react-native-elements'

  var BUTTONS = [
    'Photo Library',
    'Camera',
    'Delete Image',
    'Cancel',
  ];

  var DESTRUCTIVE_INDEX = 2;
  var CANCEL_INDEX = 3;

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
        activityCategory: "studying",
        activityCategoryIndex: 0,
        activityDuration: 0.5,
        activityNote: '',
        public: true,
        photoData: null
      }
    },
    showActionSheet(){
      var self = this;
      ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        tintColor: 'grey',
      },
      (buttonIndex) => {
        if(buttonIndex === 0){
          self.pickSingle(true);
        }else if(buttonIndex === 1){
          self.pickSingleWithCamera(true);
        }else if(buttonIndex === 2){
          self.deleteImage()
        }
      });
    },
    deleteImage(){
      this.setState({
        photoData: null
      })
    },
    pickSingle(cropit, circular=false) {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: cropit,
        cropperCircleOverlay: circular,
        compressImageMaxWidth: 640,
        compressImageMaxHeight: 480,
        compressImageQuality: 0.5,
        compressVideoPreset: 'MediumQuality',
      }).then(image => {
        console.log('received image', image);
        this.setState({
          photoData: {uri: image.path, width: image.width, height: image.height, mime: image.mime}
        });
      }).catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
    },
    pickSingleWithCamera(cropping) {
       ImagePicker.openCamera({
         cropping: cropping,
         width: 500,
         height: 500,
       }).then(image => {
         console.log('received image', image);
         this.setState({
           photoData: {uri: image.path, width: image.width, height: image.height}
         });
       }).catch(e => alert(e));
     },
     renderImage(image) {
        return <Image style={styles.activityImage} source={image} />
      },
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
        },
      renderAsset(image) {
        if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
          return this.renderVideo(image);
        }

        return this.renderImage(image);
      },
      componentDidUpdate(){
        this.props.formActions.putFormObjectIntoProp({
          activityCategory: this.state.activityCategory,
          activityCategoryIndex: this.state.activityCategoryIndex,
          activityDuration: this.state.activityDuration,
          activityNote: this.state.activityNote,
          public: this.state.public,
          photoData: this.state.photoData
        })
      },
      render() {
        const { profile } = this.props;

        return(
        <View style={{flex: 1, padding: 5, marginTop: 50}}>

          <View style={{flex: 0.5}}>
            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={() => this.showActionSheet()}>
                {this.state.photoData === null ? (
                       <Image style={styles.activityImage} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
                    ) : (
                      this.renderAsset(this.state.photoData)
                  )}
                </TouchableOpacity>

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
            var onPressOne = (value, obj, index) => {
              this.setState({
                activityCategory: obj,
                activityCategoryIndex: value
              })
            }

            return (
              <View style={{margin: 10, marginBottom: 20}} key={i}>
              {this.state.activityCategoryIndex === i ? (
                     <Button light style={{height: 30, backgroundColor: '#212121', borderWidth: 2, paddingTop: 2, paddingBottom: 2, paddingLeft: 15, paddingRight: 15,  borderColor: '#212121'}}
                     onPress={onPressOne.bind(obj, i, obj.activityCategory)}>
                        <Text style={{color: 'white'}}>{obj.label}</Text>
                    </Button>
                  ) : (<Button light style={{height: 30, borderColor: '#212121', borderWidth: 2, paddingTop: 2, paddingBottom: 2, paddingLeft: 15, paddingRight: 15, backgroundColor: 'white'}}
                  onPress={onPressOne.bind(obj, i, obj.activityCategory)}>
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
        actions: bindActionCreators(loginAction, dispatch),
        formActions: bindActionCreators(activityAction, dispatch)
      };
    }

    export default connect(mapStateToProps, mapDispatchToProps)(PinForm);
