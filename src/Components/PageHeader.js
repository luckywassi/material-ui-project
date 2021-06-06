import { makeStyles, Paper, Typography, Card } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '10vh',
    gap: '20px',
    alignItems: 'center',
    marginLeft: '20px',
    '& .MuiCard-root': {
      padding: '10px',
      background: 'rgba(0,0,0,0.2)',
    },
  },
  pageInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    '& .MuiTypography-subtitle2': {
      opacity: '0.6',
    },
  },
});

export default function PageHeader(props) {
  const classes = useStyles();
  const { icon, title, subTitle } = props;
  return (
    <Paper square>
      <div className={classes.root}>
        <Card>{icon}</Card>
        <div className={classes.pageInfo}>
          <Typography variant='h4'>{title}</Typography>
          <Typography variant='subtitle2'>{subTitle}</Typography>
        </div>
      </div>
    </Paper>
  );
}
