import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const HeartRateVariabilityChart = ({ chartWidth, chartHeight }) => {
  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
      {
        data: [50, 60, 70, 80, 90, 100],
        color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
      },
    ],
  };
  
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.pageTitle}>Heart Rate Variability</Text>
      <LineChart
        data={chartData} // Use the chartData variable
        width={chartWidth}
        height={chartHeight}
        yAxisLabel=""
        chartConfig={{
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 20,
  },
});

export default HeartRateVariabilityChart;
