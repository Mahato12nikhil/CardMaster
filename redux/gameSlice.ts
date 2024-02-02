import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { cardDataType } from '../utils/cardUtils';
import { GAME_BASE_POINT, LEVEL_INCREASE_POINT, TURN_DECREMENT, TURN_INCREMENT } from '../utils/constants';
import { BlockData } from '../component/game/Game';

interface GameState{
    totalPoint:number,
    level:number,
    turn:number,
    isBoardUpdated:boolean,
    isCurrTurnUpdated:boolean,
    lastPoint:number,
    updatedIndices:{index:number,point:number}[],
    blocks:BlockData[]
}
const initialState:GameState={
    totalPoint:0,
    level:0,
    turn:0,
    isBoardUpdated:false,
    isCurrTurnUpdated:false,
    lastPoint:0,
    updatedIndices:[],
    blocks:[...Array(100).fill({})]
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
    updateLevel: (
        state) => {
        state.level +=1
        state.turn=0
        state.totalPoint=0,
        state.updatedIndices=[],
        state.isBoardUpdated=false
      },
    updateTurn:(state, action: PayloadAction<number>)=>{
      state.turn+=action.payload;
      if(action.payload===TURN_INCREMENT){ state.updatedIndices.pop()}
      if(state.turn===0) state.isBoardUpdated=false
    },
    updatePoint: (state, action: PayloadAction<{lastPoint:number,lastUpdatedIndex:number}>) => {
        state.totalPoint+=action.payload.lastPoint
        state.lastPoint=action.payload.lastPoint
        state.updatedIndices.push({index:action.payload.lastUpdatedIndex,point:action.payload.lastPoint}) 
        if(!state.isBoardUpdated) state.isBoardUpdated=true 
    }, 
    reducePoint:(state, action: PayloadAction<number>)=>{
        state.totalPoint-=action.payload
    },
    setCurrUpdate:(
      state
    )=>{
      state.isCurrTurnUpdated=!state.isCurrTurnUpdated
    },
    updateBlocks: (state, action: PayloadAction<BlockData[]>) => {
      state.blocks = action.payload;
    },
  },
});
export const {updateLevel,setPoint,updateTurn,setCurrUpdate,updateBlocks,updatePoint,reducePoint}=gameSlice.actions
export default gameSlice;