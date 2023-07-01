// import { Platform } from 'react-native';
// import messaging from '@react-native-firebase/messaging';

// export const scheduleReminderNotification = async (title, body, date) => {
//   try {
//     const hasPermission = await messaging().hasPermission();
//     if (!hasPermission) {
//       await messaging().requestPermission();
//     }

//     const notificationId = Math.random().toString(36).substring(7);

//     if (Platform.OS === 'android') {
//       await messaging().setAutoInitEnabled(true);
//       await messaging().registerDeviceForRemoteMessages();
//     }

//     const scheduledNotification = {
//       notificationId,
//       title,
//       body,
//       data: {}, // additional data to send with the notification
//       android: {
//         channelId: 'reminders', // channel ID created for reminders
//         smallIcon: 'ic_notification', // icon name for Android
//       },
//       ios: {
//         sound: true,
//       },
//       date, // selected date and time to send the reminder
//     };

//     await messaging().scheduleNotification(scheduledNotification);
//     console.log('Reminder notification scheduled successfully!');
//   } catch (error) {
//     console.error('Error scheduling reminder notification:', error);
//   }
// };
