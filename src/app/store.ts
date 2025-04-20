import { configureStore } from '@reduxjs/toolkit'
import type { Action } from '@reduxjs/toolkit'
import postsReducer from '@/features/posts/postsSlice'
import usersReducer from '@/features/users/usersSlice'
import authReducer from '@/features/auth/authSlice'
import notificationsReducer from '@/features/notifications/notificationsSlice'
import { listenerMiddleware } from './listenerMiddleware'
import { apiSlice } from '@/features/api/apiSlice'



interface CounterState {
  value: number
}

// An example slice reducer function that shows how a Redux reducer works inside.
// We'll replace this soon with real app logic.

export const store = configureStore({
  // Pass in the root reducer setup as the `reducer` argument
  reducer: {
    // Declare that `state.counter` will be updated by the `counterReducer` function
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
    .prepend(listenerMiddleware.middleware)
    .concat(apiSlice.middleware)
})

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>