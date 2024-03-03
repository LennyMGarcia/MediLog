import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Grow from '@mui/material/Grow/Grow';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
      'linear-gradient( 136deg, rgb(118,200,147) 0%, rgb(82,182,154) 50%, rgb(52,160,164) 100%)'
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
      'linear-gradient( 136deg, rgb(118,200,147) 0%, rgb(82,182,154) 50%, rgb(52,160,164) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
    'linear-gradient( 136deg, rgb(118,200,147) 0%, rgb(82,182,154) 50%, rgb(52,160,164) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(118,200,147) 0%, rgb(82,182,154) 50%, rgb(52,160,164) 100%)',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
    4: <AttachMoneyIcon/>
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Información básica', 'Información de contacto', 'Selección de planes', "Información Financiera"];

interface IStepper {
  activeStep: number
}

const RegisterStepper: React.FC<IStepper> = ({ activeStep }) => {

  return (
    <Stack sx={{ width: '100%' }} spacing={4}>

<Stepper alternativeLabel activeStep={activeStep} connector={null}>
  {steps.map((label, index) => (
    <Step key={label}>
      <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
      {index === activeStep && index > 0 && (
        <Grow
          in={true}
          key={index}
          timeout={1000}
          style={{ transformOrigin: 'left center' }}
        >
          <ColorlibConnector />
        </Grow>
      )}
      {index < activeStep && index> 0 &&  (
        <ColorlibConnector />
      )}
    </Step>
  ))}
</Stepper>

    </Stack>
  );
}

export default RegisterStepper;
