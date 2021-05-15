import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Settings from './Settings';
import Scan from './Scan';
import Sync from './Sync';

import { useAppSelector } from '../../hooks';
import { selectCurrentStep } from '../../store/slices/stepperSlice';

function getStepContent(stepIndex: number) {
  switch (stepIndex) {
    case 0:
      return <Settings />;
    case 1:
      return <Scan />;
    case 2:
      return <Sync />;
    default:
      return (
        <div>
          <Typography>All steps completed</Typography>
          <Button>Reset</Button>
        </div>
      );
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const activeStep = useAppSelector((state) => selectCurrentStep(state));
  const stepsLabels = ['Set your API tokens', 'Scan your songs and playlists', 'Sync data'];

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {stepsLabels.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>{getStepContent(activeStep)}</div>
    </div>
  );
}
