import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { cardDataType } from '../utils/cardUtils';

interface GameState{
    totalPoint:number,
    level:number,    
}
const initialState:GameState={
    totalPoint:0,
    level:0
};

const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    setPoint: (
      state,
      action: PayloadAction<number>) => {
      state.totalPoint = action.payload;    
    },
    setLevel: (
        state,
        action: PayloadAction<number>) => {
        state.level = action.payload;    
      },
  },
});
export const {setLevel,setPoint}=gameSlice.actions
export default gameSlice;