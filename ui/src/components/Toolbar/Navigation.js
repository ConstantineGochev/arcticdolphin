import React from 'react';
import NavToolbar from './Toolbar';
import Dashboard from '../Dashboard/Dashboard';
import JobsView from '../Jobs/JobsView';
import CreateGroupsView from '../Groups/CreateGroupsView';
import GroupsView from '../Groups/GroupsView';
import CreateJobsView from '../Jobs/CreateJobsView';
import Downloads from '../Downloads/Downloads';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../Footer'

const useStyles = makeStyles({

});

export default function Navigation() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
        <NavToolbar />
        <Switch>
          <Route exact from="/" render={props => <JobsView {...props}/>} />
          <Route exact from="/jobs" render={props => <JobsView {...props}/>} />
          <Route exact from="/dashboard" render={props => <Dashboard {...props}/>} />
          <Route exact from="/create-groups" render={props => <CreateGroupsView {...props}/>} />
          <Route exact from="/groups" render={props => <GroupsView {...props}/>} />
          <Route exact from="/create-jobs" render={props => <CreateJobsView {...props}/>} />
          <Route exact from="/downloads" render={props => <Downloads {...props}/>} />
        </Switch>
        <Footer />
    </div>
  );
}
