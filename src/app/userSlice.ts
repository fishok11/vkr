import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import {
  GetResultsParams,
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

export type InitialState = {
  user: User;
  result: Result;
  logInModal: boolean;
  signUpModal: boolean;
  isLoadingLogIn: boolean;
  isLoadingSignUp: boolean;
  isLoadingAddResult: boolean;
};

const initialState: InitialState = {
  user: {
    id: '',
    email: '',
    username: '',
    password: '',
  },
  result: { id: '', articleId: '', userId: '', userAnswers: {} },
  logInModal: false,
  signUpModal: false,
  isLoadingLogIn: false,
  isLoadingSignUp: false,
  isLoadingAddResult: false,
};

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
  Result,
  GetResultsParams,
  { rejectValue: string }
>('getResults', async (params: GetResultsParams, { rejectWithValue }) => {
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
      .addCase(logInUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoadingLogIn = false;
      })
      .addCase(addResult.pending, (state) => {
        state.isLoadingAddResult = true;
      })
      .addCase(addResult.fulfilled, (state) => {
        state.isLoadingAddResult = false;
      })
      .addCase(getResults.pending, (state) => {
        state.isLoadingAddResult = true;
      })
      .addCase(getResults.fulfilled, (state, action: PayloadAction<Result>) => {
        state.result = action.payload;
        state.isLoadingAddResult = false;
      });
  },
});

export const {
  showLogInModal,
  hideLogInModal,
  showSignUpModal,
  hideSignUpModal,
} = userSlice.actions;

export const userState = (state: RootState) => state.user;

export default userSlice.reducer;
