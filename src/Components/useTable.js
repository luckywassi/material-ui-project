import {
	makeStyles,
	Table,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
} from '@material-ui/core';

import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
	table: {
		marginTop: theme.spacing(3),
		'& thead th': {
			fontWeight: '600',
			color: theme.palette.primary.main,
			background:
				'linear-gradient(to bottom, rgba(0,0,0,0.3),rgba(0,0,0,0.3))',
			// background: theme.palette.primary.light,
		},
		'& tbody td': {
			fontWeight: '300',
		},
		'& tbody tr:hover': {
			background: '#fffbf2',
			cursor: 'pointer',
		},
	},
}));

export default function useTable(records, headCells) {
	const classes = useStyles();
	/////////////////////////////////////////////
	//////states and functions for pagintion/////
	/////////////////////////////////////////////
	const pages = [5, 10, 20];
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
	const handleChangePage = (e, newPage) => {
		//for previous(<) and next(>) page symbols to work
		setPage(newPage);
	};

	const handleChangeRowsPerPage = e => {
		//changes the number left to rows per page according to selected value
		setRowsPerPage(parseInt(e.target.value, 10));
		setPage(0);
	};
	/////////////////////////////////////////
	//////states and functions for sorting//
	////////////////////////////////////////
	const [order, setOrder] = useState();
	const [orderBy, setOrderBy] = useState();
	const handleSortRequest = columnId => {
		const isAsc = orderBy === columnId && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(columnId); //tells which column we are reffering to for sorting
	};
	// const mySort = records => {
	// 	//convertedRecords is an array of arrays.
	// 	const convertedRecords = records.map(eachRecord => [eachRecord]);
	// 	convertedRecords.sort((a, b) => comparator(a, b));
	// 	//sortedRecords is an array of objects and also it is sorted
	// 	const sortedRecords = convertedRecords.map(arrayItem => arrayItem[0]);
	// 	if (order === 'asc') return sortedRecords;
	// 	else return sortedRecords.reverse();
	// };
	// const comparator = (a, b) => {
	// 	const firstValue = a[0][orderBy];
	// 	const secondValue = b[0][orderBy];
	// 	if (firstValue > secondValue) return 1;
	// 	if (firstValue < secondValue) return -1;
	// 	return 0;
	// };

	//////////////////////////////////////////////////////
	//---------------simplified sorting-----------------//
	//////////////////////////////////////////////////////
	const mySort = records => {
		records.sort((a, b) => comparator(a, b));
		if (order === 'asc') return records;
		else return records.reverse();
	};
	const comparator = (a, b) => {
		const firstValue = a[orderBy];
		const secondValue = b[orderBy];
		if (firstValue > secondValue) return 1;
		if (firstValue < secondValue) return -1;
		return 0;
	};
	////////////////////////////////////////////
	////states for dense table/////////////////
	////////////////////////////////////////////
	const [dense, setDense] = useState(false);
	const handleChangeDense = () => {
		setDense(!dense);
	};
	///////////////////////////////////////////////
	///////STATES AND FUNCTIONS FOR SEARCH and filtering////////
	//////////////////////////////////////////////
	const [searchedString, setSearchedString] = useState('');
	const handleChangeSearch = e => {
		setSearchedString(e.target.value);
	};
	const handleFilter = () => {
		if (searchedString)
			return records.filter(eachRecord =>
				eachRecord.fullName.toLowerCase().includes(searchedString)
			);
		return records;
	};
	///////////////////////////////////////////////

	const TblContainer = props => (
		// or simply size={dense? 'small' : 'medium'}
		<Table className={classes.table} {...(dense && { size: 'small' })}>
			{props.children}
		</Table>
	);

	const TblHead = props => (
		<TableHead>
			<TableRow>
				{headCells.map(headCell => (
					<TableCell key={headCell.id}>
						{headCell.disableSorting ? (
							headCell.label
						) : (
							<TableSortLabel
								active={orderBy === headCell.id}
								direction={
									orderBy === headCell.id ? order : 'asc'
								}
								onClick={() => {
									handleSortRequest(headCell.id);
								}}
							>
								{headCell.label}
							</TableSortLabel>
						)}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);

	const TblPagination = () => (
		<TablePagination
			component='div'
			rowsPerPageOptions={pages}
			count={records.length}
			rowsPerPage={rowsPerPage}
			page={page}
			onChangePage={handleChangePage}
			onChangeRowsPerPage={handleChangeRowsPerPage}
		/>
	);

	const recordsAfterPagingAndSorting = () => {
		if (order) {
			//sorting and pagination
			let sortedRecords = mySort(handleFilter());
			return sortedRecords.slice(
				page * rowsPerPage,
				(page + 1) * rowsPerPage
			);
		}
		// only pagination
		else
			return handleFilter().slice(
				page * rowsPerPage,
				(page + 1) * rowsPerPage
			);
	};

	return {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPagingAndSorting,
		dense,
		handleChangeDense,
		searchedString,
		handleChangeSearch,
	};
}
