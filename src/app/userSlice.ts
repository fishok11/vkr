import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { User, UserLogIn } from './types';
import {
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
  logInModal: boolean;
  signUpModal: boolean;
};

const initialState: InitialState = {
  user: {
    id: '',
    email: '',
    username: '',
    password: '',
  },
  logInModal: false,
  signUpModal: false,
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

export const {
  showLogInModal,
  hideLogInModal,
  showSignUpModal,
  hideSignUpModal,
} = userSlice.actions;

export const userState = (state: RootState) => state.user;

export default userSlice.reducer;
