import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Article } from './types';

export type InitialState = {
  articles: Article[];
};

const initialState: InitialState = {
  articles: [],
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
    // builder

  },
});

export const {  } = mainSlice.actions;

export const selectCount = (state: RootState) => state.main;

export default mainSlice.reducer;
