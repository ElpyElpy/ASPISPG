import { Box, Button, TextField, Typography, useTheme, Grid } from "@mui/material";
import { tokens } from "../../theme";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TokenIcon from "../TokenIcons/TokenIcon";
import { useState } from "react";
import { useEffect } from "react";
import calculateUsdValue from "../../services/calculateUsdValue";
import ModalDialogTokens from "./ModalDialogTokens";



const AssetCard = ({ buy, tokenInfo, onSelectValue, onSelectToken, onSelectQuantity, unavailableAsset, coins }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [openTokensModal, setOpenTokensModal] = useState(false) // state for choosing Tokens modal form
    const [quantity, setQuantity] = useState('');
    const [usdValue, setUsdValue] = useState(0);
    const [tokenTicker, setTokenTicker] = useState(tokenInfo.ticker);
    const [tokenName, setTokenName] = useState(tokenInfo.token);
    const [tokenFromParent, setTokenFromParent] = useState(null);
    const [currentChoosenTokenValue, setCurrentChoosenTokenValue] = useState(0);


    const handleOpen = () => {
        setOpenTokensModal(true)
    }

    const handleCloseTokensModal = () => {
        setOpenTokensModal(false)
    }

    const handleTokenForParent = (tokenData) => {
        setTokenFromParent(tokenData);
    }

    useEffect(() => {
        // fetching price data
        let timeoutId;
        async function getPrice() {
            let usdValue = 0;
            let tokenInfoForUsdValueCalc = tokenFromParent ? tokenFromParent : tokenInfo;
            usdValue = await calculateUsdValue(tokenInfoForUsdValueCalc, quantity);
            setUsdValue(usdValue.toLocaleString("en-US", { style: "currency", currency: "USD" }));
            onSelectValue(usdValue);
        }
        onSelectToken(tokenFromParent ? tokenFromParent : tokenInfo);
        onSelectQuantity(quantity);

        let currentTokenTicker = tokenFromParent ? tokenFromParent.Symbol : tokenInfo.ticker;
        let currentToken = coins.find((coin) => coin.ticker === currentTokenTicker);
        if (currentToken !== undefined) {
            setCurrentChoosenTokenValue(parseFloat(currentToken.quantity.replace(/,/g, '')));
        } else {
            setCurrentChoosenTokenValue(0);
        }
        // setCurrentChoosenTokenValue(parseFloat(currentToken.quantity));
        const debouncedGetPrice = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(getPrice, 500);
        };
        debouncedGetPrice();
        return () => {
            clearTimeout(timeoutId);
        };
    }, [quantity, tokenFromParent, unavailableAsset])

    const handleChange = (e) => {
        // setQuantity(e.target.value);
        const regex = /^\d*\.?\d{0,4}$/; //    /^\d*\.?\d*$/
        if (e.target.value == "" || regex.test(e.target.value)) {
            if (!buy) {
                let currentTokenTicker = tokenFromParent ? tokenFromParent.Symbol : tokenInfo.ticker;
                let currentToken = coins.find((coin) => coin.ticker === currentTokenTicker);
                if (e.target.value <= parseFloat(currentToken.quantity.replace(/,/g, ''))) {
                    setQuantity(e.target.value);
                }
            } else {
                setQuantity(e.target.value);
            }

        }
    };

    const handleFillWithMax = () => {

        let currentChoosenTokenValueString = currentChoosenTokenValue.toString();
        setQuantity(currentChoosenTokenValueString)
    }


    return (
        <Box width="100%" marginBottom="10px" marginTop="10px" marginLeft="50px" marginRight="50px" backgroundColor={colors.primary[600]} borderRadius="20px">
            <Box display="flex" marginTop="10px">
                <Grid container direction="row" alignItems="center" justifyContent="space-between" p="0px 20px 10px 5px">
                    <Typography
                        variant="h6"
                        sx={{ color: colors.grey[300], marginLeft: "10px" }}
                    >
                        You {buy ? "Buy" : 'Sell'}
                    </Typography>
                    {!buy && <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {unavailableAsset && !buy && <Typography
                            variant="h6"
                            sx={{ color: colors.redAccent[500], marginLeft: "10px" }}
                        >
                            Insufficient balance
                        </Typography>}
                        <Button sx={{
                            backgroundColor: colors.primary[400], color: colors.grey[100], fontSize: "10px", borderRadius: '15px', borderColor: colors.grey[100], marginLeft: '10px', padding: '8px 15px 7px 15px',
                            '&:hover': {
                                backgroundColor: colors.primary[500],
                            }
                        }} onClick={handleFillWithMax}>Max: {currentChoosenTokenValue.toFixed(2)}</Button>
                    </Box>}

                </Grid>
            </Box >
            <Grid container direction="row" alignItems="center" justifyContent="space-between" p="0 10px 0 10px" >
                <Button sx={{ color: colors.grey[100], fontSize: "26px" }} startIcon={<TokenIcon svgpath={tokenFromParent ? tokenFromParent.svg_path : tokenInfo.svgpath} />} endIcon={<ArrowDropDownIcon />} onClick={handleOpen}>{tokenFromParent ? tokenFromParent.Symbol : tokenTicker}</Button>
                <TextField disabled={unavailableAsset && !buy} type="text" inputProps={{ style: { textAlign: 'end', fontSize: '26px' } }} value={quantity} onChange={(e) => handleChange(e)} onWheel={event => { event.preventDefault(); }} // the change is here
                    sx={{
                        width: '50%',
                        '& label.Mui-focused': {
                            color: colors.primary[600],
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: colors.primary[600],
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: colors.primary[600],
                            },
                            '&:hover fieldset': {
                                borderColor: colors.primary[600],
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: colors.primary[600],
                            },
                        },
                        '& .MuiInputAdornment-root > .MuiSvgIcon-root': {
                            display: 'none',
                        },
                        "& .MuiInputBase-root.Mui-disabled": {
                            "& > fieldset": {
                                borderColor: colors.primary[600]
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
                        {usdValue}
                    </Typography>
                </Grid>
            </Box>
            <ModalDialogTokens openTokensModal={openTokensModal} handleCloseTokensModal={handleCloseTokensModal} onChooseParentToken={handleTokenForParent} />
        </Box >
    );
};

export default AssetCard;