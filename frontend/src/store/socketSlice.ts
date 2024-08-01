import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SocketState {
  priceData: Array<object>;
}

const initialState: SocketState = {
  priceData: [],
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<object>) => {
      state.priceData.push(action.payload);
    },
  },
});

export const { addMessage } = socketSlice.actions;

export default socketSlice.reducer;
