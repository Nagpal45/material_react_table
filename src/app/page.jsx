"use client";
import { useMemo, useState } from "react";
import { data } from "@/data";
import {
  MRT_GlobalFilterTextField,
  MRT_TablePagination,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import styles from "./page.module.css";
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  Switch,
  Tooltip,
  lighten,
} from "@mui/material";
import {
  FilterList,
  Layers,
  SwapVertTwoTone,
  VisibilityOutlined,
} from "@mui/icons-material";

const App = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        size: 150,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "category",
        header: "Category",
        size: 200,
      },
      {
        accessorKey: "subcategory",
        header: "Subcategory",
        size: 150,
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        size: 150,
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        size: 150,
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 150,
      },
      {
        accessorKey: "sale_price",
        header: "Sale Price",
        size: 150,
      },
    ],
    []
  );

  const [sidePanel, setSidePanel] = useState("");
  const handleSidePanel = (type) => {
    setSidePanel(type);
  };

  const [columnVisibility, setColumnVisibility] = useState(() => {
    const initialVisibilities = {};
    columns.forEach((col) => {
      initialVisibilities[col.accessorKey] = true;
    });
    return initialVisibilities;
  });

  const table = useMaterialReactTable({
    columns,
    data,
    muiTableBodyCellProps: {
      sx: {
        border: "none",
        padding: "2px",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        borderTop: "1px solid rgba(224, 224, 224, 1);",
      },
    },
    muiTableBodyProps: {
      sx: {
        border: "none",
      },
    },
    muiTablePaperProps: {
      sx: {
        boxShadow: "none",
      },
    },
    enableGrouping: true,
    enableColumnActions: false,
    initialState: {
      showGlobalFilter: true,
      grouping: [],
      expanded: true,
    },
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,

    paginationDisplayMode: "pages",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      showRowsPerPage: false,
      showFirstButton: false,
      showLastButton: false,
      shape: "rounded",
      variant: "outlined",
    },
    renderTopToolbar: ({ table }) => {
      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: "flex",
            gap: "0.5rem",
            padding: "28px",
            justifyContent: "flex-end",
          })}
        >
          <Box
            sx={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MRT_GlobalFilterTextField table={table} />
            <Tooltip title="Show">
              <IconButton>
                <VisibilityOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sort">
              <IconButton>
                <SwapVertTwoTone />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Show/Hide Columns"
              onClick={() => handleSidePanel("showHide")}
            >
              <IconButton>
                <FilterList />
              </IconButton>
            </Tooltip>
            <Tooltip title="Group">
              <IconButton onClick={() => handleSidePanel("group")}>
                <Layers />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      );
    },
    renderBottomToolbar: ({ table }) => {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          <MRT_TablePagination table={table} />
        </Box>
      );
    },
  });
  const [column, setColumn] = useState("");

  const handleChange = (event) => {
    setColumn(event.target.value);
  };

  const handleGroup = () => {
    table.setGrouping([column]);
    setSidePanel("");
  };

  const handleUngroup = () => {
    table.setGrouping([]);
    setSidePanel("");
  };

  return (
    <div className={styles.app}>
      <div className={styles.tableContainer}>
        <MaterialReactTable table={table} />
      </div>
      <Drawer
        anchor="right"
        open={sidePanel !== ""}
        onClose={() => handleSidePanel("")}
      >
        {sidePanel === "group" && (
          <div className={styles.sidePanel}>
            <h2>Create groups</h2>
            <div className={styles.sepLine}></div>
            <FormControl className={styles.select}>
              <InputLabel id="demo-simple-select-label">
                Select column
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={column}
                label="Select Column"
                onChange={handleChange}
              >
                <MenuItem value={"category"}>Category</MenuItem>
                <MenuItem value={"subcategory"}>SubCategory</MenuItem>
              </Select>
              <Button
                sx={{ marginTop: "3vw" }}
                size="large"
                className={styles.button}
                variant="outlined"
                onClick={handleGroup}
              >
                Apply Grouping
              </Button>
              <Button
                onClick={handleUngroup}
                sx={{ marginTop: "1vw" }}
                size="large"
                className={styles.button}
                variant="contained"
              >
                Clear Grouping
              </Button>
            </FormControl>
          </div>
        )}
        {sidePanel === "showHide" && (
          <div className={styles.sidePanel}>
            <h2>Show/Hide Columns</h2>
            <div className={styles.sepLine}></div>
            <List>
              {columns.map((col) => (
                <ListItem key={col.accessorKey}>
                  <ListItemText primary={col.header} />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={columnVisibility[col.accessorKey]}
                      onChange={(event) =>
                        setColumnVisibility({
                          ...columnVisibility,
                          [col.accessorKey]: event.target.checked,
                        })
                      }
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default App;
