import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const getMembersThunk = createAsyncThunk("getMembers", async () => {
  return await api("members");
});

export const postMemberThunk = createAsyncThunk("postMember", async (body) => {
  return await api("members", "POST", body);
});

export const deleteMemberThunk = createAsyncThunk(
  "deleteMember",
  async (id, body) => {
    return await api(`members/${id}`, "DELETE", body);
  }
);

export const editMemberThunk = createAsyncThunk("editMember", async (body) => {
  return await api("members", "PUT", body);
});
