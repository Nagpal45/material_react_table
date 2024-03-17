"use client";
import { useMemo, useState } from "react";
import { data, tableCols } from "@/data";
import {MaterialReactTable,useMaterialReactTable} from "material-react-table";
import styles from "./page.module.css";
import {Drawer} from "@mui/material";
import {Close} from "@mui/icons-material";
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
