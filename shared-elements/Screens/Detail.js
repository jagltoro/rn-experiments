import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import {SPACING, ICON_SIZE, width} from '../config/theme';
import Icon from '../Components/Icon';
import BackIcon from '../Components/BackIcon';
import { DATA } from '../config/travel';

const Detail = (props) => {
  const item = DATA[0];
  const ref = React.useRef();
  const selectedItemIndex = DATA.findIndex((i) => i.id === item.id);
  return (
    <SafeAreaView style={{flex: 1}}>
      <BackIcon onPress={() => true} />

      <View style={styles.container}>
        {
          DATA.map((item) => (
            <TouchableOpacity key={item.id} style={{padding: SPACING}}>
              <Icon uri={item.imageUri} /> 
            </TouchableOpacity>
          ))
        }
      </View>
      <FlatList 
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
        renderItem={({item}) => {
          return (
            <ScrollView style={styles.scrollview}>
              <View style={{padding: SPACING}}>
                <Text style={{fontSize: 16}}>
                  {Array(50).fill(`${item.title} inner text \n`)}
                </Text>
              </View>
            </ScrollView>
          )
        }}
      >

      </FlatList>
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginVertical: 20
  },
  scrollview: {
    width: width - SPACING * 2,
    margin: SPACING,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 16
  }
});
