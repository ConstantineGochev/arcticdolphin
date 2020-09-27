import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: 0,
    width: 13,
    height: 13,
    backgroundColor: 'transparent',
    border: '2px solid #575757',
    '$root.Mui-focusVisible &': {
      outline: '2px auto #575757',
      outlineOffset: 2,
    },
  },
  checkedIcon: {
    backgroundColor: 'transparent',
    '&:before': {
      display: 'block',
      width: 13,
      height: 13,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23575757'/%3E%3C/svg%3E\")",
      content: '""',
    }
  },
});

function StyledCheckbox(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      inputProps={{ 'aria-label': 'decorative checkbox' }}
      {...props}
    />
  );
}

export default function CustomCheckbox(props) {
  return (
    <div>
      <StyledCheckbox default {...props}/>
    </div>
  );
}
