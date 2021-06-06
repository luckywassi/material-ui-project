import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

export function useForm(initialValues) {
	const [values, setValues] = useState(initialValues);
	const [errorTxt, setErrorTxt] = useState({});

	const handleChange = (e, validateOnChange = false) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
		if (validateOnChange) runValidateOnChange(e.target);
	};

	const handleSubmit = e => {
		if (validateOnSubmit()) {
		} else {
		}
		e.preventDefault();
	};
	const handleClick = () => {
		setValues(initialValues);
		setErrorTxt({});
	};

	const validateOnSubmit = () => {
		let errorMsg = {};
		errorMsg.fullName = values.fullName ? '' : 'This field is required.';
		errorMsg.email = /$^|.*@.*..*/.test(values.email)
			? ''
			: 'Enter valid email';
		errorMsg.mobile =
			values.mobile.length > 9 ? '' : 'Minimum 10 digits required.';
		errorMsg.departmentId =
			parseInt(values.departmentId, 10) > 0 ? '' : 'Select a department';
		setErrorTxt({
			...errorMsg,
		});
		return Object.values(errorMsg).every(x => x === '');
	};

	const runValidateOnChange = ({ name, value }) => {
		let errorMsg = {};
		if (name === 'fullName')
			errorMsg.fullName = value ? '' : 'This field is required.';
		else if (name === 'email')
			errorMsg.email = /$^|.*@.*.*/.test(value)
				? ''
				: 'Enter valid email';
		else if (name === 'mobile')
			errorMsg.mobile =
				value.length > 9 ? '' : 'Minimum 10 digits required.';
		else
			errorMsg.departmentId =
				parseInt(value, 10) > 0 ? '' : 'Select a department';
		setErrorTxt({
			...errorTxt,
			...errorMsg,
		});
	};

	return {
		values,
		setValues,
		handleChange,
		setErrorTxt,
		errorTxt,
		handleSubmit,
		handleClick,
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
