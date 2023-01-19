import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../Header";
import { tokens } from "../../theme";
import TokenIconLarge from "../TokenIcons/TokenIconLarge";
import { GridApi, Record } from "@mui/x-data-grid";
import ModalDialogSwap from "../Swap/ModalDialogSwap";
import { useState } from "react";

const TokensTable = ({ coins, onChooseToken }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [open, setOpen] = useState(false) // state for Oauth modal form
    const [buy, setBuy] = useState(false);
    const [tokenInfo, setTokenInfo] = useState(false);

    const rowClickHandler = (rowData) => {
        onChooseToken(rowData.row);
    }


    const columns = [
        {
            field: "logo", headerName: "", sortable: false, width: 32, disableClickEventBubbling: true, renderCell: (params) => {
                return (
                    <TokenIconLarge svgpath={params.row.svg_path} />)
            }
        },
        { field: "svg_path", headerName: "svgpath", sortable: false, hide: true },
        { field: "CoinName", headerName: "Name", sortable: false, flex: 1, cellClassName: 'name-column--cell' },
        { field: "Symbol", headerName: "Token", sortable: false, cellClassName: 'symbol-column--cell' },
        // { field: "quantity", headerName: "Value", sortable: false, width: 88, type: "number", headerAlign: "right", align: "right" },
        // { field: "usdValue", headerName: "USD", sortable: false, width: 88, headerAlign: "right", align: "right" },
        // { field: "share", headerName: "%", sortable: false, width: 88, headerAlign: "right", align: "right" },
        // {
        //     field: "buy", headerName: "", sortable: false, width: 70, headerAlign: "center", align: "center", renderCell: (params) => {
        //         const onClick = (e) => {
        //             e.stopPropagation();
        //             const api: GridApi = params.api;
        //             const thisRow: Record<string, GridCellValue> = {};

        //             api
        //                 .getAllColumns()
        //                 .filter((c) => c.field !== "__check__" && !!c)
        //                 .forEach(
        //                     (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
        //                 );
        //             setBuy(true);
        //             setTokenInfo(thisRow);
        //             setOpen(true);

        //         }
        //         return <Button sx={{
        //             backgroundColor: colors.greenAccent[600],
        //             color: colors.grey[100],
        //             fontSize: "10px",
        //             fontWeight: "bold",
        //             padding: "5px 0px",
        //         }} onClick={onClick}> Buy</Button>;
        //     }
        // },
        // {
        //     field: "sell", headerName: "", sortable: false, width: 70, headerAlign: "center", align: "center", renderCell: (params) => {
        //         const onClick = (e) => {
        //             e.stopPropagation();
        //             const api: GridApi = params.api;
        //             const thisRow: Record<string, GridCellValue> = {};

        //             api
        //                 .getAllColumns()
        //                 .filter((c) => c.field !== "__check__" && !!c)
        //                 .forEach(
        //                     (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
        //                 );
        //             setBuy(false);
        //             setTokenInfo(thisRow);
        //             setOpen(true);
        //         }
        //         return <Button sx={{
        //             backgroundColor: colors.redAccent[600],
        //             color: colors.grey[100],
        //             fontSize: "10px",
        //             fontWeight: "bold",
        //             padding: "5px 0px",
        //         }} onClick={onClick}> Sell</Button>;
        //     }
        // }
    ]

    return (

        <Box m="0 0 0 0" height="100%" width="100%" marginTop="20px" sx={{
            "& .MuiDataGrid-root": {
                border: "none",
                // borderColor: colors.greenAccent[400]
            },
        }}>
            <DataGrid
                rows={coins}
                columns={columns}
                getRowId={(row) => row.Id}
                headerHeight={0}
                rowHeight={70}
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                        // borderColor: colors.greenAccent[400]
                    },
                    "& .MuiDataGrid-main": {
                        borderRadius: "5px"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                        cursor: "pointer",
                        fontSize: "16px"
                    },
                    "& .name-column--cell:focus-within, & .MuiDataGrid-cell:focus": {
                        outline: 'none'
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        display: "none",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                        display: "none"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[600],
                        "&::-webkit-scrollbar": {
                            width: '4px'
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: colors.primary[400]
                        },
                        "&::-webkit-scrollbar-track": {
                            backgroundColor: colors.primary[600]
                        }
                    },
                    "& .MuiDataGrid-footerContainer": {
                        display: "none"
                        // backgroundColor: colors.primary[600],
                    },
                    "& .MuiTablePagination-root": {
                        display: "none"
                    }
                }}
                onRowClick={(rowData) => rowClickHandler(rowData)}
            />
        </Box>
    );
};

export default TokensTable;