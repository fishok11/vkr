import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Result, ResultToAdded, User, UserLogIn } from './types';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import db from '../firebase';
import toast from 'react-hot-toast';

export type InitialState = {
  user: User;
  users: User[];
  results: Result[];
  resultForResultModal: Result | null;
  articleIdForResultModal: string;
  resultModal: boolean;
  logInModal: boolean;
  signUpModal: boolean;
  isLoadingLogIn: boolean;
  isLoadingSignUp: boolean;
  isLoadingAddResult: boolean;
  isLoadingGetUserResults: boolean;
  isLoadingGetUser: boolean;
  isLoadingGetUsers: boolean;
  isLoadingGetResultOfTheArticle: boolean;
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
  resultForResultModal: null,
  articleIdForResultModal: 'string',
  resultModal: false,
  logInModal: false,
  signUpModal: false,
  isLoadingLogIn: false,
  isLoadingSignUp: false,
  isLoadingAddResult: false,
  isLoadingGetUserResults: false,
  isLoadingGetUser: false,
  isLoadingGetUsers: false,
  isLoadingGetResultOfTheArticle: false,
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
      limit(1),
    );
    const docsUsers = await getDocs(docRefUser);

    if (!docsUsers.empty) {
      const doc = docsUsers.docs[0];
      const userData = {
        id: doc.id,
        email: doc.data().email,
        username: doc.data().username,
        password: doc.data().password,
        admin: doc.data().admin,
      };

      toast.success('Вход выполнен!');

      return userData;
    } else {
      toast.error('Пользователь не найден!');
      return;
    }
  } catch (error) {
    console.error(error);
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
      const resultData = doc.data();
      const result: Result = {
        id: doc.id,
        articleId: resultData.articleId,
        chapterId: resultData.chapterId,
        userId: resultData.userId,
        userAnswers: resultData.userAnswers,
        averageGrade: resultData.averageGrade,
      };

      data.push(result);
    });

    return data ?? rejectWithValue('Result not found');
  } catch (error) {
    console.error(error);
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
      const userData = doc.data();
      const user: User = {
        id: doc.id,
        email: userData.email,
        username: userData.username,
        password: userData.password,
        admin: userData.admin,
      };

      data.push(user);
    });

    return data ?? rejectWithValue('Result not found');
  } catch (error) {
    console.error(error);
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
        const userData = docUser.data();
        const user: User = {
          id: docUser.id,
          email: userData.email,
          username: userData.username,
          password: userData.password,
          admin: userData.admin,
        };
        return user;
      } else {
        return rejectWithValue('User not found');
      }
    } catch (error) {
      console.error(error);
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
    showResultModal: (state, action: PayloadAction<Result>) => {
      state.resultForResultModal = action.payload;
      state.resultModal = true;
    },
    hideResultModal: (state) => {
      state.articleIdForResultModal = initialState.articleIdForResultModal;
      state.resultForResultModal = initialState.resultForResultModal;
      state.resultModal = false;
    },
    setArticleIdForResultModal: (state, action: PayloadAction<string>) => {
      state.articleIdForResultModal = action.payload;
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
        state.isLoadingGetUsers = true;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.isLoadingGetUsers = false;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoadingGetUser = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoadingGetUser = false;
      });
  },
});

export const {
  showLogInModal,
  hideLogInModal,
  showSignUpModal,
  hideSignUpModal,
  showResultModal,
  hideResultModal,
  setArticleIdForResultModal,
} = userSlice.actions;

export const userState = (state: RootState) => state.user;

export default userSlice.reducer;
