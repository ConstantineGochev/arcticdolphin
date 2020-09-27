import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  search: {
    margin: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    border: '2px solid #575757',
    color: '#575757',
    fontSize: '1.2rem'
  },
}));

export default function SearchInput(props) {
  const classes = useStyles();

  return (
      <InputBase
        className={classes.search}
        defaultValue={props.label}
        inputProps={{ 'aria-label': 'naked' }}
        onChange={props.onChange}
      />
  );
}
