import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:4000";

export const getDataPeople = createAsyncThunk(
  "people/getDataPeople",
  async () => {
    const { data } = await axios.get(`${URL}/people`);
    return data;
  }
);

export const addDataPeople = createAsyncThunk(
  "people/addDataPeople",
  async (newData) => {
    const { data } = await axios.post(`${URL}/people`, newData);
    return data;
  }
);

export const updateDataPeople = createAsyncThunk(
  "people/updateDataPeople",
  async (newData) => {
    const { data } = await axios.put(`${URL}/people/${newData.id}`, newData);
    return data;
  }
);

export const deletePeople = createAsyncThunk(
  "people/deletePeople",
  async (peopleId) => {
    await axios.delete(`${URL}/people/${peopleId}`);
    return peopleId;
  }
);

const peopleSlice = createSlice({
  name: "people",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataPeople.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDataPeople.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(getDataPeople.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addDataPeople.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(addDataPeople.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updateDataPeople.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (people) => people.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deletePeople.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (people) => people.id !== action.payload
        );
      });
  },
});

export default peopleSlice.reducer;
