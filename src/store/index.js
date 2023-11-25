import { configureStore } from "@reduxjs/toolkit";
import memberListReducer from "./members/memberListSlice";
import sportsListReducer from "./sports/sportsListSlice";

export const store = configureStore({
  reducer: {
    members: memberListReducer,
    sports: sportsListReducer,
  },
});
