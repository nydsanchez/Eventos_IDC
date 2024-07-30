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
  async (newData, { getState, rejectWithValue }) => {
    const state = getState();
    const existingTicket = state.tickets.data.find(
      (ticket) => ticket.PersonCedula === newData.personCedula
    );

    if (existingTicket) {
      return rejectWithValue("Esta persona ya tiene un ticket asociado.");
    }

    try {
      const { data } = await axios.post(`${URL}/tickets`, newData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateDataTicket = createAsyncThunk(
  "tickets/updateDataTicket",
  async (newData) => {
    const { data } = await axios.put(`${URL}/tickets/${newData.id}`, newData);
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

const ticketsSlice = createSlice({
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
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(addDataTicket.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
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
        state.status = "succeeded";
      });
  },
});

export default ticketsSlice.reducer;
