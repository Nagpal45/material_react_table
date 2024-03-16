import { ArrowDownward, ArrowUpward, SwapVertTwoTone } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import React from 'react'
import styles from '@/app/page.module.css'

export default function Sort({columnSorts, setSorting, columns, handleSortClick, setColumnSorts}) {
  return (
    <div className={styles.sidePanel}>
          <h2>Sort Columns</h2>
          <div className={styles.sepLine}></div>
          {columns.map((col) => (
            <Button variant="outlined"color="inherit" key={col.accessorKey} className={styles.sortItem} onClick={() => handleSortClick(col)}>
              <span>{col.header}</span>
              <IconButton>
                {columnSorts[col.accessorKey] == false ? (
                  <ArrowUpward/>
                ) : columnSorts[col.accessorKey] == true ? (
                  <ArrowDownward/>
                ): <SwapVertTwoTone/>}
              </IconButton>
            </Button>
          ))}
          <Button variant='contained' size='large' onClick={() => {setSorting([]); setColumnSorts({})}} className={styles.Button}>Clear Sorting</Button>
        </div>
  )
}
