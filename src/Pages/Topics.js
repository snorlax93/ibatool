import { Container, Grid } from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const getData = async () => {
  const response = await fetch("http://localhost:8080/api/topics/all");
  // const response = await fetch("http://192.168.4.47:8080/api/topics/all");
  const data = await response.json();
  return data;
};

const rows = await getData();

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Proposed Name",
  },
  {
    id: "quickLink",
    numeric: false,
    disablePadding: true,
    label: "Quick Link",
  },
  {
    id: "ranking",
    numeric: true,
    disablePadding: false,
    label: "Ranking",
  },
  {
    id: "uploader",
    numeric: false,
    disablePadding: false,
    label: "Uploader",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, isDialogOpen } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <></>
      )}

      {numSelected > 1 && (
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              // need to make a pop up asking to confirm delete of topics
              console.log("delete clicked");
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}

      {numSelected === 1 && (
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              // need to load the page for single edit
              console.log("Edit clicked");
              isDialogOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const Topics = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  const setthis = () => {
    // push data to API
    // if it's good close the dialog and continue
    setIsDialogOpen(false);
    // if it's bad, show an error and stay on page
  };

  const [topicName, setTopicName] = React.useState();
  const [quickLink, setQuickLink] = React.useState();
  const [content, setContent] = React.useState();
  const [ranking, setRanking] = React.useState();
  const [uploader, setUploader] = React.useState();
  const [veto, setVeto] = React.useState();

  const handleChange = (event) => {
    console.log("LA: " + event.target.id);
    console.log("LA: " + event.target.value);
    switch (event.target.id) {
      case "topicName":
        setTopicName(event.target.value);
        break;
      case "quickLink":
        setQuickLink(event.target.value);
        break;
      case "content":
        setContent(event.target.value);
        break;
      case "ranking":
        setRanking(event.target.value);
        break;
      case "uploader":
        setUploader(event.target.value);
        break;
      case "veto":
        setVeto(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <main>
        <Container maxWidth="xl">
          <Dialog onClose={setthis} open={isDialogOpen}>
            <DialogTitle>Edit Topic</DialogTitle>
            <Container component="main" maxWidth="xs">
              <Box component="form" noValidate onSubmit={{}}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="topicName"
                      required
                      fullWidth
                      id="topicName"
                      label="Topic Name"
                      value={topicName}
                      defaultValue={
                        visibleRows.find((o) => o.name === selected[0])?.name
                      }
                      autoFocus
                      onChange={(event) => handleChange(event)}
                      // need to setup onChange events to store all our data here so i can validate it in UI :D
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="quickLink"
                      label="Quick Link"
                      value={quickLink}
                      name="quickLink"
                      autoComplete="quickLink"
                      defaultValue={
                        visibleRows.find((o) => o.name === selected[0])
                          ?.quickLink
                      }
                      onChange={(event) => handleChange(event)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="content"
                      label="Content"
                      value={content}
                      name="content"
                      autoComplete="content"
                      multiline
                      defaultValue={
                        visibleRows.find((o) => o.name === selected[0])?.content
                      }
                      onChange={(event) => handleChange(event)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="ranking"
                      label="Ranking"
                      value={ranking}
                      name="ranking"
                      autoComplete="ranking"
                      defaultValue={
                        visibleRows.find((o) => o.name === selected[0])?.ranking
                      }
                      onChange={(event) => handleChange(event)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="uploader"
                      label="Uploader"
                      value={uploader}
                      type="uploader"
                      id="uploader"
                      autoComplete="uploader"
                      defaultValue={
                        visibleRows.find((o) => o.name === selected[0])
                          ?.uploader
                      }
                      onChange={(event) => handleChange(event)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="veto"
                      label="Veto"
                      value={veto}
                      type="veto"
                      id="veto"
                      autoComplete="veto"
                      defaultValue={
                        visibleRows.find((o) => o.name === selected[0])?.veto
                      }
                      onChange={(event) => handleChange(event)}
                    />
                  </Grid>
                </Grid>
                <Button
                  // type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={async () => {
                    console.log("submitted the form");
                    console.log("LA the formdata is {" + topicName);
                    let dataobj = {
                      name: topicName,
                      quickLink: quickLink,
                      content: content,
                      ranking: ranking,
                      uploader: uploader,
                      veto: veto,
                    };
                    let data = {};
                    for (const [key, value] of Object.entries(dataobj)) {
                      if (value !== undefined) {
                        data[key] = value;
                      }
                    }
                    alert("Saving Changes");
                    try {
                      const response = await fetch(
                        `http://localhost:8080/api/topics/edit/${
                          // `http://192.168.4.47:8080/api/topics/edit/${
                          visibleRows.find((o) => o.name === selected[0])?._id
                        }`,
                        {
                          method: "PATCH",
                          body: JSON.stringify(data),
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      );
                      let resp = response.json();
                      console.log(resp);
                    } catch (error) {
                      console.log(error.message);
                    }
                  }}
                >
                  Submit Change
                </Button>
              </Box>
            </Container>
          </Dialog>
          <Grid container spacing={4} sx={{ mt: 3, ml: -2 }}>
            <Box sx={{ width: "100%" }}>
              {/* <Paper sx={{ width: "100%", mb: 2 }}> */}
              <Button
                variant="text"
                onClick={() => console.log("add new clicked")}
              >
                Add New
              </Button>
              <EnhancedTableToolbar
                numSelected={selected.length}
                isDialogOpen={setIsDialogOpen}
              />
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {visibleRows.map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          // onClick={(event) => handleClick(event, row.name)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.name}
                          selected={isItemSelected}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              onClick={(event) => handleClick(event, row.name)}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="right">
                            <a
                              href={row.quickLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {row.quickLink}
                            </a>
                          </TableCell>
                          <TableCell align="right">{row.ranking}</TableCell>
                          <TableCell align="right">{row.uploader}</TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              {/* </Paper> */}
              <FormControlLabel
                control={
                  <Switch checked={dense} onChange={handleChangeDense} />
                }
                label="Dense padding"
              />
            </Box>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Topics;
