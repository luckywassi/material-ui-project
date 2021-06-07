import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import * as employeeService from '../services/employeeService';

export function useForm(initialValues) {
	const [values, setValues] = useState(initialValues);
	const [errorTxt, setErrorTxt] = useState({});

	const handleChange = (e, validateOnChange = false) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
		if (validateOnChange) validate({ [name]: value });
	};

	const handleSubmit = e => {
		if (validate()) {
			employeeService.insertEmployee(values);
			handleResetClick();
		}
		e.preventDefault();
	};
	const handleResetClick = () => {
		setValues(initialValues);
		setErrorTxt({});
	};

	const validate = (fieldValues = values) => {
		let errorMsg = {};
		if ('fullName' in fieldValues)
			errorMsg.fullName = fieldValues.fullName
				? ''
				: 'This field is required.';
		if ('email' in fieldValues)
			errorMsg.email = /$^|.*@.*..*/.test(fieldValues.email)
				? ''
				: 'Enter valid email';
		if ('mobile' in fieldValues)
			errorMsg.mobile =
				fieldValues.mobile.length > 9
					? ''
					: 'Minimum 10 digits required.';
		if ('departmentId' in fieldValues)
			errorMsg.departmentId =
				parseInt(fieldValues.departmentId, 10) > 0
					? ''
					: 'Select a department';
		setErrorTxt({
			...errorTxt,
			...errorMsg,
		});
		if (fieldValues === values)
			//which means we are calling validate() from handleSubmit()
			return Object.values(errorMsg).every(x => x === '');
	};

	return {
		values,
		setValues,
		handleChange,
		setErrorTxt,
		errorTxt,
		handleSubmit,
		handleResetClick,
	};
}

//////////////////////////////////////////////

const useStyles = makeStyles(theme => ({
	root: {
		'& .MuiFormControl-root': {
			margin: theme.spacing(1),
		},
	},
}));
export function Form({ children, onSubmit }) {
	const classes = useStyles();
	return (
		<form onSubmit={onSubmit} className={classes.root} autoComplete='off'>
			{children}
		</form>
	);
}
