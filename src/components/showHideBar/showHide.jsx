import { Button, List, ListItem, ListItemSecondaryAction, ListItemText, Switch } from '@mui/material'
import React from 'react'
import styles from '@/app/page.module.css'

export default function Showhide({columns, setColumnVisibility, columnVisibility}) {
  const handleShowAll = () => {
    const updatedVisibility = {};
    columns.forEach((col) => {
      updatedVisibility[col.accessorKey] = true;
    });
    setColumnVisibility(updatedVisibility);
  };
  return (
    <div className={styles.sidePanel}>
    <h2>Show/Hide Columns</h2>
    <div className={styles.sepLine}></div>
    <List className={styles.list}>
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
      <Button className={styles.Button} variant='contained' size='large' onClick={handleShowAll}>Show All Columns</Button>
  </div>
  )
}
