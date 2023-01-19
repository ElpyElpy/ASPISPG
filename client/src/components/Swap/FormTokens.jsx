import { Box, Button, Card, Dialog, IconButton, Link, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import GoogleIcon from '@mui/icons-material/Google';
import React, { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AssetCard from "./AssetCard";
import DependendAssetCard from "./DependedAssetCard";
import { useEffect } from "react";





const FormTokens = ({ handleClose, buy, tokenInfo }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const [tokenValue, setTokenValue] = useState(0);
    const [dependedTokenPrice, setDependedTokenPrice] = useState(0);
    const [dependedTokenQuant, setDependedTokenQuant] = useState(0)

    const handleValue = (value) => {
        console.log(value);
        setTokenValue(value);
        setDependedTokenQuant(value / dependedTokenPrice);
    }

    const handlePrice = (price) => {
        setDependedTokenPrice(price);
        setDependedTokenQuant(tokenValue / price);
    }

    const handleSubmit = async (event) => {

    }

    return (
        <form onSubmit={handleSubmit} style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem 2rem 2rem 2rem",
            borderRadius: '30px',
            backgroundColor: colors.primary[700]
        }}>
            <AssetCard buy={buy} tokenInfo={tokenInfo} onSelectValue={handleValue} />
            <DependendAssetCard buy={!buy} onSelectPrice={handlePrice} dependedTokenQuant={dependedTokenQuant} />
            <Box display="flex" marginTop="20px" width="100%">
                <Button
                    sx={{
                        width: "100%",
                        backgroundColor: colors.redAccent[600],
                        color: colors.grey[100],
                        fontSize: "12px",
                        fontWeight: "bold",
                        padding: "15px 0px",
                        borderRadius: "10px",
                        '&:hover': {
                            backgroundColor: colors.greenAccent[600],
                        }
                    }}
                >
                    SWAP
                </Button>
            </ Box>
        </form >

    )
};

export default FormTokens;