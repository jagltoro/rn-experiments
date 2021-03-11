import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';

import Icon from '../Components/Icon';
import MarketingSlider from '../Components/MarketingSlider';

import { DATA } from '../config/travel';
import { SPACING } from "../config/theme";

const List = ({navigation}) => {
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
                onPress={() => navigation.push('Detail', {item})}
                >
                  <SharedElement id={`item.${item.id}.icon`}>
                    <Icon uri={item.imageUri} />
                  </SharedElement>
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
