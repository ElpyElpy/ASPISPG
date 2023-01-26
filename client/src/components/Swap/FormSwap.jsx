import { Box, Button, Card, Dialog, IconButton, Link, TextField, Typography, useTheme, CircularProgress, Alert, Snackbar } from "@mui/material";
import { tokens } from "../../theme";
import GoogleIcon from '@mui/icons-material/Google';
import React, { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AssetCard from "./AssetCard";
import DependendAssetCard from "./DependedAssetCard";
import { useEffect } from "react";
import sellTokens from "../../services/sellTokens";
import isTokenExists from "../../services/isTokenExists";
import isSufficientValue from "../../services/isSufficientValue";





const FormSwap = ({ handleClose, buy, tokenInfo, coins }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const [tokenValue, setTokenValue] = useState(0);
    const [dependedTokenPrice, setDependedTokenPrice] = useState(0);
    const [dependedTokenQuant, setDependedTokenQuant] = useState(0);
    const [mainToken, setMainToken] = useState(null);
    const [depToken, setDepToken] = useState(null);
    const [depTokenName, setDepTokenName] = useState(null);
    const [mainQuantity, setMainQuantity] = useState(null);
    const [depQuantity, setDepQuantity] = useState(null);
    const [unavailableAsset, setUnavailableAsset] = useState(false);
    const [unavailableAssetDep, setUnavailableAssetDep] = useState(false);
    const [buttonState, setButtonState] = useState('before swap');
    const [errorMaxNumberOfTokens, setErrorMaxNumberOfTokens] = useState(false);
    const [errorSmallAmount, setErrorSmallAmount] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    const handleValue = (value) => {
        setTokenValue(value);
        setDependedTokenQuant(value / dependedTokenPrice);
    }

    const handlePrice = (price) => {
        setDependedTokenPrice(price);
        setDependedTokenQuant(tokenValue / price);
    }

    const handleSubmit = async (event) => {

    }

    const handleToken = (token) => {
        setMainToken(token);
    }

    const handleTokenDep = (depToken) => {
        setDepToken(depToken);
    }
    const handleTokenNameDep = (depTokenName) => {
        setDepTokenName(depTokenName);
    }
    const handleQuantity = (quant) => {
        setMainQuantity(quant)
    }

    const handleQuantityDep = (depQuant) => {
        setDepQuantity(depQuant);
    }

    const handleSwap = async () => {
        setButtonState('loading');
        if (!buy) {
            var sendToken = 'Symbol' in mainToken ? mainToken.Symbol : mainToken.ticker;
            var buyToken = depToken;
            var buyTokenName = depTokenName;
            var quantitySendToken = mainQuantity;
            var quantityOfBuyToken = parseFloat(depQuantity).toFixed(4);

        } else {
            var sendToken = depToken;
            var buyToken = 'Symbol' in mainToken ? mainToken.Symbol : mainToken.ticker;
            var buyTokenName = 'Symbol' in mainToken ? mainToken.CoinName : mainToken.token;
            var quantitySendToken = parseFloat(depQuantity).toFixed(4);
            var quantityOfBuyToken = mainQuantity;

        }

        // check if buyToken is in coins
        const buyTokenIsNew = !isTokenExists(coins, buyToken);

        if (buyTokenIsNew && coins.length >= 15) {
            setErrorSmallAmount(!errorMaxNumberOfTokens)
            setButtonState('before swap');
        } else {
            if (sendToken !== buyToken) {
                if (parseFloat(quantityOfBuyToken) === 0) {
                    setErrorSmallAmount(!errorSmallAmount);
                    setButtonState('before swap');
                } else {
                    if (buy ? !unavailableAssetDep : !unavailableAsset) {
                        if (isTokenExists(coins, sendToken)) {
                            if (isSufficientValue(coins, sendToken, quantitySendToken)) {
                                const response = await sellTokens(sendToken, buyTokenName, buyToken, quantitySendToken);
                                setButtonState('finished');
                            } else {
                                console.log('there are not enough tokens');
                                setButtonState('before swap');
                            }
                        } else {
                            console.log('there are no token');
                            setButtonState('before swap');
                        }
                    } else {
                        console.log('token is unavailable');
                        setButtonState('before swap');
                    }
                }
            } else {
                console.log('you cant swap the same token');
                setButtonState('before swap');
            }
        }
    }

    const finishSwap = () => {
        setButtonState('before swap');
        handleClose(true);
    }

    const handleCloseSnack = () => {
        setErrorMaxNumberOfTokens(false);
        setErrorSmallAmount(false);
    }

    useEffect(() => {
        setWidth(window.innerWidth);
        if (mainToken) {
            setUnavailableAsset(!isTokenExists(coins, 'Symbol' in mainToken ? mainToken.Symbol : mainToken.ticker))
            setUnavailableAssetDep(!isTokenExists(coins, depToken))
        }
    })

    return (
        <form onSubmit={handleSubmit} style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: width <= 500 ? "1rem 1rem 1rem 1rem" : "2rem 2rem 2rem 2rem",
            borderRadius: '30px',
            background: `linear-gradient(135deg, ${colors.primary[500]} 30%, ${colors.primary[500]} 70%)`
        }}>

            <AssetCard buy={buy} tokenInfo={tokenInfo} onSelectToken={handleToken} onSelectQuantity={handleQuantity} onSelectValue={handleValue} unavailableAsset={unavailableAsset} coins={coins} width={width} />
            <DependendAssetCard buy={!buy} onSelectToken={handleTokenDep} onSelectTokenName={handleTokenNameDep} onSelectQuantity={handleQuantityDep} onSelectPrice={handlePrice} dependedTokenQuant={dependedTokenQuant} unavailableAssetDep={unavailableAssetDep} coins={coins} width={width} />
            <Box display="flex" marginTop={width <= 500 ? '10px' : '20px'} width="100%">
                {buttonState === 'before swap' && <Button
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
                    onClick={handleSwap}
                >
                    SWAP
                </Button>}
                {buttonState === 'loading' && <Button
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
                    <CircularProgress size={22} />
                </Button>}
                {buttonState === 'finished' && <Button
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
                    onClick={finishSwap}
                >
                    Assets swapped! Go back to portfolio
                </Button>}
            </ Box>
            {errorMaxNumberOfTokens && <Box mt='30px'>
                <Snackbar open={errorMaxNumberOfTokens} autoHideDuration={6000} onClose={handleCloseSnack}>
                    <Alert severity="error">The maximum number of tokens is 15</Alert>
                </Snackbar>
            </Box>}

            {errorSmallAmount && <Box mt='30px'>
                <Snackbar open={errorSmallAmount} autoHideDuration={6000} onClose={handleCloseSnack}>
                    <Alert severity="error">Assets must be bought in quantities greater than zero</Alert>
                </Snackbar>
            </Box>}
        </form >

    )
};

export default FormSwap;