/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps*/
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import {CameraScreen} from 'react-native-camera-kit';
import {CameraFooter} from '../components/scanning/CameraFooter';
import IconAntD from 'react-native-vector-icons/AntDesign';
import CameraItem from '../components/scanning/CameraItem';
import {useDispatch, useSelector} from 'react-redux';
import {
  addShoppingListItemByBarcode,
  removeLastItem,
} from '../modules/shoppingList';
import AppText from '../components/common/AppText';

const BarcodeScanningPage = ({navigation}) => {
  const dispatch = useDispatch();

  const {lastItem, sumPrice, error} = useSelector(({shoppingList}) => ({
    lastItem: shoppingList.lastItem,
    sumPrice: shoppingList.sumPrice.toString().toLocaleString(),
    error: shoppingList.hasErrors,
  }));

  const [qrvalue, setQrvalue] = useState('');

  useEffect(() => {
    if (!qrvalue || (lastItem && qrvalue === lastItem.prodCode)) {
      return;
    }
    console.log('qrvalue : ' + qrvalue);
    console.log('dispatch');
    dispatch(addShoppingListItemByBarcode({prodCode: qrvalue}));

    if (error) {
      ToastAndroid.showWithGravityAndOffset(
        '찾을 수 없는 상품입니다. 다시 스캔해주세요.',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        100,
      );
    }
  }, [qrvalue]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeLastItem());
      setQrvalue('');
    }, 5000);
  }, [lastItem]);

  useEffect(() => {
    return () => {
      dispatch(removeLastItem());
      setQrvalue('');
    };
  }, []);

  return (
    <>
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.close}
          onPress={() => navigation.navigate('MainPage')}>
          <IconAntD name="close" size={30} style={styles.whiteText} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageBtn}
          onPress={() => navigation.navigate('ImageScanningPage')}>
          <AppText style={styles.white11Text}>이미지</AppText>
          <AppText style={styles.white11Text}>스캔</AppText>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <CameraScreen
            showFrame={true}
            scanBarcode={true}
            laserColor={'transparent'}
            frameColor={'red'}
            colorForScannerFrame={'white'}
            onReadCode={event => setQrvalue(event.nativeEvent.codeStringValue)}
          />
        </View>
        {lastItem && <CameraItem lastItem={lastItem} style={styles.card} />}
        <CameraFooter navigation={navigation} sumPrice={sumPrice} />
      </View>
    </>
  );
};

export default BarcodeScanningPage;

const styles = StyleSheet.create({
  close: {
    zIndex: 5,
    width: 50,
    height: 50,
    position: 'absolute',
    left: '88%',
    top: '3%',
  },
  imageBtn: {
    backgroundColor: 'rgb(218,41,28)',
    zIndex: 5,
    width: 50,
    height: 50,
    position: 'absolute',
    left: '82%',
    top: '10%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    zIndex: 5,
    width: '95%',
    marginRight: 'auto',
    marginBottom: 40,
    marginLeft: 'auto',
    borderRadius: 10,
  },
  whiteText: {
    color: 'rgb(255,255,255)',
  },
  white11Text: {
    color: 'rgb(255,255,255)',
    fontSize: 11,
  },
});
