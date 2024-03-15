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
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import db from '../firebase';
import toast from 'react-hot-toast';

export type InitialState = {
  user: User;
  users: User[];
  resultOfTheArticle: Result;
  results: Result[];
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
  users: [],
  results: [],
  resultOfTheArticle: {
    id: '',
    articleId: '',
    chapterId: '',
    userId: '',
    userAnswers: {},
    averageGrade: 0,
  },
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
          chapterId: doc.data().chapterId,
          userId: doc.data().userId,
          userAnswers: doc.data().userAnswers,
          averageGrade: doc.data().averageGrade,
        };
      });

      return resultData ?? rejectWithValue('Result not found');
    } catch (error) {
      return rejectWithValue('Server error!');
    }
  },
);

export const getResults = createAsyncThunk<
  Result[],
  undefined,
  { rejectValue: string }
>('getResults', async (_, { rejectWithValue }) => {
  try {
    const docRefResults = query(collection(db, 'results'));
    const docsResults = await getDocs(docRefResults);
    const data: Result[] = [];

    docsResults.forEach((doc) => {
      const resultData = {
        id: doc.id,
        articleId: doc.data().articleId,
        chapterId: doc.data().chapterId,
        userId: doc.data().userId,
        userAnswers: doc.data().userAnswers,
        averageGrade: doc.data().averageGrade,
      };

      data.push(resultData);
    });

    return data ?? rejectWithValue('Result not found');
  } catch (error) {
    return rejectWithValue('Server error!');
  }
});

export const getUsers = createAsyncThunk<
  User[],
  undefined,
  { rejectValue: string }
>('getUsers', async (_, { rejectWithValue }) => {
  try {
    const docRefUsers = query(collection(db, 'users'));
    const docsUsers = await getDocs(docRefUsers);
    const data: User[] = [];

    docsUsers.forEach((doc) => {
      const userData = {
        id: doc.id,
        email: doc.data().email,
        username: doc.data().username,
        password: doc.data().password,
        admin: doc.data().admin,
      };

      data.push(userData);
    });

    return data ?? rejectWithValue('Result not found');
  } catch (error) {
    return rejectWithValue('Server error!');
  }
});

export const getUser = createAsyncThunk<User, string, { rejectValue: string }>(
  'getUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'users', userId);
      const docUser = await getDoc(docRef);

      if (docUser.exists()) {
        const data: User = {
          id: docUser.id,
          email: docUser.data().email,
          username: docUser.data().username,
          password: docUser.data().password,
          admin: docUser.data().admin,
        };

        return data;
      } else {
        return rejectWithValue('Article not found');
      }
    } catch (error) {
      return rejectWithValue('Server error!');
    }
  },
);

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
      .addCase(getResults.pending, (state) => {
        state.isLoadingGetUserResults = true;
      })
      .addCase(
        getResults.fulfilled,
        (state, action: PayloadAction<Result[]>) => {
          state.results = action.payload;
          state.isLoadingGetUserResults = false;
        },
      )
      .addCase(getUsers.pending, (state) => {
        state.isLoadingGetUserResults = true;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.isLoadingGetUserResults = false;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoadingGetUserResults = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoadingGetUserResults = false;
      });
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
