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
    
    }