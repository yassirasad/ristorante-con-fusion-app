import React from 'react';
import { Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';

const sendMail = () => {
  MailComposer.composeAsync({
    recipients: ['confusion@food.net'],
    subject: 'Enquiry',
    body: 'To whom it may concern:'
  });
};

function Contact(props) {
  return (
    <Card title="Contact Information">
      <Text style={{ margin: 10, textAlign: 'center' }}>
        121, Clear Water Bay Road{'\n\n'}
        Clear Water Bay, Kowloon{'\n\n'}
        HONG KONG{'\n\n'}
        Tel: +852 1234 5678{'\n\n'}
        Fax: +852 8765 4321{'\n\n'}
        Email:confusion@food.net
      </Text>
      <Button
        title=" Send Email"
        icon={<Icon name="envelope-o" type="font-awesome" color="white" />}
        buttonStyle={{ backgroundColor: '#512DA8' }}
        onPress={sendMail}
      />
    </Card>
  );
}

export default Contact;
