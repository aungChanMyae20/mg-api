import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { notifyError, notifySuccess } from '../../helpers/notifications'
import AuthServices from '../../api/auth'
import { encryptUserInfo, revokeUserInfo } from '../../helpers/utils'

const initialState = {
  auth: null,
  isLoggedIn: false,
  loading: false,
  error: null,
}

export const login = createAsyncThunk('auth/login', async (values, { rejectWithValue }) => {
  try {
    const response = await AuthServices.login(values)
    if ( response?.status === 200 ) {
      const { data } = response
      notifySuccess(data.data.message)
      encryptUserInfo(data.data.accessToken, data.data.refreshToken)
      return data.data
    }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response
      status === 401 && notifyError(data.data.message)
      return rejectWithValue({ status, message: data.data.message })
    } else {
      notifyError('Network error')
      return rejectWithValue({ status: -1, message: 'Network error'})
    }
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.auth = null
      state.isLoggedIn = false
      state.error = null
      state.loading = false
      revokeUserInfo()
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isLoggedIn = true
        state.auth = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.auth = null
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { logout } = authSlice.actions;

export const selectStoreAuth = (state) => state.auth

export default authSlice.reducer;