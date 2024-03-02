import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Article, Question } from './types';
import axios from 'axios';
import { BASE_API_URL } from '../config';

export type InitialState = {
  article: Article;
  articles: Article[];
  questions: Question[];
  isLoading: boolean;
};

const initialState: InitialState = {
  article: {
    id: 0,
    title: '',
    content: '',
  },
  articles: [],
  questions: [],
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

export const getArticle = createAsyncThunk<
  Article,
  string,
  { rejectValue: string }
>('getArticle', async (articleId: string, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(BASE_API_URL + `articles/${articleId}`);
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Server error!');
  }
});

export const getQuestions = createAsyncThunk<
  Question[],
  undefined,
  { rejectValue: string }
>('getQuestions', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(BASE_API_URL + `questions`);
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
      )
      .addCase(getArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getArticle.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.article = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(getQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getQuestions.fulfilled,
        (state, action: PayloadAction<Question[]>) => {
          state.questions = action.payload;
          state.isLoading = false;
        },
      );
  },
});

// export const {} = mainSlice.actions;

export const mainState = (state: RootState) => state.main;

export default mainSlice.reducer;
