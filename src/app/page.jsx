"use client";
import { useMemo, useState } from "react";
import { data, tableCols } from "@/data";
import {MRT_GlobalFilterTextField,MRT_TablePagination,MaterialReactTable,useMaterialReactTable} from "material-react-table";
import styles from "./page.module.css";
import {Box,Drawer,IconButton,Tooltip,lighten,} from "@mui/material";
import {Close,FilterList,Layers,SwapVertTwoTone,VisibilityOutlined} from "@mui/icons-material";
import Group from "@/components/groupBar/group";
import Showhide from "@/components/showHideBar/showHide";
import Sort from "@/components/sortBar/sortBar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Filter from "@/components/filterBar/filter";
import {props} from "@/app/props";

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
    ...props,
    onSortingChange: setSorting,
    
    initialState: {
      showGlobalFilter: true,
      grouping: [],
      expanded: true,
    },
    state: { columnVisibility, sorting },
    onColumnVisibilityChange: setColumnVisibility,
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
              <Filter table={table} tableCols={tableCols}/>
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
