import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { fetchEntries, processActivities } from './DataProcessor';

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundColor: "#2C2C2C",
    backgroundGradientFrom: "#7a7979",
    backgroundGradientTo: "#c9c7c7",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(30, 144, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: "6", strokeWidth: "2", stroke: "#092b4d" },
};

export const transformActivityData = (activityData) => {
    return {
        labels: Object.keys(activityData),
        datasets: [
            {
                data: Object.values(activityData),
            },
        ],
    };
};

export default function ActivityGraph() {
    const [activityData, setActivityData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const entries = await fetchEntries();
            const activityCounts = processActivities(entries);
            setActivityData(activityCounts);
        };

        fetchData();
    }, []);

    const chartData = transformActivityData(activityData);

    return (
        <View style={styles.container}>
            {Object.keys(activityData).length === 0 ? (
                <Text style={styles.subtitle}>Log entries to see data</Text>
            ) : (
                <ScrollView horizontal>
                    <BarChart
                        data={chartData}
                        width={Math.max(screenWidth, chartData.labels.length * 50)}
                        height={220}
                        yAxisLabel=""
                        chartConfig={chartConfig}
                        verticalLabelRotation={30}
                        style={styles.chartStyle}
                    />
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },
    subtitle: {
        fontSize: 18,
        color: "#ff3b44",
        marginBottom: 10,
        textAlign: "center",
    },
    chartStyle: {
        marginVertical: 8,
        borderRadius: 16,
    },
});