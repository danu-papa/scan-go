import {Container} from 'native-base';
import React from 'react';
import MainFooter from '../components/common/MainFooter';
import MainHeader from '../components/common/MainHeader';
import ProductListTab from '../components/productList/ProductListTab';
const MainPage = ({navigation}) => {
  return (
    <Container>
      <MainHeader />
      <ProductListTab />
      <MainFooter navigation={navigation} />
    </Container>
  );
};

export default MainPage;
