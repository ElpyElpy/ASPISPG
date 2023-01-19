import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import TokenIcon from "../TokenIcons/TokenIcon";
import { GridApi, Record } from "@mui/x-data-grid";
import ModalDialogSwap from "../Swap/ModalDialogSwap";
import { useState } from "react";

const PortfolioTable = ({ coins, onReceiveSwapData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [open, setOpen] = useState(false) // state for Oauth modal form
    const [buy, setBuy] = useState(false);
    const [tokenInfo, setTokenInfo] = useState(false);

    const handleClose = () => {
        onReceiveSwapData(true);
        setOpen(false)
    }




    const columns = [
        {
            field: "logo", headerName: "", sortable: false, width: 32, disableClickEventBubbling: true, renderCell: (params) => {
                return (
                    <TokenIcon svgpath={params.row.svgpath} />)
            }
        },
        { field: "svgpath", headerName: "svgpath", sortable: false, hide: true },
        { field: "token", headerName: "Name", sortable: false, hide: true },
        { field: "ticker", headerName: "Token", sortable: false, width: 88, cellClassName: 'name-column--cell' },
        { field: "quantity", headerName: "Value", sortable: false, width: 88, type: "number", headerAlign: "right", align: "right" },
        { field: "usdValue", headerName: "USD", sortable: false, width: 88, headerAlign: "right", align: "right" },
        { field: "share", headerName: "%", sortable: false, width: 88, headerAlign: "right", align: "right" },
        {
            field: "buy", headerName: "", sortable: false, width: 70, headerAlign: "center", align: "center", renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation();
                    const api = params.api;
                    const thisRow = {};

                    api
                        .getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach(
                            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                        );
                    setBuy(true);
                    setTokenInfo(thisRow);
                    setOpen(true);

                }
                return <Button sx={{
                    backgroundColor: colors.greenAccent[600],
                    color: colors.grey[100],
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "5px 0px",
                }} onClick={onClick}> Buy</Button>;
            }
        },
        {
            field: "sell", headerName: "", sortable: false, width: 70, headerAlign: "center", align: "center", renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation();
                    const api = params.api;
                    const thisRow = {};

                    api
                        .getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach(
                            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                        );
                    setBuy(false);
                    setTokenInfo(thisRow);
                    setOpen(true);
                }
                return <Button sx={{
                    backgroundColor: colors.redAccent[600],
                    color: colors.grey[100],
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "5px 0px",
                }} onClick={onClick}> Sell</Button>;
            }
        }
    ]

    return (

        <Box m="0 0 0 0" height="100%" width="100%">
            <DataGrid
                rows={coins}
                columns={columns}
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-main": {
                        borderRadius: "5px"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[400],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.primary[600],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                        display: "none"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        // display: "none"
                        backgroundColor: colors.primary[600],
                    },
                    "& .MuiTablePagination-root": {
                        display: "none"
                    },
                    "& .name-column--cell:focus-within, & .MuiDataGrid-cell:focus": {
                        outline: 'none'
                    },
                    "& .MuiDataGrid-selectedRowCount": {
                        visibility: "hidden"
                    }
                }}
            />
            <ModalDialogSwap open={open} handleClose={handleClose} buy={buy} tokenInfo={tokenInfo} coins={coins} />
        </Box>

    );
};

export default PortfolioTable;