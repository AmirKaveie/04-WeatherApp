import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const CITY = 'HALIFAX';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/gfs?latitude=44.6464&longitude=-63.5729&hourly=temperature_2m&timezone=America%2FNew_York')
    .then((response) => response.json())
    .then((data) => {
      setWeather(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
  }, []);

  if(loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='0000ff' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Weather in {CITY}</Text>
      {weather ? (
        <>
          <Text style={styles.text}>
            Temperature: {weather.hourly.temperature_2m[0]} C
          </Text>
          <Text style={styles.text}>
            Description: Not provided by Open-Meteo API
          </Text>
        </>
      ) : (
        <Text style={styles.text}>Could not fetch weather data</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
});