import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Article, Chapter, Question } from './types';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import db from '../firebase';

export type InitialState = {
  article: Article;
  articles: Article[];
  questions: Question[];
  chapters: Chapter[];
  isLoadingArticle: boolean;
  isLoadingArticles: boolean;
  isLoadingQuestions: boolean;
  isLoadingChapters: boolean;
};

const initialState: InitialState = {
  article: {
    id: '',
    chapterId: '',
    title: '',
    content: '',
  },
  articles: [],
  questions: [],
  chapters: [],
  isLoadingArticle: false,
  isLoadingArticles: false,
  isLoadingQuestions: false,
  isLoadingChapters: false,
};

export const getArticles = createAsyncThunk<
  Article[],
  string,
  { rejectValue: string }
>('getArticles', async (articleToSearch, { rejectWithValue }) => {
  try {
    const docRef = query(collection(db, 'articles'));
    const docs = await getDocs(docRef);
    const data: Article[] = [];

    docs.forEach((doc) => {
      const article: Article = {
        id: doc.id,
        chapterId: doc.data().chapterId,
        title: doc.data().title,
        content: doc.data().content,
      };

      data.push(article);
    });

    if (articleToSearch !== '') {
      const result = data.filter((article: Article) => {
        return article.title
          .toLowerCase()
          .includes(articleToSearch.toLowerCase());
      });

      return result;
    }

    return data;
  } catch (error) {
    return rejectWithValue('Server error!');
  }
});

export const getArticle = createAsyncThunk<
  Article,
  string,
  { rejectValue: string }
>('getArticle', async (articleId: string, { rejectWithValue }) => {
  try {
    const docRef = doc(db, 'articles', articleId);
    const docArticle = await getDoc(docRef);

    if (docArticle.exists()) {
      const data: Article = {
        id: docArticle.id,
        chapterId: docArticle.data().chapterId,
        title: docArticle.data().title,
        content: docArticle.data().content,
      };

      return data;
    } else {
      return rejectWithValue('Article not found');
    }
  } catch (error) {
    return rejectWithValue('Server error!');
  }
});

export const getQuestions = createAsyncThunk<
  Question[],
  undefined,
  { rejectValue: string }
>('getQuestions', async (_, { rejectWithValue }) => {
  try {
    const docRef = query(collection(db, 'questions'));
    const docs = await getDocs(docRef);
    const data: Question[] = [];

    docs.forEach((doc) => {
      const question: Question = {
        id: doc.id,
        articleId: doc.data().articleId,
        question: doc.data().question,
        correctAnswer: doc.data().correctAnswer,
        answers: doc.data().answers,
      };

      data.push(question);
    });

    return data;
  } catch (error) {
    return rejectWithValue('Server error!');
  }
});

export const getChapters = createAsyncThunk<
  Chapter[],
  undefined,
  { rejectValue: string }
>('getChapters', async (_, { rejectWithValue }) => {
  try {
    const docRef = query(collection(db, 'chapters'));
    const docs = await getDocs(docRef);
    const data: Chapter[] = [];

    docs.forEach((doc) => {
      const chapter: Chapter = {
        id: doc.id,
        chapter: doc.data().chapter,
      };

      data.push(chapter);
    });
    return data;
  } catch (error) {
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
        state.isLoadingArticles = true;
      })
      .addCase(
        getArticles.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.articles = action.payload;
          state.isLoadingArticles = false;
        },
      )
      .addCase(getArticle.pending, (state) => {
        state.isLoadingArticle = true;
      })
      .addCase(
        getArticle.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.article = action.payload;
          state.isLoadingArticle = false;
        },
      )
      .addCase(getQuestions.pending, (state) => {
        state.isLoadingQuestions = true;
      })
      .addCase(
        getQuestions.fulfilled,
        (state, action: PayloadAction<Question[]>) => {
          state.questions = action.payload;
          state.isLoadingQuestions = false;
        },
      )
      .addCase(getChapters.pending, (state) => {
        state.isLoadingChapters = true;
      })
      .addCase(
        getChapters.fulfilled,
        (state, action: PayloadAction<Chapter[]>) => {
          state.chapters = action.payload;
          state.isLoadingChapters = false;
        },
      );
  },
});

// export const { } = mainSlice.actions;

export const mainState = (state: RootState) => state.main;

export default mainSlice.reducer;
