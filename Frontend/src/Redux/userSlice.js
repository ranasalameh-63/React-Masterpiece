import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null, 
  role: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      state.role = action.payload.role; 
    },
    clearUserId: (state) => {
      state.userId = null; 
      state.role = null;
    },
  },
});

export const { setUserId, clearUserId } = userSlice.actions;
export default userSlice.reducer;
