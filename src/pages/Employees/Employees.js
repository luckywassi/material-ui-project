import React, { useEffect, useState } from 'react';
// import EmployeesForm from './EmployeeForm';
import PageHeader from '../../Components/PageHeader';
import { PeopleOutlineOutlined, Search } from '@material-ui/icons';
import {
	FormControlLabel,
	InputAdornment,
	makeStyles,
	Paper,
	Switch,
	TableBody,
	TableCell,
	TableRow,
	Toolbar,
} from '@material-ui/core';
import useTable from '../../Components/useTable';
import * as employeeService from '../../services/employeeService';
import Controls from '../../Components/Controls/Controls';
import * as loadService from '../../services/loadDataService';

const useStyles = makeStyles(theme => ({
	pageContent: {
		margin: theme.spacing(5),
		padding: theme.spacing(3),
	},
}));

const headCells = [
	{ id: 'fullName', label: 'Employee Name', disableSorting: false },
	{ id: 'email', label: 'Email', disableSorting: true },
	{ id: 'mobile', label: 'Phone Number', disableSorting: true },
	{ id: 'departmentTitle', label: 'Department', disableSorting: false },
];
export default function Employees() {
	const classes = useStyles();
	// const [records, setRecords] = useState(employeeService.getAllEmployees());
    const records = employeeService.getAllEmployees();
	const [isDataLoaded, setIsDataLoaded] = useState();

	useEffect(() => {
		if (records.length < 1) setIsDataLoaded(false);
		else setIsDataLoaded(true);
	}, [records]);

	const {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPagingAndSorting,
		handleChangeDense,
		dense,
		handleChangeSearch,
		searchedString,
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
				<Toolbar>
					<Controls.Input
						label='Search Employee'
						value={searchedString}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Search />
								</InputAdornment>
							),
						}}
						onChange={handleChangeSearch}
					/>
					<div style={{ marginLeft: '20px' }}>
						<Controls.MyButton
							text={isDataLoaded ? 'Clear Data' : 'Load Data'}
							color='default'
							onClick={e =>
								loadService.handleLoadClick(
									isDataLoaded,
									setIsDataLoaded
								)
							}
						/>
					</div>
				</Toolbar>
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
				<div>
					<FormControlLabel
						control={
							<Switch
								checked={dense}
								onChange={handleChangeDense}
							/>
						}
						label='Dense padding'
					/>
				</div>
			</Paper>
		</>
	);
}
