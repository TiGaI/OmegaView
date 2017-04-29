import React, { Component, PropTypes } from 'react';
import {StyleSheet,
  Text, View, TouchableHighlight, ImagePickerIOS, Image } from 'react-native';

  import { connect } from 'react-redux';
  import { bindActionCreators } from 'redux';

  import * as loginAction from '../../actions/loginAction';
  import Icon from 'react-native-vector-icons/Ionicons';

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
        console.log(this.props.profile)
        return(
          <View style={styles.container}>
            <Text>asdasdsaasd </Text>

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
        actions: bindActionCreators(loginAction, dispatch)
      };
    }

    export default connect(mapStateToProps, mapDispatchToProps)(PinForm);
