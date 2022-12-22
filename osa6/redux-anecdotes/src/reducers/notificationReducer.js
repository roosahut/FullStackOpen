import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    deleteNotification(state, action) {
      return null
    }
  }
})

export const createNotification = (message) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(deleteNotification())
    }, 5000)
  }
}

export const { setNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer