import React, { Component } from 'react';
// import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  Picker,
  Switch,
  TouchableOpacity,
  Alert,
  Platform,
  ToastAndroid
} from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import * as Animatable from 'react-native-animatable';

class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: 1,
      smoking: false,
      date: new Date(),
      showDTPicker: false,
      mode: 'date'
    };
    this.handleReservation = this.handleReservation.bind(this);
  }

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: new Date(),
      showDTPicker: false,
      mode: 'date'
    });
  }

  handleReservation() {
    Alert.alert(
      'Your Reservation OK?',
      'Number of Guests: ' +
        this.state.guests +
        '\nSmoking: ' +
        (this.state.smoking ? 'Yes' : 'No') +
        '\nDate and Time: ' +
        Moment(this.state.date).format('ddd DD-MMM-YYYY h:mm A'),
      [
        { text: 'Cancel', style: 'cancel', onPress: () => this.resetForm() },
        {
          text: 'OK',
          onPress: () => {
            this.addReservationToCalendar(this.state.date);
            this.presentLocalNotification(this.state.date);
            this.resetForm();
          }
        }
      ],
      { cancelable: false }
    );
  }

  async addReservationToCalendar(date) {
    if (await this.obtainCalendarPermission()) {
      const calendars = await Calendar.getCalendarsAsync();

      const defaultCalendar =
        Platform.OS === 'ios'
          ? await Calendar.getDefaultCalendarAsync()
          : calendars.filter((cal) => cal.allowsModifications)[0];

      if (defaultCalendar) {
        Calendar.createEventAsync(defaultCalendar.id, {
          title: 'Con Fusion Table Reservation',
          startDate: date,
          endDate: new Date(date.valueOf() + 2 * 60 * 60 * 1000),
          timeZone: 'Asia/Hong_Kong',
          location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        })
          .then((res) => ToastAndroid.show(`Event created in Calendar ${res}`, ToastAndroid.LONG))
          .catch((err) =>
            ToastAndroid.show(`Couldn't create event in Calendar: ${err}`, ToastAndroid.LONG)
          );
      }
    }
  }

  async obtainCalendarPermission() {
    const permission = await Calendar.requestCalendarPermissionsAsync();
    if (!permission.granted) Alert.alert('Calender permission not granted to create Event');
    return permission.granted;
  }

  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
    if (permission.status !== 'granted') {
      permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
      if (permission.status !== 'granted') {
        Alert.alert('Permission not granted to show notifications');
      }
    }
    return permission;
  }

  async presentLocalNotification(date) {
    await this.obtainNotificationPermission();

    // When app is in foreground
    Notifications.setNotificationHandler({
      handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: true })
    });

    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Your Reservation',
        body: 'Reservation for ' + Moment(date).format('ddd DD-MMM-YYYY h:mm A') + ' requested',
        color: '#512DA8'
      },
      trigger: { seconds: 1 }
    });
  }

  // async presentLocalNotification(date) {
  //   await this.obtainNotificationPermission();
  //   Notifications.createChannelAndroidAsync('confusion', {
  //     name: 'confusion',
  //     sound: true,
  //     vibrate: false
  //   });
  //   Notifications.presentLocalNotificationAsync({
  //     title: 'My Reservation',
  //     body: 'Reservation for ' + Moment(date).format('ddd DD-MMM-YYYY h:mm A') + ' requested',
  //     ios: {
  //       sound: true
  //     },
  //     android: {
  //       color: '#512DA8',
  //       channelId: 'confusion'
  //     }
  //   });
  // }

  render() {
    return (
      <Animatable.View animation="zoomIn" duration={1000}>
        <ScrollView>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of Guests</Text>
            <Picker
              style={styles.formItem}
              selectedValue={this.state.guests}
              onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
            </Picker>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
            <Switch
              style={styles.formItem}
              value={this.state.smoking}
              trackColor={{ false: '#767577', true: '#512DA8' }}
              onValueChange={(value) => this.setState({ smoking: value })}
            ></Switch>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date and Time</Text>
            {/* Date Time Picker selecting field */}
            <TouchableOpacity
              style={styles.formItem}
              style={{
                padding: 7,
                borderColor: '#512DA8',
                borderWidth: 2,
                flexDirection: 'row'
              }}
              onPress={() => this.setState({ showDTPicker: true, mode: 'date' })}
            >
              <Icon type="font-awesome" name="calendar" color="#512DA8" />
              <Text>{' ' + Moment(this.state.date).format('DD-MMM-YYYY h:mm A')}</Text>
            </TouchableOpacity>
            {/* Date Time Picker */}
            {this.state.showDTPicker && (
              <DateTimePicker
                value={this.state.date}
                mode={this.state.mode}
                minimumDate={new Date()}
                minuteInterval={30}
                onChange={(event, date) => {
                  if (date === undefined) {
                    this.setState({ showDTPicker: false });
                  } else {
                    this.setState({
                      showDTPicker: this.state.mode === 'time' ? false : true,
                      mode: 'time',
                      date: new Date(date)
                    });
                  }
                }}
              />
            )}
          </View>
          <View style={styles.formRow}>
            <Button
              onPress={this.handleReservation}
              title="Reserve"
              color="#512DA8"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </ScrollView>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  }
});

export default Reservation;
