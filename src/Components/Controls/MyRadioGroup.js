import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import React from 'react';

const genderItems = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
  { id: 'other', title: 'Other' },
];

export default function MyRadioGroup(props) {
  const { name, label, value, onChange } = props;
  return (
    <>
      {/* form control is the wrapper for the control */}

      <FormControl>
        <FormLabel>{label}</FormLabel>
        <RadioGroup row name={name} value={value} onChange={onChange}>
          {genderItems.map((item) => (
            <FormControlLabel
              key={item.id}
              value={item.id}
              control={<Radio />}
              label={item.title}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
}
