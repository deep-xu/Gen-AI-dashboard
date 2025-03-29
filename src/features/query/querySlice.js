import { createSlice } from '@reduxjs/toolkit'
import { processQuery } from './mockAPI'

const initialState = {
  currentQuery: '',
  queryHistory: [],
  results: null,
  isLoading: false,
  error: null,
}

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.currentQuery = action.payload
    },
    submitQuery: (state) => {
      state.isLoading = true
      state.error = null
    },
    submitQuerySuccess: (state, action) => {
      state.isLoading = false
      state.results = action.payload
      state.queryHistory = [
        {
          query: state.currentQuery,
          timestamp: new Date().toISOString(),
          id: Date.now(),
        },
        ...state.queryHistory.slice(0, 9),
      ]
    },
    submitQueryFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { setQuery, submitQuery, submitQuerySuccess, submitQueryFailure } =
  querySlice.actions

export const submitQueryAsync = (query) => async (dispatch) => {
  try {
    dispatch(submitQuery())
    const response = await processQuery(query)
    dispatch(submitQuerySuccess(response))
  } catch (error) {
    dispatch(submitQueryFailure(error.toString()))
  }
}

export default querySlice.reducer