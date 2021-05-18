import { initialState as settingsSliceInitialState } from '../slices/settingsSlice';
import { initialState as stepperSliceInitialState } from '../slices/stepperSlice';
import { RootState } from '../index';

const mockState: RootState = {
  settings: { ...settingsSliceInitialState },
  stepper: { ...stepperSliceInitialState },
};

export default mockState;
