// import { Platform } from 'react-native';
// import messaging from '@react-native-firebase/messaging';

// export const scheduleWeeklyNotifications = async (notificationText, notificationsPerWeek) => {
//   try {
//     const hasPermission = await messaging().hasPermission();
//     if (!hasPermission) {
//       await messaging().requestPermission();
//     }

//     const notifications = [];

//     const currentDate = new Date();
//     const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;

//     // Calculate the interval between each notification
//     const interval = millisecondsPerWeek / notificationsPerWeek;

//     // Generate the scheduled dates for each notification
//     for (let i = 0; i < notificationsPerWeek; i++) {
//       const notificationDate = new Date(currentDate.getTime() + i * interval);

//       const notificationId = Math.random().toString(36).substring(7);

//       const scheduledNotification = {
//         notificationId,
//         title: 'Notification',
//         body: notificationText,
//         data: {}, // additional data to send with the notification
//         android: {
//           channelId: 'weekly-notifications', // channel ID created for weekly notifications
//           smallIcon: 'ic_notification', // icon name for Android
//         },
//         ios: {
//           sound: true,
//         },
//         date: notificationDate,
//       };

//       notifications.push(scheduledNotification);
//     }

//     if (Platform.OS === 'android') {
//       await messaging().setAutoInitEnabled(true);
//       await messaging().registerDeviceForRemoteMessages();
//     }

//     await messaging().scheduleMultipleNotifications(notifications);
//     console.log(`${notificationsPerWeek} weekly notifications scheduled successfully!`);
//   } catch (error) {
//     console.error('Error scheduling weekly notifications:', error);
//   }
// };
