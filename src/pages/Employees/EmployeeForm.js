import { Grid } from '@material-ui/core';
import React from 'react';
import Controls from '../../Components/Controls/Controls';
import { Form, useForm } from '../../Components/useForm';
import * as employeeService from '../../services/employeeService';

const initialValues = {
	id: 0,
	fullName: '',
	email: '',
	mobile: '',
	city: '',
	gender: 'male',
	departmentId: '0',
	hireDate: new Date(), //note
	isPermanent: false,
};
const validateOnChange = true;

export default function EmployeeForm() {
	const { values, handleChange, errorTxt, handleSubmit, handleResetClick } =
		useForm(initialValues);

	return (
		<Form onSubit={handleSubmit}>
			<Grid container>
				<Grid item container direction='column' xs={6}>
					<Controls.Input
						label='Full Name'
						value={values.fullName}
						name='fullName'
						onChange={e => handleChange(e, validateOnChange)}
						errorTxt={errorTxt.fullName}
					/>
					<Controls.Input
						variant='outlined'
						label='Email'
						value={values.email}
						name='email'
						onChange={e => handleChange(e, validateOnChange)}
						errorTxt={errorTxt.email}
					/>
					<Controls.Input
						variant='outlined'
						label='Mobile'
						value={values.mobile}
						name='mobile'
						onChange={e => handleChange(e, validateOnChange)}
						errorTxt={errorTxt.mobile}
					/>
					<Controls.Input
						variant='outlined'
						label='City'
						value={values.city}
						name='city'
						onChange={handleChange}
					/>
				</Grid>
				<Grid item container direction='column' xs={6}>
					<Controls.MyRadioGroup
						name='gender'
						label='Gender'
						value={values.gender}
						onChange={handleChange}
					/>
					<Controls.MySelect
						name='departmentId'
						label='Department'
						value={values.departmentId}
						onChange={e => handleChange(e, validateOnChange)}
						options={employeeService.getDepartmentCollecion()}
						errorTxt={errorTxt.departmentId}
					/>
					<Controls.MyDatepicker
						name='hireDate'
						label='Hire Date'
						value={values.hireDate}
						onChange={handleChange}
					/>
					<Controls.MyCheckbox
						name='isPermanent'
						label='Is Permanant'
						value={values.isPermanent}
						onChange={handleChange}
					/>
					<div style={{ margin: '8px' }}>
						<Controls.MyButton
							text='Submit'
							onClick={handleSubmit}
							type='submit'
						/>
						<Controls.MyButton
							text='Reset'
							color='default'
							onClick={handleResetClick}
						/>
					</div>
				</Grid>
			</Grid>
		</Form>
	);
}
