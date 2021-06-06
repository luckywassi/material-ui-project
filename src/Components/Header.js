import {
  AppBar,
  Toolbar,
  Grid,
  InputBase,
  IconButton,
  Badge,
  makeStyles,
} from '@material-ui/core';
import {
  Notifications,
  ChatBubble,
  PowerSettingsNew,
  Search,
} from '@material-ui/icons';

import React from 'react';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(to right, rgba(0,0,0,0.3),rgba(0,0,0,0.3))',
    boxShadow: 'none',
  },
  searchInput: {
    //  border: '1px solid white',
    borderRadius: '5px',
    '&:hover': {
      background: 'rgba(256,256,256, 0.4)',
    },
    '& .MuiSvgIcon-root': {
      opacity: '0.6',
      marginRight: '10px',
      marginLeft: '10px',
    },
  },
});

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <Grid container justify='space-between' alignItems='center'>
          <Grid item>
            <InputBase
              className={classes.searchInput}
              placeholder='Search…'
              startAdornment={<Search />}
            />
          </Grid>
          <Grid item>
            <IconButton>
              <Badge badgeContent={4} color='secondary'>
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color='secondary'>
                <ChatBubble />
              </Badge>
            </IconButton>
            <IconButton>
              <PowerSettingsNew />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
