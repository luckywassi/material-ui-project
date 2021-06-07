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
	//states for pagintion
	const pages = [5, 10, 20];
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

	//states for sorting
	const [order, setOrder] = useState();
	const [orderBy, setOrderBy] = useState();

	////
	const TblContainer = props => (
		<Table className={classes.table}>{props.children}</Table>
	);

	const handleSortRequest = columnId => {
		const isAsc = orderBy === columnId && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(columnId); //tells which column we are reffering to for sorting
	};

	const TblHead = props => (
		<TableHead>
			<TableRow>
				{headCells.map(headCell => (
					<TableCell key={headCell.id}>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={() => {
								handleSortRequest(headCell.id);
							}}
						>
							{headCell.label}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);

	const handleChangePage = (e, newPage) => {
		//for previous(<) and next(>) page symbols to work
		setPage(newPage);
	};

	const handleChangeRowsPerPage = e => {
		//changes the number left to rows per page according to selected value
		setRowsPerPage(parseInt(e.target.value, 10));
		setPage(0);
	};

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

	const mySort = records => {
		//convertedRecords is an array of arrays.
		const convertedRecords = records.map(eachRecord => [eachRecord]);
		convertedRecords.sort((a, b) => comparator(a, b));
		//sortedRecords is an array of objects and also it is sorted
		const sortedRecords = convertedRecords.map(arrayItem => arrayItem[0]);
		if (order === 'asc') return sortedRecords;
		else return sortedRecords.reverse();
	};
	const comparator = (a, b) => {
		const firstValue = a[0][orderBy];
		const secondValue = b[0][orderBy];
		if (firstValue > secondValue) return 1;
		else if (firstValue < secondValue) return -1;
		else return 0;
	};
	const recordsAfterPagingAndSorting = () => {
		if (order) {
			let sortedRecords = mySort(records);
			return sortedRecords.slice(
				page * rowsPerPage,
				(page + 1) * rowsPerPage
			);
		} else
			return records.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
	};

	return {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPagingAndSorting,
	};
}
