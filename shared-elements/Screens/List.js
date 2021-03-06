import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import Icon from '../Components/Icon';
import MarketingSlider from '../Components/MarketingSlider';

import { DATA } from '../config/travel';
import { SPACING } from "../config/theme";

const List = (props) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <MarketingSlider />
      <View style={styles.container}>
        {
          DATA.map((item) => {
            return(
              <TouchableOpacity
                key={item.id}
                style={{
                  padding: SPACING
                }}
                onPress={() => {}}
                >
                  <Icon uri={item.imageUri} />
              </TouchableOpacity>
            )
          })
        }
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20
  }
});
