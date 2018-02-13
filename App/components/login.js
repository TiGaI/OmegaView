import React, { Component, PropTypes } from 'react';
import {
  StyleSheet, Text, View, Image
} from 'react-native';
import { Button, SocialIcon } from 'react-native-elements'


class Login extends Component {
  render() {
    return (
      <Image source={require('../assets/iphone/docbitback.png')} style={styles.picture}>
        <View style={styles.socialContainer}>

          <SocialIcon
            light
            type='facebook'
            onPress={this.props.facebook}
          />

          <SocialIcon
            light
            type='google'
            onPress={this.props.google}
          />

        </View>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  picture:{
      flex: 1,
      width: null,
      height: null,
      justifyContent: 'center',
      alignItems: 'center',
  },
  socialContainer:{
    flex: 1,
    flexDirection: 'row',
    marginTop: 360
  }
})

Login.propTypes = {
    facebook: PropTypes.func.isRequired,
    onSkip: PropTypes.func.isRequired
};

export default Login;
