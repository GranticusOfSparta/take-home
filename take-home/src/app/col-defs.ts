import { ColDef } from 'ag-grid-community';

export const MAIN_GRID_COL_DEFS: ColDef[] = [
    {
        headerName: "Title", field: "title", sortable: true, resizable: true, pinned: true, lockPosition: true, filter: 'agTextColumnFilter'
    },
    {
        headerName: 'On Sale', field: 'isOnSale', sortable: true, resizable: true, valueFormatter: (params) => { return params.value === "1" ? "On Sale" : "Not On Sale" },
    },
    {
        headerName: 'Deal Rating', field: 'dealRating', sortable: true, resizable: true, filter: 'agNumberColumnFilter'
    },
    { headerName: 'Sale Price', field: 'salePrice', sortable: true, resizable: true, filter: 'agNumberColumnFilter' },
    { headerName: 'Normal Price', field: 'normalPrice', sortable: true, resizable: true, filter: 'agNumberColumnFilter' },
    { headerName: 'Meta Critic Score', field: 'metacriticScore', sortable: true, resizable: true, filter: 'agNumberColumnFilter' },
    { headerName: 'Steam Rating', field: 'steamRatingCount', sortable: true, resizable: true, filter: 'agNumberColumnFilter' },
];
