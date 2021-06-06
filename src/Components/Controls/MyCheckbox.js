import { Checkbox, FormControl, FormControlLabel } from '@material-ui/core';
import React from 'react';

export default function MyCheckbox(props) {
  const { name, label, value, onChange } = props;
  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            checked={value}
            onChange={(e) =>
              onChange({ target: { name, value: e.target.checked } })
            }
          />
        }
        label={label}
      />
    </FormControl>
  );
}
