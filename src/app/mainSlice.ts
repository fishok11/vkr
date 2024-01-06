import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface InitialState {

}

const initialState: InitialState = {

};

// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder

  },
});

export const {  } = mainSlice.actions;

export const selectCount = (state: RootState) => state.main;

export default mainSlice.reducer;
