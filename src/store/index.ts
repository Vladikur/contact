import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userSlice from "./userReducer";
import contactsSlice from "./contactsReducer";
import tagsSlice from "./tagsReducer";

const rootReducer = combineReducers({
    user: userSlice.reducer,
    contacts: contactsSlice.reducer,
    tags: tagsSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
