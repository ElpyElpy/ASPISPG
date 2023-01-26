import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import TokenIcon from "../TokenIcons/TokenIcon";
import { useState, useEffect } from "react";




const SomeonePortfolioTable = ({ coins, onReceiveSwapData, isCollapsed }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        setWidth(window.innerWidth);
    })

    // const columns = [
    //     {
    //         field: "logo", headerName: "", sortable: false, width: 32, disableClickEventBubbling: true, renderCell: (params) => {
    //             return (
    //                 <TokenIcon svgpath={params.row.svgpath} />)
    //         }
    //     },
    //     { field: "svgpath", headerName: "svgpath", sortable: false, hide: true },
    //     { field: "token", headerName: "Name", sortable: false, hide: true },
    //     { field: "ticker", headerName: "Token", sortable: false, width: 80, cellClassName: 'name-column--cell' },
    //     { field: "quantity", headerName: "Value", sortable: false, width: 130, type: "number", headerAlign: "right", align: "right" },
    //     { field: "usdValue", headerName: "USD", sortable: false, width: 130, headerAlign: "right", align: "right" },
    //     { field: "share", headerName: "%", sortable: false, width: 130, headerAlign: "right", align: "right" },
    // ]

    if (!isCollapsed && width > 1200) {
        var columns = [
            {
                field: "logo", headerName: "", sortable: false, width: 32, disableClickEventBubbling: true, renderCell: (params) => {
                    return (
                        <TokenIcon svgpath={params.row.svgpath} />)
                }
            },
            { field: "svgpath", headerName: "svgpath", sortable: false, hide: true },
            { field: "token", headerName: "Name", sortable: false, hide: true },
            { field: "ticker", headerName: "Token", sortable: false, width: 80, cellClassName: 'name-column--cell' },
            { field: "quantity", headerName: "Value", sortable: false, width: 130, type: "number", headerAlign: "right", align: "right" },
            { field: "usdValue", headerName: "USD", sortable: false, width: 130, headerAlign: "right", align: "right" },
            { field: "share", headerName: "%", sortable: false, width: 130, headerAlign: "right", align: "right" },
        ]
    } else if (isCollapsed && width > 1200) {
        var columns = [
            {
                field: "logo", headerName: "", sortable: false, width: 32, disableClickEventBubbling: true, renderCell: (params) => {
                    return (
                        <TokenIcon svgpath={params.row.svgpath} />)
                }
            },
            { field: "svgpath", headerName: "svgpath", sortable: false, hide: true },
            { field: "token", headerName: "Name", sortable: false, hide: true },
            { field: "ticker", headerName: "Token", sortable: false, width: 100, cellClassName: 'name-column--cell' },
            { field: "quantity", headerName: "Value", sortable: false, width: 150, type: "number", headerAlign: "right", align: "right" },
            { field: "usdValue", headerName: "USD", sortable: false, width: 150, headerAlign: "right", align: "right" },
            { field: "share", headerName: "%", sortable: false, width: 150, headerAlign: "right", align: "right" },
        ]
    } else if (!isCollapsed && width <= 1200 && width > 820) {
        var columns = [
            {
                field: "logo", headerName: "", sortable: false, width: 32, disableClickEventBubbling: true, renderCell: (params) => {
                    return (
                        <TokenIcon svgpath={params.row.svgpath} />)
                }
            },
            { field: "svgpath", headerName: "svgpath", sortable: false, hide: true },
            { field: "token", headerName: "Name", sortable: false, hide: true },
            { field: "ticker", headerName: "Token", sortable: false, width: 150, cellClassName: 'name-column--cell' },
            { field: "quantity", headerName: "Value", sortable: false, width: 220, type: "number", headerAlign: "right", align: "right" },
            { field: "usdValue", headerName: "USD", sortable: false, width: 220, headerAlign: "right", align: "right" },
            { field: "share", headerName: "%", sortable: false, width: 220, headerAlign: "right", align: "right" },
        ]
    } else if (isCollapsed && width <= 1200 && width > 820) {
        var columns = [
            {
                field: "logo", headerName: "", sortable: false, width: 32, disableClickEventBubbling: true, renderCell: (params) => {
                    return (
                        <TokenIcon svgpath={params.row.svgpath} />)
                }
            },
            { field: "svgpath", headerName: "svgpath", sortable: false, hide: true },
            { field: "token", headerName: "Name", sortable: false, hide: true },
            { field: "ticker", headerName: "Token", sortable: false, width: 180, cellClassName: 'name-column--cell' },
            { field: "quantity", headerName: "Value", sortable: false, width: 270, type: "number", headerAlign: "right", align: "right" },
            { field: "usdValue", headerName: "USD", sortable: false, width: 270, headerAlign: "right", align: "right" },
            { field: "share", headerName: "%", sortable: false, width: 270, headerAlign: "right", align: "right" },
        ]
    } else if (width <= 820 && width > 500) {
        var columns = [
            {
                field: "logo", headerName: "", sortable: false, width: 32, disableClickEventBubbling: true, renderCell: (params) => {
                    return (
                        <TokenIcon svgpath={params.row.svgpath} />)
                }
            },
            { field: "svgpath", headerName: "svgpath", sortable: false, hide: true },
            { field: "token", headerName: "Name", sortable: false, hide: true },
            { field: "ticker", headerName: "Token", sortable: false, width: 180, cellClassName: 'name-column--cell' },
            { field: "quantity", headerName: "Value", sortable: false, width: 175, type: "number", headerAlign: "right", align: "right" },
            { field: "usdValue", headerName: "USD", sortable: false, width: 175, headerAlign: "right", align: "right" },
            { field: "share", headerName: "%", sortable: false, width: 175, headerAlign: "right", align: "right" },
        ]
    } else if (width <= 500) {
        var columns = [
            {
                field: "logo", headerName: "", sortable: false, width: 32, disableClickEventBubbling: true, renderCell: (params) => {
                    return (
                        <TokenIcon svgpath={params.row.svgpath} />)
                }
            },
            { field: "svgpath", headerName: "svgpath", sortable: false, hide: true },
            { field: "token", headerName: "Name", sortable: false, hide: true },
            { field: "ticker", headerName: "Token", sortable: false, width: 90, cellClassName: 'name-column--cell' },
            { field: "quantity", headerName: "Value", sortable: false, width: 90, type: "number", headerAlign: "right", align: "right" },
            { field: "usdValue", headerName: "USD", sortable: false, width: 90, headerAlign: "right", align: "right" },
        ]
    }



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
                        color: colors.grey[100],
                        fontWeight: 'bold'
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.primary[600],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                        display: "none"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[500],
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

export default SomeonePortfolioTable;