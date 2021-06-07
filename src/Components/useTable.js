import {
	makeStyles,
	Table,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
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

	const pages = [5, 10, 20];
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

	const TblContainer = props => (
		<Table className={classes.table}>{props.children}</Table>
	);
	const TblHead = props => (
		<TableHead>
			<TableRow>
				{headCells.map(cell => (
					<TableCell key={cell.id}>{cell.label}</TableCell>
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

	const recordsAfterPagingAndSorting = () => {
		return records.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
	};

	return {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPagingAndSorting,
	};
}
