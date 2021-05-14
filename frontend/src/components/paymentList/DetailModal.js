/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import IconAntD from 'react-native-vector-icons/AntDesign';
import ProductItemInModal from './ProductItemInModal';
import {Card, CardItem} from 'native-base';
import AppText from '../common/AppText';

const DetailModal = ({isModalVisible, toggleModal, payment}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      style={styles.detail}
      onBackdropPress={toggleModal}
      animationIn="zoomIn"
      animationOut="zoomOut">
      <View style={{flex: 1, width: '100%'}}>
        <Card>
          <CardItem header style={styles.header}>
            <AppText style={{fontWeight: '700', fontSize: 20}}>
              {payment.txDateTime.substring(0, 10)}
              <AppText style={styles.fontHeader2}>
                &nbsp;&nbsp;{payment.txDateTime.substring(11, 19)}
              </AppText>
              <AppText style={styles.fontHeader2}>
                &nbsp;&nbsp;({payment.id})
              </AppText>
            </AppText>
            <TouchableOpacity
              underlayColor="transparent"
              style={styles.close}
              onPress={toggleModal}>
              <IconAntD name="close" size={30} color="rgb(142, 144, 144)" />
            </TouchableOpacity>
          </CardItem>
        </Card>
        <FlatList
          data={payment.paymentDetail}
          keyExtractor={item => item.prodId}
          renderItem={item => <ProductItemInModal product={item} />}
          numColumns={3}
        />
      </View>
    </Modal>
  );
};

export default DetailModal;

const styles = StyleSheet.create({
  detail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
    marginBottom: '30%',
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    borderBottomColor: 'rgb(213, 213, 213)',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  thumbnail: {
    flexDirection: 'row',
    borderRadius: 6,
  },
  close: {
    position: 'absolute',
    left: '100%',
  },
  fontHeader2: {
    fontWeight: '400',
    fontSize: 15,
  },
});
