import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MyDatepicker(props) {
	const { name, label, value, onChange } = props;

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				disableToolbar
				variant='inline'
				format='dd/MM/yyyy'
				margin='normal'
				name={name}
				label={label}
				value={value}
				onChange={date => onChange({ target: { name, value: date } })}
				KeyboardButtonProps={{
					'aria-label': 'change date',
				}}
			/>
		</MuiPickersUtilsProvider>
	);
}
