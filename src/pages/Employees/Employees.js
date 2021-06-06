import React from 'react';
import EmployeesForm from './EmployeeForm';
import PageHeader from '../../Components/PageHeader';
import { PeopleOutlineOutlined } from '@material-ui/icons';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	pageContent: {
		margin: theme.spacing(5),
		padding: theme.spacing(3),
	},
}));

export default function Employees() {
	const classes = useStyles();
	return (
		<>
			<PageHeader
				title='New Employee'
				subTitle='Form Design With Validation'
				icon={
					<PeopleOutlineOutlined fontSize='large' color='primary' />
				}
			/>
			<Paper className={classes.pageContent}>
				<EmployeesForm />
			</Paper>
		</>
	);
}
