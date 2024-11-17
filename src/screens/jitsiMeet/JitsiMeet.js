import React, {useCallback, useRef, useEffect, useContext} from 'react';
import {BackHandler, Alert} from 'react-native';
import {JitsiMeeting} from '@jitsi/react-native-sdk';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../theme/AppContext';

const JitsiMeet = ({route}) => {
  const jitsiMeeting = useRef(null);
  const navigation = useNavigation();

  const onReadyToClose = useCallback(() => {
    Alert.alert(
      'Leave Meeting',
      'Are you sure you want to leave the meeting?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Exit',
          onPress: () => {
            if (jitsiMeeting.current) {
              jitsiMeeting.current.close();
            }
            navigation.navigate('Connect', );
          },
        },
      ],
      {cancelable: true},
    );
  }, [navigation]);

  // Handle receiving a message from another participant
  const onEndpointMessageReceived = useCallback(message => {
    Alert.alert('Message Received', `You received a message: ${message.text}`, [
      {text: 'OK'},
    ]);
    console.log('Message received:', message);
  }, []);

  // Event listeners for the Jitsi meeting
  const eventListeners = {
    onReadyToClose,
    onEndpointMessageReceived,
  };

  return (
    <JitsiMeeting
      config={{
        hideConferenceTimer: true,
      }}
      eventListeners={eventListeners}
      flags={{
        'call-integration.enabled': false,
        'fullscreen.enabled': true,
        'pip.enabled': false,
        'pip-while-screen-sharing.enabled': true,
        'security-options.enabled': false,
        'invite.enabled': false,
        'prejoinpage.enabled': false,
        'breakout-rooms.enabled': false,
      }}
      userInfo={{
        displayName: 'lovepreet',
        email: 'lovepreetarya1405@gmail.com',
      }}
      ref={jitsiMeeting}
      style={{flex: 1}}
      room={'lovepreet2'}
      // serverURL={'https://meet.indephysio.com'}
      serverURL={'https://meet.jit.si'}
    />
  );
};

export default JitsiMeet;
