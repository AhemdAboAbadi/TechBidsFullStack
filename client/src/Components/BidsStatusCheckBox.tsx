import React, { FC } from 'react';
import {
  FormControlLabel,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
} from '@mui/material';

interface Prop {
  setStatus : React.Dispatch<React.SetStateAction<string>>;
  status: string;
  setPage: any
}

const BidsStatusCheckBox: FC<Prop> = ({ status, setStatus, setPage }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setStatus((event.target as HTMLInputElement).value);
    setPage(1);
  };

  return (
    <FormControl component="fieldset" className="filter-container">
      <FormLabel className="filter-title">Auction Status</FormLabel>
      <RadioGroup
        aria-label="status"
        value={status}
        onChange={handleChange}
        className="container"
      >
        <FormControlLabel value="all" control={<Radio size="small" />} label="All" />
        <FormControlLabel value="ended" control={<Radio size="small" />} label="Ended" />
        <FormControlLabel value="open" control={<Radio size="small" />} label="Open" />
      </RadioGroup>
    </FormControl>
  );
};

export default BidsStatusCheckBox;
