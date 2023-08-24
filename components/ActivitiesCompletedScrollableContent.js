import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import ActivitiesCompletedChart from './ActivitiesCompletedChart.js';
import InAppDurationChart from './InAppDurationChart';
import HeartRateVariabilityChart from './HeartRateVariabilityChart';

export default function ScrollableContent() {
  const [chartWidth, setChartWidth] = useState(Dimensions.get('window').width - 40);
  const [chartHeight, setChartHeight] = useState(200);

  useEffect(() => {
    const updateDimensions = () => {
      setChartWidth(Dimensions.get('window').width - 40);
    };

    Dimensions.addEventListener('change', updateDimensions);

    return () => {
      Dimensions.removeEventListener('change', updateDimensions);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={chartWidth + 20} // Chart width + margin
        snapToAlignment="start"
      >
        {/* Render chart components */}
        <ActivitiesCompletedChart chartWidth={chartWidth} chartHeight={chartHeight} />
        <InAppDurationChart chartWidth={chartWidth} chartHeight={chartHeight} />
        <HeartRateVariabilityChart chartWidth={chartWidth} chartHeight={chartHeight} />
      </ScrollView>
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
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginRight: 20,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
