import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import cardSlice from './card';
import gameSlice from './gameSlice';

export const store = configureStore({
  reducer: {
    card:cardSlice.reducer,
    game:gameSlice.reducer
  },
  
});
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;