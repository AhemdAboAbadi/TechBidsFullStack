import {
  Box,
} from '@mui/material';
import { TimerCell } from './TimerCell';
import { useTimer } from '../../../context/useTimer';

export const Timer = ({ futureDate } : any) : any => {
  const {
    days, hours, minutes, seconds, isTimeUp,
  } = useTimer(futureDate);
  const tickerContents = isTimeUp ? (
    <>

      <TimerCell value={0} label="Days" />
      <TimerCell value={0} label="Hours" />
      <TimerCell value={0} label="Minutes" />
      <TimerCell value={0} label="Seconds" />
    </>

  ) : (
    <>
      <TimerCell value={days} label="Days" />
      <TimerCell value={hours} label="Hours" />
      <TimerCell value={minutes} label="Minutes" />
      <TimerCell value={seconds} label="Seconds" />
    </>
  );

  return (
    <Box sx={{
      width: '90%',
      margin: '0 auto',
      padding: '0.5rem',
      color: isTimeUp ? '#7a7979' : 'white',
      backgroundColor: isTimeUp ? '#e7e7e7' : 'black',
      display: 'flex',
      justifyContent: 'space-between',
      borderRadius: '5px',
    }}
    >
      { tickerContents }
    </Box>
  );
};
export default Timer;
