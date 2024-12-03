import PushNotification, {Importance} from 'react-native-push-notification';

class NotificationHandler {
  constructor() {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      requestPermissions: Platform.OS === 'android',
      popInitialNotification: true,
    });

    PushNotification.createChannel(
      {
        channelId: 'vitaltrack-reminders',
        channelName: 'VitalTrack Reminders',
        channelDescription: 'Reminders for health tracking and medications',
        playSound: true,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
      },
      created => console.log(`createChannel '${created}'`),
    );

    PushNotification.getChannels(channels => {
      console.log('Available channels:', channels);
    });
  }

  scheduleNotification({
    title,
    message,
    date,
    channelId = 'vitaltrack-reminders',
    repeatType = null,
  }) {
    console.log('Attempting to schedule notification for:', date);
    PushNotification.localNotificationSchedule({
      channelId,
      title,
      message,
      date,
      repeatType,
      allowWhileIdle: true,
      importance: Importance.HIGH,
      playSound: true,
      soundName: 'default',
      autoCancel: true,
      ongoing: false,
      priority: 'high',
      visibility: 'public',
      vibrate: true,
    });
  }
  showNotification({title, message, channelId = 'vitaltrack-reminders'}) {
    PushNotification.localNotification({
      channelId,
      title,
      message,
      importance: Importance.HIGH,
      playSound: true,
      soundName: 'default',
    });
  }

  getAllScheduledNotifications() {
    PushNotification.getScheduledLocalNotifications(notifications => {
      console.log('Scheduled notifications:', notifications);
    });
  }

  cancelAllNotifications() {
    PushNotification.cancelAllLocalNotifications();
  }
}

export default new NotificationHandler();
