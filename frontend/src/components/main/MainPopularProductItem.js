/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AppText from '../common/AppText';

const MainPopularProductItem = ({item, home}) => {
  return (
    <>
      <View style={styles.wrap}>
        <View style={styles.imageWrap}>
          <Image
            style={styles.image}
            source={{
              uri: (home ? 'data:image/png;base64,' : '') + item.image,
            }}
          />
        </View>
        <AppText
          numberOfLines={2}
          style={{marginTop: 10, fontSize: 13}}
          ellipsizeMode="tail">
          {item.prodName}
        </AppText>
      </View>
    </>
  );
};

export default MainPopularProductItem;

const styles = StyleSheet.create({
  wrap: {width: 120, marginRight: 20},
  image: {
    width: 110,
    height: 110,
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  imageWrap: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
