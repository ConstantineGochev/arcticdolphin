import React, {useState, useEffect} from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Grid from "@material-ui/core/Grid";
import axios from 'axios'



const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#BFBFBF",
      border: "2px solid black",
      color: "black",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: "1.25rem",
      width: "200px",
      marginRight: theme.spacing(3),
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      border: "2px solid black",
    },
  }))(TableRow);
  
  const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
        minHeight: 'calc(100vh - 52px);',
        flexGrow: '1',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#F2F2F2',
      },
      item: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%'
      },
      Typography: {
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(1),
        marginBottom: theme.spacing(3),
        textAlign: "left",
        borderBottom: "1px solid #575757",
      },
    table: {
        width: '90%',
        minWidth: 700,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    tableContainer: {
      marginLeft: "-1.7rem",
    },
    tableCell: {
      border: "2px solid black",
      fontSize: "0.8rem",
      padding: theme.spacing(0.5),
    },
    groupsTagCell: {
      paddingLeft: theme.spacing(0.3),
      paddingTop: theme.spacing(1.5),
      display: "flex",
      flexWrap: "wrap",
      border: "none",
      fontSize: "0.7rem",
    },
    dateCell: {
      minWidth: "100px",
    },
    tableHead: {
      width: "fit-content",
      padding: theme.spacing(0.5),
      fontSize: "1rem",
    },
    pagination: {
      marginRight: theme.spacing(15),
    }
  }));
export default function GroupsView() {
  const classes = useStyles();
  const [groups, setGroups] = useState([]);
  // Pagitation setup - start
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    console.log(parseInt(event.target.value, 10))
    setPage(0);
  };
  // Pagitation setup - end
  function fetchJGroups() {
    axios.get("http://localhost:8000/groups").then(res => {

        setGroups(res.data)
    }).catch(err => console.log(err))

  }
  function handleDeleteGroup(name) {
      console.log("delete ",name )
      axios.delete(`http://localhost:8000/groups/delete/${name}`,{}).then(res => {

        console.log(res.data)
        if (res.data == 'success') {
            fetchJGroups();
        }
    }).catch(err => console.log(err))
  }

  useEffect(function() {
      console.log("in use effect")
    fetchJGroups()
  }, [])

  return (
    <div className={classes.root}>
      {console.log('rendering')}
      <Typography variant="h4" className={classes.Typography}>
        Groups
      </Typography>
      <React.Fragment>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.tableHead}>
                Name
              </StyledTableCell>
              <StyledTableCell className={classes.tableHead}>
                Youtube Options
              </StyledTableCell>
              <StyledTableCell className={classes.tableHead}>
                Ripme Options
              </StyledTableCell>
              <StyledTableCell className={classes.tableHead}>
                Gallery Options
              </StyledTableCell>
              <StyledTableCell className={classes.tableHead}>
                Job Options
              </StyledTableCell>
              <StyledTableCell
                className={classes.tableHead}
                align="center"
              >Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
    
              {groups.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                console.log(row)
                return (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell className={classes.tableCell}>
                    {row.youtubeOptions}
                  </StyledTableCell>

                  <StyledTableCell
                    className={`${classes.tableCell} ${classes.dateCell}`}
                  >
                    {row.ripmeOptions}
                    
                  </StyledTableCell>
                  <StyledTableCell
                    className={`${classes.tableCell} ${classes.dateCell}`}
                  >
                    {row.galleryOptions}
                    
                  </StyledTableCell>
                  <StyledTableCell
                    className={`${classes.tableCell} ${classes.dateCell}`}
                  >
                    {row.jobOptions}

                  </StyledTableCell>
                  <StyledTableCell
                    className={`${classes.tableCell} ${classes.dateCell}`}
                  >
                   <Button variant="contained" color="secondary" onClick={() => handleDeleteGroup(row.name)}>Delete</Button>

                  </StyledTableCell>
                </StyledTableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={`${groups.length}`}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        className={classes.pagination}
      />
    </React.Fragment>
    </div>
  );
}