import {Box,IconButton,Tooltip,lighten,} from "@mui/material";
import {FilterList,Layers,SwapVertTwoTone,VisibilityOutlined} from "@mui/icons-material";
import {MRT_GlobalFilterTextField,MRT_TablePagination} from "material-react-table";

export const props = {
    muiTableBodyCellProps: {
        sx: {
          border: "none",
          padding: "12px",
          fontSize: "0.9vw",
          textAlign: "center",
          borderLeft: "1px solid rgba(224, 224, 224, 1)",
        },
      },
      muiTableHeadCellProps: {
        sx: {
          borderTop: "1px solid rgba(224, 224, 224, 1);",
          borderLeft: "1px solid rgba(224, 224, 224, 1);",
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
  
      muiTablePaperProps: {
        sx: {
          boxShadow: "none",
        },
      },
      muiTableProps: {
        sx: { overflow: "hidden", border: "1px solid gray" },
      },
      enableMultiSort: true,
      enableGrouping: true,
    enableColumnActions: false,
    paginationDisplayMode: "pages",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "primary",
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

    muiFilterDatePickerProps: {
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
    }