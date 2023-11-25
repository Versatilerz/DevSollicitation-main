import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const getSportsThunk = createAsyncThunk("getSports", async () => {
  return await api("sports");
});

export const postSportTunk = createAsyncThunk("postSport", async (body) => {
  return await api("sports", "POST", body);
});

export const deleteSportThunk = createAsyncThunk(
  "deleteSport",
  async (id, body) => {
    return await api(`sports/${id}`, "DELETE", body);
  }
);

export const editSportThunk = createAsyncThunk("editSport", async (body) => {
  return await api("sports", "PUT", body);
});
