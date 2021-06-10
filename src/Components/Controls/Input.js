import { TextField } from '@material-ui/core';
import React from 'react';

export default function Input(props) {
	const { name, label, value, onChange, errorTxt, ...other } = props;
	return (
		<TextField
			variant='outlined'
			label={label}
			value={value}
			name={name}
			onChange={onChange}
			error={Boolean(errorTxt)}
			helperText={errorTxt}
			// {...(errorTxt && { error: true, helperText: errorTxt })}
			{...other}
		/>
	);
}
