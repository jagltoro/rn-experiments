import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, Animated, SafeAreaView, Platform } from 'react-native';
import {EvilIcons} from '@expo/vector-icons';
const {width} = Dimensions.get('screen');



const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;

const componentName = ({data, scrollXAnimated}) => {

  const inputRange = [-1,0,1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT]
  })
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{transform: [{translateY}]}}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={styles.location}>
                  <EvilIcons 
                    name='location'
                    size={16}
                    color='black'
                    style={{marginRight: 5}}
                  />
                  {item.location}
                </Text>
                <Text style={styles.date}>
                  {item.date}
                </Text>
              </View>
            </View>
          )
        })}
      </Animated.View>
    </View>
  );
};

export default componentName;

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 28,
    fontWeight: Platform === 'ios' ? '900' : 'bold',
    textTransform: 'uppercase',
    letterSpacing: -1
  },
  location: {
    fontSize: 16 
  },
  date: {
    fontSize: 12
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden'
  }
});
