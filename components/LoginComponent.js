import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      remember: false
    };
  }

  componentDidMount() {
    SecureStore.getItemAsync('userinfo').then((userdata) => {
      let userinfo = JSON.parse(userdata);
      if (userinfo) {
        this.setState({ username: userinfo.username });
        this.setState({ password: userinfo.password });
        this.setState({ remember: true });
      }
    });
  }

  handleLogin() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember)
      SecureStore.setItemAsync(
        'userinfo',
        JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      ).catch((error) => console.log('Could not save user info', error));
    else
      SecureStore.deleteItemAsync('userinfo').catch((error) =>
        console.log('Could not delete user info', error)
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="Username"
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          inputContainerStyle={styles.formInput}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: 'font-awesome', name: 'key' }}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          inputContainerStyle={styles.formInput}
        />
        <CheckBox
          title="Remember Me"
          center
          checked={this.state.remember}
          onPress={() => this.setState({ remember: !this.state.remember })}
          containerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
          <Button
            title="  Login"
            icon={<Icon name="sign-in" type="font-awesome" size={24} color="white" />}
            buttonStyle={{ backgroundColor: '#512DA8' }}
            onPress={() => this.handleLogin()}
          />
        </View>
        <View style={styles.formButton}>
          <Button
            title="  Register"
            icon={<Icon name="user-plus" type="font-awesome" size={24} color="white" />}
            onPress={() => this.props.navigation.navigate('Register')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 10,
    marginTop: 40
  },
  formInput: { marginHorizontal: 10 },
  formCheckbox: { backgroundColor: null, margin: 0 },
  formButton: { marginHorizontal: 20, marginVertical: 30 }
});

export default Login;
