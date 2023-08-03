import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { notifyError, notifySuccess } from '../../helpers/notifications'
import AlbumServices from '../../api/album'

const initialState = {
  data: null,
  loading: false,
  error: null
}

export const getAlbums = createAsyncThunk('albums/album', async (eventTag, { rejectWithValue }) => {
  try {
    const response = await AlbumServices.getAlbumsBySeason(eventTag)
    if ( response?.status === 200 ) {
      const { data } = response
      return data.data
    }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response
      return rejectWithValue({ status, message: data.message })
    } else {
      notifyError('Network error')
      return rejectWithValue({ status: -1, message: 'Network error' })
    }
  }
})
export const getAlbumByTag = createAsyncThunk('albums/getAlbumByTag', async (albumTag, { rejectWithValue }) => {
  try {
    const response = await AlbumServices.getAlbum(albumTag)
    if (response?.status === 200) {
      const { data } = response
      return data
    }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response
      return rejectWithValue({ status, message: data.data.message })
    } else {
      notifyError('Network error')
      return rejectWithValue({ status: -1, message: 'Network error' })
    }
  }
})
export const createAlbum = createAsyncThunk('albums/create', async (values, {
  rejectWithValue
}) => {
  try {
    const response = await AlbumServices.createAlbum(values)
    if (response?.status === 200) {
      const { data } = response
      notifySuccess('Album created')
      return data
    }
    return null
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response
      notifyError(data.message)
      return rejectWithValue({ status, message: data.message })
    } else {
      notifyError('Network error')
      return rejectWithValue({ status: -1, message: 'Network error' })
    }
  }
})
export const updateAlbum = createAsyncThunk('albums/update', async (album, {
  rejectWithValue,
}) => {
  try {
    const response = await AlbumServices.updateAlbum(album)
    if (response?.status === 200) {
      notifySuccess('Album updated')
      const { data } = response
      return data
    } 
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response
      notifyError(data.message)
      return rejectWithValue({ status, message: data.message })
    } else {
      notifyError('Network error')
      return rejectWithValue({ status: -1, message: 'Network error' })
    }
  }
})
export const deleteAlbum = createAsyncThunk('albums/remove', async (data, {
  rejectWithValue,
  dispatch
}) => {
  try {
    const { albumID, eventTag } = data
    const response = await AlbumServices.removeAlbum(albumID)
    if (response?.status === 200) {
      notifySuccess('Album removed')
      await dispatch(getAlbums(eventTag))
    }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response
      notifyError(data.error)
      return rejectWithValue({ status, message: data.error })
    } else {
      notifyError('Network error')
      return rejectWithValue({ status: -1, message: 'Network error' })
    }
  }
})
const albumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    clearAll(state) {
      state.data = null
      state.loading = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAlbums.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAlbums.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(getAlbums.rejected, (state, action) => {
        state.data = null
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { clearAll } = albumSlice.actions

export const selectStoreAlbums = (state) => state.albums

export default albumSlice.reducer