import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import TokenIcon from "../TokenIcons/TokenIcon";
import { GridApi, Record } from "@mui/x-data-grid";
import ModalDialogSwap from "../Swap/ModalDialogSwap";
import { useState, useEffect } from "react";

const PortfolioTable = ({ coins, onReceiveSwapData, isCollapsed }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [open, setOpen] = useState(false) // state for Oauth modal form
    const [buy, setBuy] = useState(false);
    const [tokenInfo, setTokenInfo] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        setWidth(window.innerWidth);
    })

    const handleClose = () => {
        onReceiveSwapData(true);
        setOpen(false)
    }


    // for laptop with full sidebar
    if (!isCollapsed && width > 1200) {
        var columns = [
            {
                field: "logo", headerName: "", sortable: false, width: 30, minWidth: 20, disableClickEventBubbling: true, renderCell: (params) => {
                    return (
                        <TokenIcon svgpath={params.row.svgpath} />)
                }
            },
            { field: "ticker", headerName: "Token", sortable: false, width: 86, cellClassName: 'name-column--cell' },
            { field: "svgpath", headerName: "svgpath", sortable: false, hide: true },
            { field: "token", headerName: "Name", sortable: false, hide: true },
            { field: "quantity", headerName: "Value", sortable: false, width: 86, type: "number", headerAlign: "right", align: "right" },
            { field: "usdValue", headerName: "USD", sortable: false, width: 88, headerAlign: "right", align: "right" },
            { field: "share", headerName: "%", sortable: false, width: 86, headerAlign: "right", align: "right" },
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
                        backgroundColor: colors.greenAccent[700],
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
        // for laptop with collapsed sideBar
    } else if (isCollapsed && width > 1200) {
        var columns = [
            {
                field: "logo", headerName: "", sortable: false, width: 30, minWidth: 20, disableClickEventBubbling: true, renderCell: (params) => {
                    return (
                        <TokenIcon svgpath={params.row.svgpath} />)
                }
            },
            { field: "ticker", headerName: "Token", sortable: false, width: 110, cellClassName: 'name-column--cell' },
            { field: "svgpath", headerName: "svgpath", sortable: false, hide: true },
            { field: "token", headerName: "Name", sortable: false, hide: true },
            { field: "quantity", headerName: "Value", sortable: false, width: 110, type: "number", headerAlign: "right", align: "right" },
            { field: "usdValue", headerName: "USD", sortable: false, width: 110, headerAlign: "right", align: "right" },
            { field: "share", headerName: "%", sortable: false, width: 110, headerAlign: "right", align: "right" },
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
                        backgroundColor: colors.greenAccent[700],
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
    } else if (!isCollapsed && width <= 1200 && width > 820) {
        var columns = [
            {
                field: "logo", headerName: "", sortable: false, width: 30, minWidth: 20, disableClickEventBubbling: true, renderCell: (params) => {
                    return (
                        <TokenIcon svgpath={params.row.svgpath} />)
                }
            },
            { field: "ticker", headerName: "Token", sortable: false, width: 167, cellClassName: 'name-column--cell' },
            { field: "svgpath", headerName: "svgpath", sortable: false, hide: true },
            { field: "token", headerName: "Name", sortable: false, hide: true },
            { field: "quantity", headerName: "Value", sortable: false, width: 167, type: "number", headerAlign: "right", align: "right" },
            { field: "usdValue", headerName: "USD", sortable: false, width: 167, headerAlign: "right", align: "right" },
            { field: "share", headerName: "%", sortable: false, width: 167, headerAlign: "right", align: "right" },
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
                        backgroundColor: colors.greenAccent[700],
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
    } else if (isCollapsed && width <= 1200 && width > 820) {
        var columns = [
            {
                field: "logo", headerName: "", sortable: false, width: 30, minWidth: 20, disableClickEventBubbling: true, renderCell: (params) => {
                    return (
                        <TokenIcon svgpath={params.row.svgpath} />)
                }
            },
            { field: "ticker", headerName: "Token", sortable: false, width: 270, cellClassName: 'name-column--cell' },
            { field: "svgpath", headerName: "svgpath", sortable: false, hide: true },
            { field: "token", headerName: "Name", sortable: false, hide: true },
            { field: "quantity", headerName: "Value", sortable: false, width: 197, type: "number", headerAlign: "right", align: "right" },
            { field: "usdValue", headerName: "USD", sortable: false, width: 197, headerAlign: "right", align: "right" },
            { field: "share", headerName: "%", sortable: false, width: 197, headerAlign: "right", align: "right" },
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
                        backgroundColor: colors.greenAccent[700],
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
    } else if (width <= 820 && width > 500) {
        var columns = [
            {
                field: "logo", headerName: "", sortable: false, width: 30, minWidth: 20, disableClickEventBubbling: true, renderCell: (params) => {
                    return (
                        <TokenIcon svgpath={params.row.svgpath} />)
                }
            },
            { field: "ticker", headerName: "Token", sortable: false, width: 150, cellClassName: 'name-column--cell' },
            { field: "svgpath", headerName: "svgpath", sortable: false, hide: true },
            { field: "token", headerName: "Name", sortable: false, hide: true },
            { field: "quantity", headerName: "Value", sortable: false, width: 125, type: "number", headerAlign: "right", align: "right" },
            { field: "usdValue", headerName: "USD", sortable: false, width: 125, headerAlign: "right", align: "right" },
            { field: "share", headerName: "%", sortable: false, width: 125, headerAlign: "right", align: "right" },
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
                        backgroundColor: colors.greenAccent[700],
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
    } else if (width <= 500) {
        var columns = [
            {
                field: "logo", headerName: "", sortable: false, width: 30, minWidth: 20, disableClickEventBubbling: true, renderCell: (params) => {
                    return (
                        <TokenIcon svgpath={params.row.svgpath} />)
                }
            },
            { field: "ticker", headerName: "Token", sortable: false, width: 65, cellClassName: 'name-column--cell' },
            { field: "svgpath", headerName: "svgpath", sortable: false, hide: true },
            { field: "token", headerName: "Name", sortable: false, hide: true },
            { field: "quantity", headerName: "Value", sortable: false, width: 75, type: "number", headerAlign: "right", align: "right" },
            { field: "usdValue", headerName: "USD", sortable: false, width: 90, headerAlign: "right", align: "right" },
            {
                field: "sell", headerName: "", sortable: false, width: 40, headerAlign: "center", align: "center", renderCell: (params) => {
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
                        borderRadius: "10px",
                        fontSize: "10px",
                        fontWeight: "bold",
                        padding: "5px 0px",
                    }} onClick={onClick}> Sell</Button>;
                }
            }
        ]
    }
    // for tablet with full sidebar

    // for tablet with collapsed sidebar

    // for phones





    return (

        <Box m="0 0 0 0" display="flex" height="100%" width="100%">
            <div style={{ flexGrow: 1 }}>
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
                            ml: '2px',
                            mr: '2px'
                        },
                        "& .name-column--cell": {
                            color: colors.grey[100],
                            fontWeight: 'bold'
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            background: `linear-gradient(135deg, ${colors.primary[600]} 30%, ${colors.primary[800]} 90%)`,
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-columnSeparator": {
                            display: "none"
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            background: `linear-gradient(135deg, ${colors.primary[500]} 30%, ${colors.primary[600]} 90%)`
                        },
                        "& .MuiDataGrid-footerContainer": {
                            // display: "none"
                            background: `linear-gradient(135deg, ${colors.primary[600]} 30%, ${colors.primary[800]} 90%)`,
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
            </div>
            <ModalDialogSwap open={open} handleClose={handleClose} buy={buy} tokenInfo={tokenInfo} coins={coins} />
        </Box>

    );
};

export default PortfolioTable;