import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';

import {SPACING, ICON_SIZE, width} from '../config/theme';
import Icon from '../Components/Icon';
import BackIcon from '../Components/BackIcon';
import { DATA } from '../config/travel';

const Detail = ({navigation, route}) => {
  const {item} = route.params;
  const ref = React.useRef();
  const selectedItemIndex = DATA.findIndex((i) => i.id === item.id);
  const mountedAnimated = React.useRef(new Animated.Value(0)).current;
  const activeIndex = React.useRef(new Animated.Value(selectedItemIndex)).current;
  const animatedIndex = React.useRef(new Animated.Value(selectedItemIndex)).current;

  const animation = (toValue,delay) => (
    Animated.timing(mountedAnimated, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true
    })
  )

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedIndex, {
        toValue: activeIndex,
        duration: 300,
        useNativeDriver: true
      }),
      animation(1, 1000)
    ]).start();
  })

  const translateY = mountedAnimated.interpolate({
    inputRange: [0 , 1],
    outputRange: [50, 0]
  });

  const size = ICON_SIZE + SPACING * 2;
  const translateX = animatedIndex.interpolate({
    inputRange: [-1, 0 , 1],
    outputRange: [size, 0, -size]
  })

  return (
    <SafeAreaView style={{flex: 1}}>
      <BackIcon onPress={() => {
        animation(0).start(() => {
          navigation.goBack();
        })
      }} />

      <Animated.View style={{
         flexDirection: 'row',
         flexWrap: 'nowrap',
         marginVertical: 20,
         marginLeft: width / 2 - ICON_SIZE / 2 - SPACING,
         transform: [{translateX}]
      }}>
        {
          DATA.map((item, index) => {
            const inputRange = [index - 1, index, index + 1];
            const opacity = activeIndex.interpolate({
              inputRange,
              outputRange: [.3, 1, .3],
              extrapolate: 'clamp'
            })
            return (
              <TouchableOpacity key={item.id} style={{padding: SPACING}} onPress={() => {
                console.log(index);
                activeIndex.setValue(index);
                ref.current.scrollToIndex({
                  index,
                  animated: true
                })
              }}>
                <Animated.View style={{opacity, alignItems: 'center'}}>
                  <SharedElement id={`item.${item.id}.icon`}>
                    <Icon uri={item.imageUri} /> 
                  </SharedElement>
                  <Text style={{fontSize: 10}}>{item.title}</Text>
                </Animated.View>
              </TouchableOpacity>
            )
          })
        }
      </Animated.View>
      <Animated.FlatList 
        style={{opacity: mountedAnimated, transform: [{translateY}]}}
        ref={ref}
        data={DATA}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        initialScrollIndex={selectedItemIndex}
        nestedScrollEnabled
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index
        })}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev => {
          const newIndex = ev.nativeEvent.contentOffset.x === 0 ? ev.nativeEvent.contentOffset.x : Math.floor(ev.nativeEvent.contentOffset.x / width) + 1;
          activeIndex.setValue(newIndex);
        }}
        renderItem={({item}) => {
          return (
            <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
              <View style={{padding: SPACING}}>
                <Text style={{fontSize: 16}}>
                  {Array(50).fill(`${item.title} inner text \n`)}
                </Text>
              </View>
            </ScrollView>
          )
        }}
      >

      </Animated.FlatList>
    </SafeAreaView>
  );
};

Detail.sharedElements = (route, otherRoute, showing) => {
  return DATA.map(item => `item.${item.id}.icon`);
}


export default Detail;

const styles = StyleSheet.create({
  scrollview: {
    width: width - SPACING * 2,
    margin: SPACING,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 16
  }
});
