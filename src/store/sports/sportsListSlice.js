import { createSlice } from "@reduxjs/toolkit";
import { getSportsThunk } from "./sportsThunk";

const initialState = { sports: [], isLoading: false };
const sorting = (state) => {
  state?.sports.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });
};

export const sportsListSlice = createSlice({
  name: "sportsList",
  initialState,
  reducers: {
    addSport: (state, action) => {
      state.sports.push(action.payload);
      sorting(state);
    },
    removeSport: (state, action) => {
      state.sports = state?.sports.filter(
        (sport) => sport.id !== action.payload
      );
      return state;
    },
    editSport: (state, action) => {
      state.sports = state.sports.filter(
        (sport) => sport.id !== action.payload.id
      );
      state.sports.push(action.payload);
      sorting(state);
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSportsThunk.fulfilled, (state, action) => {
      state.sports = action.payload;
      state.isLoading = false;
      sorting(state);
    });
    builder.addCase(getSportsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSportsThunk.rejected, (state) => {
      state.isLoading = false;
      state.sports = [];
    });
  },
});

export const sportsListActions = sportsListSlice.actions;
export default sportsListSlice.reducer;
