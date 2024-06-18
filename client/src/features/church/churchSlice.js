import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:4000";

export const getDataChurch = createAsyncThunk(
  "churches/getDataChurch",
  async () => {
    const { data } = await axios.get(`${URL}/Churches`);
    return data;
  }
);

export const addDataChurch = createAsyncThunk(
  "churches/addDataChurch",
  async (newData) => {
    const { data } = await axios.post(`${URL}/Churches`, newData);
    return data;
  }
);

export const updateDataChurch = createAsyncThunk(
  "churches/updateDataChurch",
  async (newData) => {
    const { data } = await axios.put(`${URL}/Churches/${newData.id}`, newData);
    return data;
  }
);

export const deleteChurch = createAsyncThunk(
  "churches/deleteChurch",
  async (ChurchId) => {
    await axios.delete(`${URL}/Churches/${ChurchId}`);
    return ChurchId;
  }
);

const churchSlice = createSlice({
  name: "churches",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataChurch.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getDataChurch.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getDataChurch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addDataChurch.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(addDataChurch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updateDataChurch.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (Church) => Church.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        state.error = null;
      })

      .addCase(deleteChurch.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (Church) => Church.id !== action.payload
        );
        state.error = null;
      });
  },
});

export default churchSlice.reducer;
