import React from "react";
import { Text } from "react-native";
import Swiper from "react-native-swiper";

const OnboardingScreen = () => {
  return (
    <Swiper showsPagination={true}>
      <Text> swiper 1 </Text>
      <Text> swiper 2 </Text>
      <Text> swiper 3 </Text>
    </Swiper>
  );
};

export default OnboardingScreen;
