import React, { useState }from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import Chip from "@material-ui/core/Chip";
import SearchInput from "../Jobs/SearchInput/SearchInput";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { SharedOptions, StaticOptions } from '../Jobs/JobsForm/JobsForm'
import { toolNames, youtubedlStaticOptions, ripmeStaticOptions,jobOptions, youtubedlDynamicOptions, galleryStaticOptions, galleryDynamicOptions } from '../../constants.js'
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  staticOpts: {
    paddingTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    maxWidth: '99%',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexGrow: '1',
  },
  Button: {
    width: "25%",
    fontWeight: "bold",
    borderRadius: "20px",
    textTransform: "none",
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export default function CreateGroupsView() {
  const classes = useStyles();
  const [youtubeDlDynamicOptions, setYoutubeDlDynamicOptions] = useState([]);
  const [youtubeDlDynamicParam, setYoutubeDlDynamicParam] = useState([]);
  const [glDynamicOptions, setGlDynamicOptions] = useState([]);
  const [galleryDynamicParam, setGalleryDynamicParam] = useState([]);
  const [jobOptionParam, setJobOptionParam] = useState([]);
  const [ytStaticOpts, setYtStaticOpts] = useState([]);
  const [glStaticOptions, setGlStaticOptions] = useState([]);
  const [ripOptions, setRipOptions] = useState([]);
  const [jobOpts, setJobOptions] = useState([]);
  const [name, setName] = useState('');
  const [sneckBar, setSneckBar] = useState(false);
  const [sneckBarError, setSneckBarError] = useState(false)

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
      case "youtubeDynamicOptions":
        setYoutubeDlDynamicParam(e.target.value);
        break;
      case "galleryDynamicOptions":
        setGalleryDynamicParam(e.target.value);
        break;
      case "jobParam":
        setJobOptionParam(e.target.value);
        break;
      case "youTubeStatic":
        setYtStaticOpts(e.target.value);
        break;
      case "galleryStatic":
        setGlStaticOptions(e.target.value);
        break;
      case "ripmeStatic":
        setRipOptions(e.target.value);
        break;
      case "sneckBarClose":
        setSneckBar(false);
        break;
      case "sneckBarErrorClose":
        setSneckBarError(false)
        break;
    }
  }


  function handleDeleteOption(toDelete, type) {
    switch (type) {
      case "youtubeDynamicOptions":
        setYoutubeDlDynamicOptions((opts) => opts.filter((op) => op !== toDelete));
        break;
      case "galleryDynamicOptions":
        setGlDynamicOptions((opts) => opts.filter((op) => op !== toDelete));
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
  function submitGroup() {
    console.log('submit...')
    if(name === '') {
      setSneckBarError(true)
      return
    }
    axios
      .post("http://localhost:8000/groups/create", {
        name: name,
        youtubeOptions: youtubeDlDynamicOptions.concat(ytStaticOpts),
        ripmeOptions: ripOptions,
        galleryOptions: glDynamicOptions.concat(glStaticOptions),
        jobOptions: jobOpts
      })
      .then((resp) => {
        console.log(resp)
        if (resp.data === 'success') {
          setSneckBar(true)
          setName('')
        }
      })
      .catch((err) => console.log(err));

  }
  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.Typography}>
        Create Group
      </Typography>
      <Grid container spacing={1} direction="row">
        <Grid
          container
          spacing={1}
          direction="column"
          className={classes.staticOpts}
        >
        <SearchInput     
            value={name}
            placeholder="Group Name"
            onChange={(e) => {
              return setName(e.target.value);
        }}/> 
        <StaticOptions name="Youtube Static" value={ytStaticOpts} handleParamChange={(e) => handleParamChange(e, "youTubeStatic")} options={youtubedlStaticOptions}/>
        </Grid>
        <SharedOptions type="YoutubeDl Dynamic" options={ youtubedlDynamicOptions} handleOptionAdd={(e) => handleOptionAdd(e,youtubeDlDynamicParam,setYoutubeDlDynamicParam,youtubeDlDynamicOptions,setYoutubeDlDynamicOptions)}
        handleParamChange={(e) => handleParamChange(e, "youtubeDynamicOptions")} renderChips={() => renderOptionChips(youtubeDlDynamicOptions, "youtubeDynamicOptions")} />
        <Grid
          container
          spacing={1}
          direction="column"
          className={classes.staticOpts}
        >
          <StaticOptions name="Gallery Static" value={glStaticOptions} handleParamChange={(e) => handleParamChange(e, "galleryStatic")} options={galleryStaticOptions}/>
        </Grid>
        <SharedOptions type="GalleryDl Dynamic" options={galleryDynamicOptions} handleOptionAdd={(e) => handleOptionAdd(e,galleryDynamicParam,setGalleryDynamicParam,glDynamicOptions,setGlDynamicOptions)}
        handleParamChange={(e) => handleParamChange(e, "galleryDynamicOptions")} renderChips={() => renderOptionChips(glDynamicOptions, "galleryDynamicOptions")} />
        <Grid
          container
          spacing={1}
          direction="column"
          className={classes.staticOpts}
        >
          <StaticOptions name="Ripme" value={ripOptions} handleParamChange={(e) => handleParamChange(e, "ripmeStatic")} options={ripmeStaticOptions}/>
        </Grid>
        <SharedOptions type="Job" options={jobOptions} handleOptionAdd={(e) => handleOptionAdd(e,jobOptionParam,setJobOptionParam,jobOpts,setJobOptions)}
        handleParamChange={(e) => handleParamChange(e, "jobParam")} renderChips={() => renderOptionChips(jobOpts, "jobOptions")} />
        <Grid
          container
          spacing={1}
          direction="column"
          className={classes.staticOpts}
        >
          <Button
            type="submit"
            className={`${classes.Button}`}
            variant="outlined"
            onClick={submitGroup}
          >
            Add Group
          </Button>
        </Grid>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center'}} open={sneckBar} autoHideDuration={4000} onClose={(e) => handleParamChange(e, "sneckBarClose")}>
            <Alert onClose={(e) => handleParamChange(e, "sneckBarClose")} severity="success">
              You have successfully added a group!
            </Alert>
          </Snackbar>
          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center'}} open={sneckBarError} autoHideDuration={4000} onClose={(e) => handleParamChange(e, "sneckBarErrorClose")}>
            <Alert onClose={(e) => handleParamChange(e, "sneckBarErrorClose")} severity="error">
              You need to name the group!
            </Alert>
          </Snackbar>
      </Grid>
    </div>
  );
}
