import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Article } from './types';
import axios from 'axios';
import { BASE_API_URL } from '../config';

export type InitialState = {
  articles: Article[];
  isLoading: boolean;
};

const initialState: InitialState = {
  articles: [],
  isLoading: false,
};

export const getArticles = createAsyncThunk<
  Article[],
  undefined,
  { rejectValue: string }
>('getArticles', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(BASE_API_URL + `articles`);
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server error!');
  }
});

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getArticles.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.articles = action.payload;
          state.isLoading = false;
        },
      );
  },
});

// export const {} = mainSlice.actions;

export const mainState = (state: RootState) => state.main;

export default mainSlice.reducer;
