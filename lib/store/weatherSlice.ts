import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Unit } from '@/types/weather';

export interface WeatherState {
  unit: Unit;
}

const initialState: WeatherState = {
  unit: 'metric'
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setUnit: (state, action: PayloadAction<Unit>) => {
      state.unit = action.payload;
    }
  }
});

export const { setUnit } = weatherSlice.actions;
export default weatherSlice.reducer;
