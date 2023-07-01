import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function ScrollableContent() {
  const pageData = [
    {
      title: 'Activities Completed',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          },
        ],
      },
    },
    {
      title: 'In App Duration',
      data: {
        labels: ['July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            data: [10, 35, 58, 70, 89, 63],
            color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
          },
        ],
      },
    },
    {
      title: 'Heart Rate Variability',
      data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
        datasets: [
          {
            data: [50, 60, 70, 80, 90, 100],
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          },
        ],
      },
    },
  ];

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
        {pageData.map((page, index) => (
          <View key={index} style={styles.pageContainer}>
            <Text style={styles.pageTitle}>{page.title}</Text>
            <LineChart
              data={page.data}
              width={chartWidth}
              height={chartHeight}
              yAxisLabel=""
              chartConfig={{
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              bezier
              style={styles.chart}
            />
          </View>
        ))}
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
