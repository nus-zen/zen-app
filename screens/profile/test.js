const handleLogin = async () => {
  const lastLoginDate = await AsyncStorage.getItem("lastLoginDate");
  const currentTime = new Date().getTime();

  if (!lastLoginDate) {
    // User's first login or app's first use, directly increment streak
    incrementStreak();
  } else {
    const timeDifference = currentTime - parseInt(lastLoginDate, 10);
    const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;

    if (timeDifference >= twentyFourHoursInMilliseconds) {
      // More than 24 hours since last login, reset streak
      resetStreak();
    } else {
      // Less than 24 hours since last login, increment streak
      incrementStreak();
    }
  }

  await AsyncStorage.setItem("lastLoginDate", currentTime.toString());
};
