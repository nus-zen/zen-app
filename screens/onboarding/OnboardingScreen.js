import React from "react";
import { Text } from "react-native";
import Swiper from "react-native-swiper";
import OnboardingPart from "./OnboardingPart";

const OnboardingScreen = () => {
  return (
    <Swiper showsPagination={true}>
      <OnboardingPart
        imageSource={require("../../assets/diet.png")}
        text={"Onboarding 1"}
      />
      <OnboardingPart
        imageSource={require("../../assets/diet.png")}
        text={"Onboarding 2"}
      />
      <OnboardingPart
        imageSource={require("../../assets/diet.png")}
        text={"Onboarding 3"}
      />
    </Swiper>
  );
};

export default OnboardingScreen;
