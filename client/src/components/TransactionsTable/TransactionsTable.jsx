import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import TokenIcon from "../TokenIcons/TokenIcon";
import { useState } from "react";
import { useEffect } from "react";
import UploadIcon from '@mui/icons-material/Upload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const TransactionsTable = ({ transactions, onReceiveSwapData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [open, setOpen] = useState(false) // state for Oauth modal form
    const [buy, setBuy] = useState(false);
    const [tokenInfo, setTokenInfo] = useState(false);

    const handleClose = () => {
        onReceiveSwapData(true);
        setOpen(false)
    }

    useEffect(() => {

    }, [transactions]);



    const columns = [
        {
            field: "logoDown", headerName: "", sortable: false, width: 35, minWidth: 35, disableClickEventBubbling: true, renderCell: (params) => {
                return (
                    <UploadIcon sx={{ color: colors.redAccent[500] }} />)
            }
        },
        {
            field: "send_svg_path", headerName: "", sortable: false, width: 35, minWidth: 35, disableClickEventBubbling: true, renderCell: (params) => {
                return (
                    <TokenIcon svgpath={params.row.send_svg_path} />)
            }
        },
        { field: "send_token", headerName: "Out", sortable: false, hide: false },
        { field: "send_token_amount", headerName: "Amount", sortable: false, hide: false, headerAlign: "right", align: "right" },
        { field: "tab3", headerName: "", sortable: false, flex: 1, hide: false },
        {
            field: "logoUp", headerName: "", sortable: false, width: 35, minWidth: 35, disableClickEventBubbling: true, renderCell: (params) => {
                return (
                    <FileDownloadIcon sx={{ color: colors.greenAccent[500] }} />)
            }
        },
        {
            field: "buy_svg_path", headerName: "", sortable: false, width: 35, minWidth: 35, disableClickEventBubbling: true, renderCell: (params) => {
                return (
                    <TokenIcon svgpath={params.row.buy_svg_path} />)
            }
        },
        { field: "buy_token", headerName: "In", sortable: false, hide: false },
        { field: "buy_token_amount", headerName: "Amount", sortable: false, hide: false, headerAlign: "right", align: "right" },
        { field: "tab4", headerName: "", sortable: false, flex: 1, hide: false },
        { field: "usd_value", headerName: "USD value", sortable: false, hide: false, headerAlign: "right", align: "right" },
        { field: "date", headerName: "Date", sortable: false, hide: false, headerAlign: "right", flex: 2, align: "right" },
    ]

    return (

        <Box m="0 0 0 0" height="100%" width="100%">
            <DataGrid
                rows={transactions}
                columns={columns}
                sx={{
                    "& .MuiDataGrid-root": {
                        // border: "none",
                    },
                    "& .MuiDataGrid-main": {
                        borderRadius: "5px"
                    },
                    "& .MuiDataGrid-cell": {
                        // borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[400],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.primary[600],
                        // borderBottom: "none",
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
        </Box>

    );
};

export default TransactionsTable;