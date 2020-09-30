import React, { useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core'
import JobsForm from './JobsForm/JobsForm'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { toolNames, youtubedlStaticOptions, ripmeStaticOptions, youtubedlDynamicOptions, jobOptions } from '../../constants.js'

const {YOUTUBE_DL, RIP_ME, GALLERY_DL} = toolNames;
const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    minHeight: 'calc(100vh - 142px)',
    flexGrow: '1',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#575757',
    color: '#fff'
  },
  Typography: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    marginBottom: theme.spacing(3),
    textAlign: "left",
    borderBottom: "1px solid #575757",
  },
  tabStyle: {
    backgroundColor: '#fff',
    color: 'inherit'

  },
  AppBar: {
    backgroundColor: '#575757',
    fontWeight: '700'
  },
  indicator: {
    backgroundColor: 'black',
    height: theme.spacing(0.4)
  },
  margin: {
    marginBottom: theme.spacing(9),
    marginTop: theme.spacing(9),
  },
  NavTabs: {
    backgroundColor:'red'
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}
function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={`${classes.root} ${classes.tabStyle}`}>
      <AppBar position="static" className={classes.AppBar}>
        <Tabs
          classes={{indicator: classes.indicator}}
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
          centered
        >
          <LinkTab label={ YOUTUBE_DL } href="/youtube-dl" {...a11yProps(0)} />
          <LinkTab label={ RIP_ME } href="/ripme" {...a11yProps(1)} />
          <LinkTab label={ GALLERY_DL } href="/gallery-dl" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Typography variant="h3" className={classes.margin}>
            YoutubeDl
        </Typography>
        <JobsForm tool={YOUTUBE_DL} dynamicOptions={youtubedlDynamicOptions} staticOptions={youtubedlStaticOptions} jobOptions={jobOptions} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h3" className={classes.margin}>
            RipMe
        </Typography>
        <JobsForm tool={RIP_ME} staticOptions={ripmeStaticOptions} dynamicOptions={[]} jobOptions={jobOptions}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h3" className={classes.margin}>
            GalleryDl
        </Typography>
        <JobsForm tool={GALLERY_DL} staticOptions={[]} dynamicOptions={[]} jobOptions={jobOptions}/>
      </TabPanel>
    </div>
  );
}
export default function CreateJobsView() {
  const classes = useStyles();
  return (
    <div className={`${classes.root} ${classes.tabStyle}`}>
      <Typography variant="h4" className={classes.Typography}>
        Jobs
      </Typography>
      <NavTabs className={classes.NavTabs}/>
    </div>
  );
}
