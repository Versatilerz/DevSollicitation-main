import { createSlice } from "@reduxjs/toolkit";
import { getMembersThunk } from "./memberThunk";

const initialState = { members: [], isLoading: false, hasError: false };
const sorting = (state) => {
  state?.members.sort((a, b) => {
    if (a.name.lastName?.toLowerCase() < b.name.lastName?.toLowerCase()) {
      return -1;
    }
    if (a.name.lastName?.toLowerCase() > b.name.lastName?.toLowerCase()) {
      return 1;
    }
    return 0;
  });
};

export const memberListSlice = createSlice({
  name: "membersList",
  initialState,
  reducers: {
    addMember: (state, action) => {
      state.members.push(action.payload);
      sorting(state);
    },
    removeMember: (state, action) => {
      state.members = state?.members.filter(
        (member) => member.id !== action.payload
      );
      return state;
    },
    editMember: (state, action) => {
      state.members = state?.members.filter(
        (member) => member.id !== action.payload.id
      );
      console.log(state.members);
      state.members.push(action.payload);
      console.log(state.members);
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMembersThunk.fulfilled, (state, action) => {
      state.members = action.payload;
      state.isLoading = false;
      state.hasError = false;
      sorting(state);
    });
    builder.addCase(getMembersThunk.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(getMembersThunk.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
      // state.members = [];
    });
  },
});

export const memberListActions = memberListSlice.actions;

export default memberListSlice.reducer;
