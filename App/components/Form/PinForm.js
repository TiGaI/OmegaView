import React, { Component, PropTypes } from 'react';
import {StyleSheet,
  Text, View, TouchableHighlight, ImagePickerIOS, Image } from 'react-native';

  import { connect } from 'react-redux';
  import { bindActionCreators } from 'redux';


  import * as actionCreators from '../actions/initialAction';
  import * as loginAction from '../actions/loginAction';
  import Icon from 'react-native-vector-icons/Ionicons';

  //
  // var t = require('tcomb-form-native');
  // var Form = t.form.Form;
  //
  // var Activity = t.struct({
  //   activityNote: t.String,
  //   activityCategory: t.String,
  //   activityDuration: t.Number,
  //   activityStatus: t.Boolean
  // });
  //
  // var options = {
  //   fields: {
  //    activityCategory: {
  //       label: 'category',
  //       error: 'Title Required'
  //     },
  //     activityDuration: {
  //        label: 'Duration',
  //        placeholder: 'Duration',
  //        error: 'Duration Required'
  //      },
  //     activityNote: {
  //        label: 'Note',
  //        placeholder: 'Activity Note',
  //      }
  //      activityStatus: {
  //        label: 'Status',
  //        placeholder: 'Public'
  //      }
  //   }
  // };


  var PinForm = React.createClass({
    getInitialState() {
      return {
        value: {
          activityTitle: "",
          activityDescription: "",
          activityCategory: ""
        },
        position: {
          latitude: this.props.latitude,
          longitude: this.props.longitude
        },
        photoData: null
      };
    },

      render() {
        const { profile } = this.props;
        return(
          <View style={styles.container}>


          </View>
        )
      }
    })

    var styles = StyleSheet.create({
      container: {
        justifyContent: 'center',
        marginTop: 20,
        padding: 20,
        backgroundColor: '#ffffff',
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
        actions: bindActionCreators(actionCreators, dispatch)
      };
    }

    export default connect(mapStateToProps, mapDispatchToProps)(PinForm);
