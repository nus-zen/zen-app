import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

import ActivitiesCompletedChart from "./ActivitiesCompletedChart.js";
import InAppDurationChart from "./InAppDurationChart";
import HeartRateVariabilityChart from "./HeartRateVariabilityChart";

export default function ScrollableContent() {
  const [chartWidth, setChartWidth] = useState(
    Dimensions.get("window").width - 40
  );
  const [chartHeight, setChartHeight] = useState(200);
  const [currentPage, setCurrentPage] = useState(0); // Current page index

  useEffect(() => {
    const updateDimensions = () => {
      setChartWidth(Dimensions.get("window").width - 40);
    };

    const subscription = Dimensions.addEventListener(
      "change",
      updateDimensions
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleScroll = (event) => {
    const page = Math.floor(event.nativeEvent.contentOffset.x / chartWidth);
    setCurrentPage(page);
  };

  const renderPageIndicator = () => {
    const pages = 3;
    const indicators = [];

    for (let i = 0; i < pages; i++) {
      indicators.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.pageIndicator,
            i === currentPage ? styles.currentPageIndicator : null,
          ]}
        />
      );
    }

    return <View style={styles.pageIndicatorContainer}>{indicators}</View>;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={chartWidth + 20} // Chart width + margin
        snapToAlignment="start"
        onScroll={handleScroll} // Handle scroll events to update currentPage
        scrollEventThrottle={16}
      >
        {/* Render chart components */}
        <ActivitiesCompletedChart
          chartWidth={chartWidth}
          chartHeight={chartHeight}
        />
        <InAppDurationChart chartWidth={chartWidth} chartHeight={chartHeight} />
        <HeartRateVariabilityChart
          chartWidth={chartWidth}
          chartHeight={chartHeight}
        />
      </ScrollView>

      {/* Page indicator */}
      {renderPageIndicator()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
  },
  pageIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  pageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "gray",
  },
  currentPageIndicator: {
    backgroundColor: "black",
  },
});
