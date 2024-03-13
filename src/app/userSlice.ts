import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import {
  GetResultOfTheArticleParams,
  Result,
  ResultToAdded,
  User,
  UserLogIn,
} from './types';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import db from '../firebase';
import toast from 'react-hot-toast';

export type InitialState = {
  user: User;
  resultOfTheArticle: Result;
  userResults: Result[];
  logInModal: boolean;
  signUpModal: boolean;
  userNotFound: boolean;
  isLoadingLogIn: boolean;
  isLoadingSignUp: boolean;
  isLoadingAddResult: boolean;
  isLoadingGetUserResults: boolean;
};

const initialState: InitialState = {
  user: {
    id: '',
    email: '',
    username: '',
    password: '',
    admin: false,
  },
  userResults: [],
  resultOfTheArticle: { id: '', articleId: '', userId: '', userAnswers: {} },
  logInModal: false,
  signUpModal: false,
  userNotFound: false,
  isLoadingLogIn: false,
  isLoadingSignUp: false,
  isLoadingAddResult: false,
  isLoadingGetUserResults: false,
};

export const createUser = createAsyncThunk<void, User, { rejectValue: string }>(
  'createUser',
  async (user: User, { rejectWithValue }) => {
    try {
      const data = await setDoc(doc(db, 'users', user.id), user);

      toast.success('Регистрация успешна!');

      return data;
    } catch (error) {
      return rejectWithValue('Server error!');
    }
  },
);

export const logInUser = createAsyncThunk<
  User | undefined,
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
        admin: doc.data().admin,
      };
    });

    if (userData == undefined) {
      toast.error('Пользователь не найден!');
      return;
    }

    toast.success('Вход выполнен!');

    return userData ?? rejectWithValue('User not found');
  } catch (error) {
    return rejectWithValue('Server error!');
  }
});

export const addResult = createAsyncThunk<
  undefined,
  ResultToAdded,
  { rejectValue: string }
>('addResult', async (result: ResultToAdded, { rejectWithValue }) => {
  try {
    await addDoc(collection(db, 'results'), result);
  } catch (error) {
    return rejectWithValue('Server error!');
  }
});

export const getResultOfTheArticle = createAsyncThunk<
  Result,
  GetResultOfTheArticleParams,
  { rejectValue: string }
>(
  'getResultOfTheArticle',
  async (params: GetResultOfTheArticleParams, { rejectWithValue }) => {
    try {
      const docRefResults = query(
        collection(db, 'results'),
        where('articleId', '==', params.articleId),
        where('userId', '==', params.userId),
      );
      const docsResults = await getDocs(docRefResults);
      let resultData: Result | undefined;

      docsResults.forEach((doc) => {
        resultData = {
          id: doc.id,
          articleId: doc.data().articleId,
          userId: doc.data().userId,
          userAnswers: doc.data().userAnswers,
        };
      });

      return resultData ?? rejectWithValue('Result not found');
    } catch (error) {
      return rejectWithValue('Server error!');
    }
  },
);

export const getUserResults = createAsyncThunk<
  Result[],
  string,
  { rejectValue: string }
>('getUserResults', async (userId: string, { rejectWithValue }) => {
  try {
    const docRefResults = query(
      collection(db, 'results'),
      where('userId', '==', userId),
    );
    const docsResults = await getDocs(docRefResults);
    const data: Result[] = [];

    docsResults.forEach((doc) => {
      const resultData = {
        id: doc.id,
        articleId: doc.data().articleId,
        userId: doc.data().userId,
        userAnswers: doc.data().userAnswers,
      };

      data.push(resultData);
    });

    return data ?? rejectWithValue('Result not found');
  } catch (error) {
    return rejectWithValue('Server error!');
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    showLogInModal: (state) => {
      state.logInModal = true;
    },
    hideLogInModal: (state) => {
      state.logInModal = false;
    },
    showSignUpModal: (state) => {
      state.signUpModal = true;
    },
    hideSignUpModal: (state) => {
      state.signUpModal = false;
    },
    resetResult: (state) => {
      state.resultOfTheArticle = initialState.resultOfTheArticle;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoadingSignUp = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isLoadingSignUp = false;
      })
      .addCase(logInUser.pending, (state) => {
        state.isLoadingLogIn = true;
      })
      .addCase(
        logInUser.fulfilled,
        (state, action: PayloadAction<User | undefined>) => {
          if (action.payload) {
            state.user = action.payload;
          }
          state.isLoadingLogIn = false;
        },
      )
      .addCase(addResult.pending, (state) => {
        state.isLoadingAddResult = true;
      })
      .addCase(addResult.fulfilled, (state) => {
        state.isLoadingAddResult = false;
      })
      .addCase(getResultOfTheArticle.pending, (state) => {
        state.isLoadingAddResult = true;
      })
      .addCase(
        getResultOfTheArticle.fulfilled,
        (state, action: PayloadAction<Result>) => {
          state.resultOfTheArticle = action.payload;
          state.isLoadingAddResult = false;
        },
      )
      .addCase(getUserResults.pending, (state) => {
        state.isLoadingGetUserResults = true;
      })
      .addCase(
        getUserResults.fulfilled,
        (state, action: PayloadAction<Result[]>) => {
          state.userResults = action.payload;
          state.isLoadingGetUserResults = false;
        },
      );
  },
});

export const {
  showLogInModal,
  hideLogInModal,
  showSignUpModal,
  hideSignUpModal,
  resetResult,
} = userSlice.actions;

export const userState = (state: RootState) => state.user;

export default userSlice.reducer;
