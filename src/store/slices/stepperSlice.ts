import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface StepperSlice {
  currentStep: number;
}

export const initialState: StepperSlice = {
  currentStep: 0,
};

export const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    incrementStep: (state) => {
      state.currentStep += 1;
    },
    decrementStep: (state) => {
      state.currentStep -= 1;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    reset: () => initialState,
  },
});

export const selectCurrentStep = (state: RootState) => state.stepper.currentStep;

export const { incrementStep, decrementStep, setCurrentStep, reset } =
  stepperSlice.actions;
export default stepperSlice;
