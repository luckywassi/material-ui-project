import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core';
import React from 'react';

export default function MySelect(props) {
	const { name, label, value, onChange, options, errorTxt } = props;
	return (
		<FormControl variant='outlined' error={Boolean(errorTxt)}>
			<InputLabel>{label}</InputLabel>
			<Select label={label} name={name} value={value} onChange={onChange}>
				<MenuItem value='0'>--Select Department--</MenuItem>
				{options.map(item => (
					<MenuItem key={item.id} value={item.id}>
						{item.title}
					</MenuItem>
				))}
			</Select>
			{errorTxt && <FormHelperText>{errorTxt}</FormHelperText>}
		</FormControl>
	);
}
