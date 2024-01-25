import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { cardDataType } from '../utils/cardUtils';

interface cardState{
  card:cardDataType
}

const initialState:cardState  = {
  card:{
    path:require('../assets/images/Adventurer.png'),
    name:'Adventurer'
  }
};

const cardSlice = createSlice({
  name: 'cardSlice',
  initialState,
  reducers: {
    updateTopCard: (
      state,
      action: PayloadAction<cardDataType>) => {

      state.card = action.payload;
      
    },
  },
});
export const {updateTopCard}=cardSlice.actions
export default cardSlice;