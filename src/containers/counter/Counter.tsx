import React, { useState } from 'react'
import Button from "@material-ui/core/Button";

import { useAppSelector, useAppDispatch } from '../../hooks';
import { increment } from '../../store/slices/counterSlice';

export function Counter() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div>
      <p>Counter is: {count}</p>

      <Button variant="contained" color="primary" onClick={() => dispatch(increment())}>
        Increment
      </Button>
    </div>
  )
}

export default Counter;
