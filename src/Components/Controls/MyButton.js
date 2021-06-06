import { Button, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
	root: {
		marginRight: theme.spacing(2),
	},
	label: {
		textTransform: 'capitalize',
	},
}));

export default function MyButton(props) {
	const { text, onClick, color, ...other } = props;
	const classes = useStyles();
	console.log(other.type);
	return (
		<Button
			variant='contained'
			size='large'
			color={color || 'primary'}
			onClick={onClick}
			classes={{ root: classes.root, label: classes.label }}
		>
			{text}
		</Button>
	);
}
