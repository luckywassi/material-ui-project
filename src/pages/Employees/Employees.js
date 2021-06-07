import React, { useState } from 'react';
import EmployeesForm from './EmployeeForm';
import PageHeader from '../../Components/PageHeader';
import { PeopleOutlineOutlined } from '@material-ui/icons';
import {
	makeStyles,
	Paper,
	TableBody,
	TableCell,
	TableRow,
} from '@material-ui/core';
import useTable from '../../Components/useTable';
import * as employeeService from '../../services/employeeService';

const useStyles = makeStyles(theme => ({
	pageContent: {
		margin: theme.spacing(5),
		padding: theme.spacing(3),
	},
}));

const headCells = [
	{ id: 'fullName', label: 'Employee Name' },
	{ id: 'email', label: 'Email' },
	{ id: 'mobile', label: 'Phone Number' },
	{ id: 'departmentTitle', label: 'Department' },
];
export default function Employees() {
	const classes = useStyles();
	const [records, setRecords] = useState(employeeService.getAllEmployees());

	const {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPagingAndSorting,
	} = useTable(records, headCells);

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
				{/* <EmployeesForm /> */}
				<TblContainer>
					<TblHead />
					<TableBody>
						{recordsAfterPagingAndSorting().map(item => (
							<TableRow key={item.id}>
								<TableCell>{item.fullName}</TableCell>
								<TableCell>{item.email}</TableCell>
								<TableCell>{item.mobile}</TableCell>
								<TableCell>{item.departmentTitle}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</TblContainer>
				<TblPagination />
			</Paper>
		</>
	);
}
