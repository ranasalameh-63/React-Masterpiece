// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   userId: null, 
//   role: null,
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUserId: (state, action) => {
//       state.userId = action.payload.userId;
//       state.role = action.payload.role; 
//     },
//     clearUserId: (state) => {
//       state.userId = null; 
//       state.role = null;
//     },
//   },
// });

// export const { setUserId, clearUserId } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: localStorage.getItem('userId') || null, 
  role: localStorage.getItem('role') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload.userId;
      state.role = action.payload.role; 
      
      localStorage.setItem('userId', action.payload.userId);
      localStorage.setItem('role', action.payload.role);
    },
    clearUserId: (state) => {
      state.userId = null; 
      state.role = null;

      localStorage.removeItem('userId');
      localStorage.removeItem('role');
    },
  },
});

export const { setUserId, clearUserId } = userSlice.actions;
export default userSlice.reducer;

