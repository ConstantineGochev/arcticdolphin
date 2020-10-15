import React, { useState }from "react";
import Typography from "@material-ui/core/Typography";
import EnhancedTableHead from "../Jobs/Table/Table";
import CheckboxesGroup from "../Jobs/GroupsList/GroupsList";
import Snackbar from "@material-ui/core/Snackbar";
import Chip from "@material-ui/core/Chip";
import SearchInput from "../Jobs/SearchInput/SearchInput";
import Grid from "@material-ui/core/Grid";
import { SharedOptions } from '../Jobs/JobsForm/JobsForm'
import { toolNames, youtubedlStaticOptions, ripmeStaticOptions, youtubedlDynamicOptions, jobOptions, galleryStaticOptions, galleryDynamicOptions } from '../../constants.js'

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    minHeight: 'calc(100vh - 52px);',
    flexGrow: '1',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#F2F2F2',
  },
  Typography: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    marginBottom: theme.spacing(3),
    textAlign: "left",
    borderBottom: "1px solid #575757",
  },
}));

export default function GroupsView() {
  const classes = useStyles();
  const [toolDynamicOptions, setToolDynamicOptions] = useState([]);
  const [toolDynamicParam, setToolDynamicParam] = useState([]);
  const [jobOptionParam, setJobOptionParam] = useState([]);
  const [toolStaticOptions, setToolStaticOptions] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const [sneckBar, setSneckBar] = useState(false);

  function checkIfOptionExists(op, opts) {
    let exists = false;
    opts.map((tdop) => {
      const splitted = tdop.split(" ");
      if (op == splitted[0]) {
        exists = true;
      }
    });
    return exists;
  }

  function handleOptionAdd(e, param, setParam, options, setOptions) {
    e.preventDefault();
    const opt = e.target.getAttribute("option")
    const completeOption = opt + " " + param;
    const elemExists = checkIfOptionExists(opt, options);

    if (!elemExists) {
      setOptions((oldOptions) => [
        ...oldOptions,
        completeOption,
      ]);
    } else {
      setOptions((oldOptions) => {
        const opt = e.target.getAttribute("option");

        for (let indx = 0; indx < oldOptions.length; indx++) {
          const splitOldOp = oldOptions[indx].split(" ");
          //console.log("split old op = %s  opt = %s", splitOldOp[0], opt);
          if (opt == splitOldOp[0]) {
            oldOptions.splice(indx, 1);
            oldOptions.push(completeOption);
          }
        }
        return oldOptions;
      });
    }
    setParam("");
  }

  function handleParamChange(e, paramType) {
    switch (paramType) {
      case "dynamicParam":
        setToolDynamicParam(e.target.value);
        break;
      case "jobParam":
        setJobOptionParam(e.target.value);
        break;
      case "staticParam":
        setToolStaticOptions(e.target.value);
        break;
      case "sneckBarClose":
        setSneckBar(false);
        break
    }
  }


  function handleDeleteOption(toDelete, type) {
    switch (type) {
      case "dynamicOptions":
        setToolDynamicOptions((opts) => opts.filter((op) => op !== toDelete));
        break;
      case "jobOptions":
        setJobOptions((opts) => opts.filter((op) => op !== toDelete));
        break;
    }
  }

  function renderOptionChips(options, type) {
    return options.map((dopt,i) => {
      return  (
        <li key={i}>
            <Chip
              label={dopt}
              onDelete={() => handleDeleteOption(dopt, type)}
              className={classes.chip}
            />
        </li>
      )
    })

  }
  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.Typography}>
        Groups
      </Typography>
      <Grid container spacing={1} direction="row">
        <SharedOptions type="Dynamic" options={ youtubedlStaticOptions} handleOptionAdd={(e) => handleOptionAdd(e,toolDynamicParam,setToolDynamicParam,toolDynamicOptions,setToolDynamicOptions)}
        handleParamChange={(e) => handleParamChange(e, "dynamicParam")} renderChips={() => renderOptionChips(toolDynamicOptions, "dynamicOptions")} />

        <SharedOptions type="Job" options={youtubedlDynamicOptions} handleOptionAdd={(e) => handleOptionAdd(e,jobOptionParam,setJobOptionParam,jobOptions,setJobOptions)}
        handleParamChange={(e) => handleParamChange(e, "jobParam")} renderChips={() => renderOptionChips(jobOptions, "jobOptions")} />

      </Grid>
    </div>
  );
}
