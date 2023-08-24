import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import channelSlice from "./ChannelSlice";
import { configureStore } from "@reduxjs/toolkit";

let persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  channel: channelSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
