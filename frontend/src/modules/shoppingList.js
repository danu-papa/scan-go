import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as shoppingListApi from '../lib/api/shoppingList';

export const fetchShoppingList = createAsyncThunk(
  'shoppingList/fetchShoppingList',
  async () => {
    try {
      const response = await shoppingListApi.readItems();
      return response.data;
    } catch (e) {}
  },
);
export const updateShoppingListItem = createAsyncThunk(
  'shoppingList/updateShoppingListItem',
  async ({prodId, memberId, qty}) => {
    try {
      await shoppingListApi.updateItem({prodId, memberId, qty});
      return {prodId, qty};
    } catch (e) {}
  },
);
export const deleteShoppingListItem = createAsyncThunk(
  'shoppingList/deleteShoppingListItem',
  async ({memberId, prodIds}) => {
    //prodIds 배열
    try {
      await shoppingListApi.deleteItem({memberId, prodIds});
      return prodIds;
    } catch (e) {}
  },
);

export const deleteAllShoppingListItem = createAsyncThunk(
  'shoppingList/deleteAllShoppingListItem',
  async ({memberId}) => {
    //prodIds 배열
    try {
      await shoppingListApi.deleteAllItem({memberId});
    } catch (e) {}
  },
);
export const addShoppingListItemByBarcode = createAsyncThunk(
  'shoppingList/addShoppingListItemByBarcode',
  async formData => {
    try {
      const response = await shoppingListApi.addItemByBarcode(formData);

      return response;
    } catch (e) {
      console.log(e);
    }
  },
);
const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: {
    loading: false,
    hasErrors: false,
    paymentDetail: [],
    lastItem: null,
  },
  reducers: {
    allCheckShoppingListItem: (state, {payload}) => {
      state.paymentDetail = state.paymentDetail.map(item => {
        return {...item, isCheck: payload};
      });
    },
    isCheckedShoppingListItem: (state, {payload}) => {
      state.paymentDetail = state.paymentDetail.map(item => {
        if (item.prodId === payload.prodId) {
          return {...item, isCheck: !item.isCheck};
        } else {
          return item;
        }
      });
    },
    removeLastItem: state => {
      console.log('removeLastItem!!!!!!!!!!');
      state.lastItem = null;
    },
  },
  extraReducers: {
    [fetchShoppingList.pending]: state => {
      state.loading = true;
    },
    [fetchShoppingList.fulfilled]: (state, {payload}) => {
      state.id = payload.id;
      state.storeId = payload.storeId;
      state.paymentDetail = payload.paymentDetail;
    },
    [fetchShoppingList.rejected]: state => {
      state.loading = false;
      state.hasErrors = true;
    },
    [updateShoppingListItem.fulfilled]: (state, {payload}) => {
      state.paymentDetail = state.paymentDetail.map(item => {
        if (item.prodId === payload.prodId) {
          return {...item, qty: payload.qty};
        } else {
          return item;
        }
      });
    },
    [deleteShoppingListItem.fulfilled]: (state, {payload}) => {
      state.paymentDetail = state.paymentDetail.filter(list => {
        for (let i of payload) {
          if (list.prodId === i) {
            return false;
          }
        }
        return true;
      });
    },
    [deleteAllShoppingListItem.fulfilled]: state => {
      state.paymentDetail = [];
    },
    [addShoppingListItemByBarcode.pending]: state => {
      state.loading = true;
    },
    [addShoppingListItemByBarcode.fulfilled]: (state, {payload}) => {
      state.lastItem = payload.data;
      state.loading = false;
      state.hasErrors = false;
    },
    [addShoppingListItemByBarcode.rejected]: state => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  isCheckedShoppingListItem,
  allCheckShoppingListItem,
  removeLastItem,
} = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
