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
    ]

    return (

        <Box m="0 0 0 0" height="50vh" width="100%" marginTop="20px" sx={{
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
                        background: 'transparent',
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