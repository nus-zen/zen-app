import React from "react";
import { Text } from "react-native";
import Swiper from "react-native-swiper";
import OnboardingPart from "./OnboardingPart";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = () => {
  return (
    <Swiper showsPagination={true}>
      <OnboardingPart
        imageSource={require("../../assets/diet.png")}
        text={
          "Discover and choose from various activities like meditation, journaling, and more to start your mindfulness journey."
        }
      />
      <OnboardingPart
        imageSource={require("../../assets/diet.png")}
        text={
          "Earn points by completing activities and view your accumulated rewards. Redeem points for exclusive vouchers and discounts."
        }
      />
      <OnboardingPart
        imageSource={require("../../assets/diet.png")}
        text={
          "Analyze your mindfulness journey with insightful analytics. Keep track of your mood and progress with the mood calendar."
        }
        navigation={useNavigation()}
        isLast={true}
      />
    </Swiper>
  );
};

export default OnboardingScreen;
