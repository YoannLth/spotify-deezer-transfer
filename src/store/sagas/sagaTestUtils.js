// TODO move this file outside
import { runSaga } from 'redux-saga';

// eslint-disable-next-line import/prefer-default-export
export async function recordSaga(saga, initialAction) {
  const dispatched = [];

  await runSaga(
    {
      dispatch: (action) => dispatched.push(action),
      getState: () => {},
    },
    saga,
    initialAction
  ).done;

  return dispatched;
}
