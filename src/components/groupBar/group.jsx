import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import styles from '@/app/page.module.css'

export default function Group({column, handleChange, handleGroup, handleUngroup}) {
  return (
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
  )
}
