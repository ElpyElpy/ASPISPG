import { Box, useTheme, Button, Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../Header";
import { tokens } from "../../theme";
import TokenIconLarge from "../TokenIcons/TokenIconLarge";
import { GridApi, Record } from "@mui/x-data-grid";
import ModalDialogSwap from "../Swap/ModalDialogSwap";
import { useState } from "react";
import { mockDataLeaderboard } from "../../data/MockData";
import { useEffect } from "react";
import fetchAllPortfolios from "../../services/fetchAllPortfolios";
import checkIsUsersPortfolio from "../../services/checkIsUsersPortfolio";
import { useNavigate } from 'react-router-dom';

const LeaderboardTable = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [portfolios, setPortfolios] = useState(null);
    const [width, setWidth] = useState(window.innerWidth);

    const rowClickHandler = async (rowData) => {
        if (rowData.id) {
            const isUsersPortfolio = await checkIsUsersPortfolio(rowData.row.portfolio_name);
            if (isUsersPortfolio.msg === 'false') {
                navigate('/allportfolios/personalportfolio', { state: { id: rowData.id } });
            } else {
                navigate('/portfolio');
            }
        }
    }


    useEffect(() => {
        setWidth(window.innerWidth);
        async function getAllPortfolios() {
            const data = await fetchAllPortfolios();
            console.log(data);
            // sort data by change (change is a string in format "+3.00%", so we need to convert it to a number first) and ad column with portfolio_rank
            data.sort((a, b) => {
                const changeA = parseFloat(a.change.replace("%", ""));
                const changeB = parseFloat(b.change.replace("%", ""));
                return changeB - changeA;
            })
            data.forEach((portfolio, index) => {
                portfolio.portfolio_rank = index + 1;
            })
            console.log(data);
            setPortfolios(data);
        }
        !portfolios && getAllPortfolios();
    })


    if (width > 1000) {
        var columns = [
            {
                field: "portfolio_rank", headerName: "", sortable: false, flex: 0, width: 80, minWidth: 30, cellClassName: 'rank-column--cell', headerAlign: "center", align: "center"
            },
            {
                field: "url", headerName: "Portfolio", sortable: false, width: 70, minWidth: 30, flex: 0, disableClickEventBubbling: true, renderCell: (params) => {
                    return (
                        <Avatar alt="PB" src={params.row.url} style={{ alignSelf: 'center' }} sx={{ width: 50, height: 50, background: 'transparent', border: "solid 1px", borderColor: colors.grey[200] }} />)
                }
            },
            { field: "portfolio_name", headerName: "", sortable: false, flex: 3, cellClassName: 'name-column--cell' },
            { field: "username", headerName: "Portfolio owner", sortable: false, flex: 1, cellClassName: 'owner-column--cell' },
            {
                field: "change", headerName: "Change", sortable: false, flex: 1, cellClassName: (params) => {
                    return params.value[0] === "+" ? 'change-column--cell--positive' : 'change-column--cell--negative'
                }
            },
            { field: "usdValue", headerName: "AUM", sortable: false, flex: 1, cellClassName: 'aum-column--cell', headerAlign: "right", align: "right" },
        ]
    } else {
        var columns = [
            {
                field: "portfolio_rank", headerName: "", sortable: false, flex: 0, width: 30, minWidth: 30, cellClassName: 'rank-column--cell', headerAlign: "center", align: "center"
            },
            {
                field: "url", headerName: "", sortable: false, width: 40, minWidth: 30, flex: 0, disableClickEventBubbling: true, renderCell: (params) => {
                    return (
                        <Avatar alt="PB" src={params.row.url} style={{ alignSelf: 'center' }} sx={{ width: 30, height: 30, background: 'transparent', border: "solid 1px", borderColor: colors.grey[200] }} />)
                }
            },
            { field: "portfolio_name", headerName: "", sortable: false, flex: 2, cellClassName: 'name-column--cell' },
            {
                field: "change", headerName: "Change", sortable: false, flex: 1, cellClassName: (params) => {
                    return params.value[0] === "+" ? 'change-column--cell--positive' : 'change-column--cell--negative'
                }
            },
        ]
    }

    return (

        <Box m="0 0 0 0" height="100%" width="100%" marginTop="20px" sx={{
            "& .MuiDataGrid-root": {
                border: "none",
                // borderColor: colors.greenAccent[400]
            },
        }}>
            {portfolios && <DataGrid
                rows={portfolios}
                columns={columns}
                getRowId={(row) => row.user_id}
                // headerHeight={0}
                rowHeight={100}
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
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                        cursor: "pointer",
                        fontSize: "16px"
                    },
                    "& .rank-column--cell": {
                        fontSize: width < 500 ? '18px' : '22px',
                        fontWeight: 'bold',
                    },
                    "& .name-column--cell": {
                        fontSize: width < 500 ? '14px' : '18px',
                        fontWeight: 'bold',
                    },
                    "& .owner-column--cell": {
                        fontSize: width < 500 ? '12px' : '14px',
                        color: colors.grey[300],
                    },
                    "& .change-column--cell--positive": {
                        color: colors.greenAccent[500],
                        fontWeight: 'bold',
                    },
                    "& .change-column--cell--negative": {
                        color: colors.redAccent[500],
                        fontWeight: 'bold',
                    },
                    "& .name-column--cell:focus-within, & .MuiDataGrid-cell:focus": {
                        outline: 'none'
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        // display: "none",
                        backgroundColor: colors.primary[600],
                        fontSize: width < 500 ? '12px' : '14px',
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
                            backgroundColor: colors.primary[600]
                        },
                        "&::-webkit-scrollbar-track": {
                            backgroundColor: colors.primary[600]
                        }
                    },
                    "& .MuiDataGrid-footerContainer": {
                        display: "none"
                    },
                    "& .MuiTablePagination-root": {
                        display: "none"
                    }
                }}
                onRowClick={(rowData) => rowClickHandler(rowData)}
            />}
        </Box>
    );
};

export default LeaderboardTable;