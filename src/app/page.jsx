"use client";
import { useMemo, useState } from "react";
import { data, tableCols } from "@/data";
import {
  MRT_GlobalFilterTextField,
  MRT_TableHeadCellFilterContainer,
  MRT_TablePagination,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import styles from "./page.module.css";
import {
  Box,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  lighten,
} from "@mui/material";
import {
  Close,
  FilterList,
  Layers,
  SwapVertTwoTone,
  VisibilityOutlined,
} from "@mui/icons-material";
import Group from "@/components/groupBar/group";
import Showhide from "@/components/showHideBar/showHide";
import Sort from "@/components/sortBar/sortBar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const App = () => {
  const columns = useMemo(() => tableCols, []);
  const [sorting, setSorting] = useState([]);
  const [columnSorts, setColumnSorts] = useState({});



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
        padding: "18px",
        fontSize: "0.9vw",
        textAlign: "center",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        borderTop: "1px solid rgba(224, 224, 224, 1);",
        fontSize: "1vw",
        textAlign: "center",
        backgroundColor: "lightblue",

        "& .css-1w86f15": {
          justifyContent: "center",
          padding: "15px",
        },

        "& .css-i4bv87-MuiSvgIcon-root": {
          display: "none",
          cursor: "none",
        },
      },
    },
    muiTableBodyRowProps: {
      hover: false,
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
    muiTableProps: {
      sx: { overflow: "hidden" },
    },
    enableMultiSort: true,
    onSortingChange: setSorting,
    enableGrouping: true,
    enableColumnActions: false,
    initialState: {
      showGlobalFilter: true,
      grouping: [],
      expanded: true,
    },
    state: { columnVisibility, sorting },
    onColumnVisibilityChange: setColumnVisibility,
    paginationDisplayMode: "pages",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "standard",
      showRowsPerPage: false,
      showFirstButton: false,
      showLastButton: false,
      shape: "rounded",
      variant: "outlined",
      size: "large",
    },
    muiFilterTextFieldProps: {
      inputProps: { style: { fontSize: "1vw", padding: "10px", } },
      SelectProps: { style: { fontSize: "1vw", padding: "10px", } },
      
      sx: {
        border: "1px solid rgba(224, 224, 224, 1)",
      },
    },

    muiFilterDatePickerProps:{
      format: "DD-MMM-YYYY",
    },
    muiFilterSliderProps: {
      sx: {
        width: "80%",
      },
    },
  

    enableFilters: true,
    enableFacetedValues: true,
    columnFilterDisplayMode: "custom",
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
            <MRT_GlobalFilterTextField table={table} size="large" fullWidth />
            <Tooltip title="Show / Hide Columns">
              <IconButton
                onClick={() => handleSidePanel("showHide")}
                sx={{ marginLeft: "1vw" }}
              >
                <VisibilityOutlined sx={{ fontSize: "1.5vw" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sort By Columns">
              <IconButton
                onClick={() => handleSidePanel("sort")}
                sx={{ marginLeft: "1vw" }}
              >
                <SwapVertTwoTone sx={{ fontSize: "1.5vw" }} />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Filter By Columns"
              onClick={() => handleSidePanel("filter")}
              sx={{ marginLeft: "1vw" }}
            >
              <IconButton>
                <FilterList sx={{ fontSize: "1.5vw" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Group By Columns">
              <IconButton
                onClick={() => handleSidePanel("group")}
                sx={{ marginLeft: "1vw" }}
              >
                <Layers sx={{ fontSize: "1.5vw" }} />
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
            marginTop: "1vw",
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

  const handleSortClick = (col) => {
    const currentSort = columnSorts[col.accessorKey] || false;
    console.log(currentSort);
    const newDirection = !currentSort;
    console.log(newDirection);
    setColumnSorts({ ...columnSorts, [col.accessorKey]: newDirection });

    const newSorting = sorting.map((sort) => {
      if (sort.id === col.accessorKey) {
        return { id: sort.id, desc: newDirection };
      }
      return sort;
    });

    if (!newSorting.find((s) => s.id === col.accessorKey)) {
      newSorting.push({ id: col.accessorKey, desc: newDirection });
    }
    console.log(newSorting);
    setSorting(newSorting);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.app}>
        <div className={styles.tableContainer}>
          <MaterialReactTable table={table} />
        </div>
        <Drawer
          anchor="right"
          open={sidePanel !== ""}
          onClose={() => handleSidePanel("")}
        >
          {sidePanel === "showHide" && (
            <>
              <Showhide
                columns={columns}
                setColumnVisibility={setColumnVisibility}
                columnVisibility={columnVisibility}
              />
              <Close
                className={styles.close}
                onClick={() => setSidePanel("")}
              />
            </>
          )}
          {sidePanel === "sort" && (
            <>
              <Sort
                columns={columns}
                columnSorts={columnSorts}
                setSorting={setSorting}
                handleSortClick={handleSortClick}
                setColumnSorts={setColumnSorts}
              />
              <Close
                className={styles.close}
                onClick={() => setSidePanel("")}
              />
            </>
          )}
          {sidePanel === "group" && (
            <>
              <Group
                column={column}
                handleChange={handleChange}
                handleGroup={handleGroup}
                handleUngroup={handleUngroup}
              />
              <Close
                className={styles.close}
                onClick={() => setSidePanel("")}
              />
            </>
          )}
          {sidePanel === "filter" && (
            <>
              <div className={styles.sidePanel}>
                <h2>Filters</h2>
                <div className={styles.sepLine}></div>
                {/* <FilterPanel filters={columnFilters} setColumnFilters={setColumnFilters} data={data}/> */}
                <Stack gap="0.5vw" sx={{height:"100%", width:"100%"}}>
                
                  {table.getLeafHeaders().slice(1,7).map((header) => (
                    <div key={header.id} className={styles.filter}>
                    <p>{header.column.columnDef.header}</p>
                    <MRT_TableHeadCellFilterContainer
                      key={header.id}
                      header={header}
                      table={table}
                      in
                    />
                    </div>
                  ))}
                </Stack>
              </div>
              <Close
                className={styles.close}
                onClick={() => setSidePanel("")}
              />
            </>
          )}
        </Drawer>
      </div>
    </LocalizationProvider>
  );
};

export default App;
