import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:4000";

export const getDataTicket = createAsyncThunk(
  "tickets/getDataTicket",
  async () => {
    const { data } = await axios.get(`${URL}/tickets`);
    return data;
  }
);

export const addDataTicket = createAsyncThunk(
  "tickets/addDataTicket",
  async (newData) => {
    const { data } = await axios.post(`${URL}/ticket`, newData);
    return data;
  }
);

export const updateDataTicket = createAsyncThunk(
  "tickets/updateDataTicket",
  async (newData) => {
    const { data } = await axios.put(`${URL}/ticket/${newData.id}`, newData);
    return data;
  }
);

export const anularTicket = createAsyncThunk(
  "tickets/anularTicket",
  async (ticketId) => {
    const { data } = await axios.put(`${URL}/tickets/${ticketId}/anular`);
    return data;
  }
);

const TicketsSlice = createSlice({
  name: "tickets",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataTicket.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDataTicket.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(getDataTicket.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addDataTicket.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(addDataTicket.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updateDataTicket.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (Tickets) => Tickets.no_ticket === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      .addCase(anularTicket.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (Tickets) => Tickets.no_ticket === action.payload.no_ticket
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export default TicketsSlice.reducer;
