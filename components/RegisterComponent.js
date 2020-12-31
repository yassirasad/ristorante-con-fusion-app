import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { baseUrl } from '../shared/baseUrl';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      remember: false,
      imageUrl: baseUrl + 'images/logo.png'
    };
  }

  getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      if (!capturedImage.cancelled) {
        console.log(capturedImage);
        this.setState({ imageUrl: capturedImage.uri });
      }
    }
  };

  handleRegister() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember)
      SecureStore.setItemAsync(
        'userinfo',
        JSON.stringify({ username: this.state.username, password: this.state.password })
      ).catch((error) => console.log('Could not save user info', error));
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: this.state.imageUrl }}
              loadingIndicatorSource={require('./images/logo.png')}
              style={styles.image}
            />
            <Button title="Camera" onPress={this.getImageFromCamera} />
          </View>
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
          <Input
            placeholder="First Name"
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            onChangeText={(firstname) => this.setState({ firstname })}
            value={this.state.firstname}
            inputContainerStyle={styles.formInput}
          />
          <Input
            placeholder="Last Name"
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            onChangeText={(lastname) => this.setState({ lastname })}
            value={this.state.lastname}
            inputContainerStyle={styles.formInput}
          />
          <Input
            placeholder="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
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
              title="  Register"
              icon={<Icon name="user-plus" type="font-awesome" size={24} color="white" />}
              buttonStyle={{ backgroundColor: '#512DA8' }}
              onPress={() => this.handleRegister()}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 10
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  image: { margin: 10, width: 100, height: 75 },
  formInput: { marginHorizontal: 10 },
  formCheckbox: { backgroundColor: null, margin: 0 },
  formButton: { marginHorizontal: 20, marginVertical: 30 }
});

export default Register;
