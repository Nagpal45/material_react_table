import { Stack } from '@mui/material'
import { MRT_TableHeadCellFilterContainer } from 'material-react-table'
import styles from '@/app/page.module.css'

export default function Filter({table, tableCols}) {
    return (
        <div className={styles.sidePanel}>
            <h2>Filters</h2>
            <div className={styles.sepLine}></div>
            {/* <FilterPanel filters={columnFilters} setColumnFilters={setColumnFilters} data={data}/> */}
            <Stack gap="0.5vw" sx={{ height: "100%", width: "100%" }}>
                {table?.getLeafHeaders()?.filter(header =>
                    tableCols.some(col => col.accessorKey === header.id) &&
                    !["id", "sale_price"].includes(header.id)
                ).map((header) => (
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
    )
}
