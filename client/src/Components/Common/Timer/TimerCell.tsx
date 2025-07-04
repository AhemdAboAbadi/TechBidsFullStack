import {
  Box,
} from '@mui/material';

interface Props{
    label: string,
    value: number,
}

export const TimerCell = ({ label, value } : Props) : any => {
  const formattedValue = value < 10 ? `0${value}` : value.toString();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={{ marginBottom: '0.5rem' }}>{ formattedValue }</span>
      <span style={{ fontSize: '.75rem' }}>{ label }</span>
    </Box>
  );
};
