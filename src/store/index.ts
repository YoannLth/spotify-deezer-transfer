import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import settingsSlice from './slices/settingsSlice';
import stepperSlice from './slices/stepperSlice';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    stepper: stepperSlice.reducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(sagas);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
