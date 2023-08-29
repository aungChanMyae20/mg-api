import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { notifyError, notifySuccess } from "../../helpers/notifications";
import EventServices from "../../api/event";

const initialState = {
  seasons: null,
  loading: false,
  error: null
}

export const getSeasons = createAsyncThunk('season/all', async (_, { rejectWithValue }) => {
  try {
    const response = await EventServices.getAllSeasons()
    if ( response?.status === 200 ) {
      const { data } = response
      notifySuccess(data.message)
      return data
    }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response
      status === 401 && notifyError(data.error)
      return rejectWithValue({ status, message: data.error })
    } else {
      notifyError('Network error')
      return rejectWithValue({ status: -1, message: 'Network error'})
    }
  }
})

export const createEvent = createAsyncThunk('event/create', async (values, { rejectWithValue }) => {
  try {
    console.log('values', values)
    const response = await EventServices.saveEvent(values)
    console.log('response', response)
    if (response?.status === 200) {
      const { data } = response
      notifySuccess(data.message)
      return data
    }
  } catch (error) {
    notifyError('Server Error')
    return rejectWithValue(error?.response?.data)
  }
})

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    clearAll(state) {
      state.seasons = null
      state.loading = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSeasons.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getSeasons.fulfilled, (state, action) => {
        state.seasons = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getSeasons.rejected, (state, action) => {
        state.seasons = null
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { clearAll } = eventSlice.actions

export const selectStoreEvent = (state) => state.event

export default eventSlice.reducer