import { configureStore, combineReducers } from "@reduxjs/toolkit";
import blogReducer from "./slices/blogSlices";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Persist Configuration
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  blog: blogReducer, // ✅ Ensure key matches `blogSlice.js`
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
