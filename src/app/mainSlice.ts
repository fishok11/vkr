import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Article, Chapter, Question, User, UserLogIn } from './types';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import db from '../firebase';

export type InitialState = {
  article: Article;
  articles: Article[];
  questions: Question[];
  chapters: Chapter[];
  user: User;
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
  user: {
    id: '',
    email: '',
    username: '',
    password: '',
  },
  isLoadingArticle: false,
  isLoadingArticles: false,
  isLoadingQuestions: false,
  isLoadingChapters: false,
};

export const getArticles = createAsyncThunk<
  Article[],
  string,
  { rejectValue: string }
>('getArticles', async (searchParams, { rejectWithValue }) => {
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

    searchParams = searchParams.trim();

    if (searchParams !== '') {
      const result = data.filter((article: Article) => {
        return article.title.toLowerCase().includes(searchParams.toLowerCase());
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

export const createUser = createAsyncThunk<void, User, { rejectValue: string }>(
  'createUser',
  async (user: User, { rejectWithValue }) => {
    try {
      const data = await setDoc(doc(db, 'users', user.id), user);

      return data;
    } catch (error) {
      return rejectWithValue('Server error!');
    }
  },
);

export const logInUser = createAsyncThunk<
  User,
  UserLogIn,
  { rejectValue: string }
>('logInUser', async (user: UserLogIn, { rejectWithValue }) => {
  try {
    const docRefUser = query(
      collection(db, 'users'),
      where('username', '==', user.username),
      where('password', '==', user.password),
    );
    const docsUser = await getDocs(docRefUser);
    let userData: User | undefined;

    docsUser.forEach((doc) => {
      userData = {
        id: doc.id,
        email: doc.data().email,
        username: doc.data().username,
        password: doc.data().password,
      };
    });

    return userData ?? rejectWithValue('User not found');
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
      )
      .addCase(createUser.pending, (state) => {
        // state.isLoadingChapters = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        // state.isLoadingChapters = false;
      })
      .addCase(logInUser.pending, (state) => {
        // state.isLoadingChapters = true;
      })
      .addCase(logInUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        // state.isLoadingChapters = false;
      });
  },
});

// export const { } = mainSlice.actions;

export const mainState = (state: RootState) => state.main;

export default mainSlice.reducer;
