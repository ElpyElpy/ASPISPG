import { Box, Button, TextField, Typography, useTheme, Grid } from "@mui/material";
import { tokens } from "../../theme";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TokenIcon from "../TokenIcons/TokenIcon";
import { useState } from "react";
import { useEffect } from "react";
import calculatePrice from "../../services/calculatePrice";
import ModalDialogTokens from "./ModalDialogTokens";



const DependedAssetCard = ({ buy, onSelectToken, onSelectTokenName, onSelectQuantity, onSelectPrice, dependedTokenQuant, unavailableAssetDep, coins }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [openTokensModal, setOpenTokensModal] = useState(false) // state for choosing Tokens modal form
    const [tokenIcon, setTokenIcon] = useState('M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.189-17.98c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z')
    const [tokenTicker, setTokenTicker] = useState('BTC');
    const [tokenName, setTokenName] = useState('Bitcoin');
    const [quantity, setQuantity] = useState('');
    const [usdValue, setUsdValue] = useState(0);
    const [tokenFromParent, setTokenFromParent] = useState(null);
    const [previousToken, setPreviousToken] = useState(false);
    const [currentChoosenTokenValue, setCurrentChoosenTokenValue] = useState(0);

    const handleOpen = () => {
        setOpenTokensModal(true)
    }

    const handleCloseTokensModal = () => {
        setOpenTokensModal(false)
    }

    const handleTokenForParent = (tokenData) => {
        if (tokenData) {
            setTokenFromParent(tokenData);
            setPreviousToken(tokenTicker);
            setTokenTicker(tokenData.Symbol);
            setTokenName(tokenData.CoinName);
        }
    }

    useEffect(() => {
        // fetching price data
        let timeoutId;
        async function getPrice() {
            if (!(previousToken === tokenTicker)) {
                const usdValue = await calculatePrice(tokenTicker);
                setUsdValue((dependedTokenQuant.toFixed(4) * usdValue).toLocaleString("en-US", { style: "currency", currency: "USD" }));
                onSelectPrice(usdValue);
                setPreviousToken(tokenTicker);
            }
        }
        onSelectQuantity(dependedTokenQuant.toFixed(4));
        onSelectToken(tokenTicker);
        onSelectTokenName(tokenName);

        let currentTokenTicker = tokenFromParent ? tokenFromParent.Symbol : 'BTC';
        let currentToken = coins.find((coin) => coin.ticker === currentTokenTicker);
        if (currentToken !== undefined) {
            setCurrentChoosenTokenValue(parseFloat(currentToken.quantity.replace(/,/g, '')));
        } else {
            setCurrentChoosenTokenValue(0);
        }

        const debouncedGetPrice = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(getPrice, 500);
        };
        debouncedGetPrice();
        return () => {
            clearTimeout(timeoutId);
        };
    }, [dependedTokenQuant, tokenFromParent]) //[tokenFromParent, dependedTokenQuant]

    const handleFillWithMax = () => {
        setQuantity(currentChoosenTokenValue)
    }


    return (
        <Box width="100%" marginBottom="10px" marginTop="10px" marginLeft="50px" marginRight="50px" backgroundColor={colors.primary[400]} borderRadius="20px">
            <Box display="flex" marginTop="10px">
                <Grid container direction="row" alignItems="center" justifyContent="space-between" p="0px 20px 10px 5px">
                    <Typography
                        variant="h6"
                        sx={{ color: colors.grey[300], marginLeft: "10px" }}
                    >
                        You {buy ? "Buy" : 'Sell'}
                    </Typography>
                    {!buy && <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {(unavailableAssetDep || ((isNaN(dependedTokenQuant) ? 0 : dependedTokenQuant) > currentChoosenTokenValue)) && !buy && <Typography
                            variant="h6"
                            sx={{ color: colors.redAccent[500], marginLeft: "10px" }}
                        >
                            Insufficient balance
                        </Typography>}

                        <Button sx={{
                            backgroundColor: colors.primary[500], color: colors.grey[100], fontSize: "10px", borderRadius: '15px', borderColor: colors.grey[100], marginLeft: '10px', padding: '8px 15px 7px 15px',
                            '&:hover': {
                                backgroundColor: colors.primary[600],
                            }
                        }} onClick={handleFillWithMax}>Max: {currentChoosenTokenValue.toFixed(2)}</Button>
                    </Box>}
                </Grid>
            </Box>
            <Grid container direction="row" alignItems="center" justifyContent="space-between" p="0 10px 0 10px" >
                <Button sx={{ color: colors.grey[100], fontSize: "26px" }} startIcon={<TokenIcon svgpath={tokenFromParent ? tokenFromParent.svg_path : tokenIcon} />} endIcon={<ArrowDropDownIcon />} onClick={handleOpen}>{tokenFromParent ? tokenFromParent.Symbol : tokenTicker}</Button>
                <TextField disabled value={isNaN(dependedTokenQuant) ? 0 : dependedTokenQuant.toFixed(4)} inputProps={{ min: 0, style: { textAlign: 'end', fontSize: '26px' } }}   // the change is here
                    sx={{
                        width: '50%',
                        '& label.Mui-focused': {
                            color: colors.primary[400],

                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: colors.primary[400],

                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: colors.primary[400],

                            },
                            '&:hover fieldset': {
                                borderColor: colors.primary[400],

                            },
                            '&.Mui-focused fieldset': {
                                borderColor: colors.primary[400],

                            },
                        },
                        "& .MuiInputBase-root.Mui-disabled": {
                            "& > fieldset": {
                                borderColor: colors.primary[400]
                            }
                        }
                    }} />
            </Grid>
            <Box display="flex">
                <Grid container direction="row" alignItems="center" justifyContent="space-between" p="0px 20px 10px 5px">
                    <Typography
                        variant="h6"
                        sx={{ color: colors.grey[300], marginLeft: "10px" }}
                    >
                        {tokenFromParent ? tokenFromParent.CoinName : tokenName}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ color: colors.grey[300], marginLeft: "10px" }}
                    >

                    </Typography>
                </Grid>
            </Box>
            <ModalDialogTokens openTokensModal={openTokensModal} handleCloseTokensModal={handleCloseTokensModal} onChooseParentToken={handleTokenForParent} />
        </Box >
    );
};

export default DependedAssetCard;