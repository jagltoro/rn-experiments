import React, { useCallback, useEffect, useRef, useState } from "react";
import OverflowItems from "./OverflowItems";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  View,
  Dimensions,
  Text,
  Animated,
} from "react-native";
import { Directions, FlingGestureHandler, State } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const SPACING = 10;
const VISIBLE_ITEMS = 3;

const DATA = [
  {
    title: "Afro vibes",
    location: "Mumbai, India",
    date: "Nov 17th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/07/Afro-vibes-flyer-template.jpg",
  },
  {
    title: "Afro2 vibes",
    location: "Mumbai, India",
    date: "Nov 17th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/01/Jungle-Party-Flyer-Psd.jpg",
  },
  {
    title: "Afro3 vibes",
    location: "Mumbai, India",
    date: "Nov 17th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg",
  },
  {
    title: "Afro4 vibes",
    location: "Mumbai, India",
    date: "Nov 17th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2018/04/4th-of-july-Flyer-Psd-Template.jpg",
  },
  {
    title: "Afro5 vibes",
    location: "Mumbai, India",
    date: "Nov 17th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/05/Cosmetic-Flyer-Template.jpg",
  },
];

function Cell({ item, index, children, style, ...props }) {
  return (
    <View
      style={[
        style,
        { zIndex: DATA.length - index, elevation: DATA.length - index },
      ]}
      index={index}
      {...props}
    >
      {children}
    </View>
  );
}

export default function App() {
  const [data, setData] = useState(DATA);
  const scrollXIndex = useRef(new Animated.Value(0)).current;
  const scrollXAnimated = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const setActiveIndex = useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  useEffect(()=>{
    
  })

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  const renderer = useCallback((props) => {
    return <Cell {...props} />;
  }, []);

  return (
    <FlingGestureHandler
      key='left'
      direction={Directions.LEFT}
      onHandlerStateChange={event => {
        if(event.nativeEvent.state = State.END){ 
          if(index === data.length - 1){ return; }
          setActiveIndex(index + 1);
         }
      }}
    >
    <FlingGestureHandler
      key='right'
      direction={Directions.RIGHT}
      onHandlerStateChange={event => {
        if(event.nativeEvent.state = State.END){ 
          if(index === 0){ return; }
          setActiveIndex(index - 1);
        }
      }}
    >
      <SafeAreaView style={styles.container}>
        <OverflowItems data={data} {...{scrollXAnimated}} />
        <FlatList
          data={data}
          keyExtractor={(_, index) => String(index)}
          horizontal
          scrollEnabled={false}
          removeClippedSubviews={false}
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            padding: SPACING * 2,
          }}
          CellRendererComponent={renderer}
          renderItem={({ item, index }) => {
            const inputRange = [index - 1, index, index + 1];
            const translateX = scrollXAnimated.interpolate({
              inputRange,
              outputRange: [50, 0, -100],
            });
            const scale = scrollXAnimated.interpolate({
              inputRange,
              outputRange: [0.8, 1, 1.3],
            });
            const opacity = scrollXAnimated.interpolate({
              inputRange,
              outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
            });

            return (
              <Animated.View
                style={{
                  position: "absolute",
                  left: -ITEM_WIDTH / 2,
                  opacity,
                  transform: [{ translateX }, { scale }],
                }}
              >
                <Image
                  source={{ uri: item.poster }}
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                  }}
                />
              </Animated.View>
            );
          }}
        />
      </SafeAreaView>
    </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
});
