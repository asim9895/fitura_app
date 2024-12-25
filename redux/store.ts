import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import user_reducer from "./slices/user_slice";
import theme_reducer from "./slices/theme_slice";

// Configure Redux Persist
type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
  key: "root:fitura",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: user_reducer,
  theme: theme_reducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables the serializable check
    }),
});

export const persistor = persistStore(store);

// Export RootState and AppDispatch types for usage in components
export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType<typeof store.getState>;
