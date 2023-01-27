import { Box, Button, Dialog, IconButton, Typography, useTheme, TextField, InputAdornment, Divider } from "@mui/material";
import { tokens } from "../../theme";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { tokensArr } from '../../assets/tokensArr';
import { useState } from "react";
import TokensTable from "./TokensTable";
import { useEffect } from "react";


const ModalDialogTokens = ({ openTokensModal = false, handleCloseTokensModal, onChooseParentToken }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [query, setQuery] = useState("");
    const [selectedToken, setSelectedToken] = useState(null);
    const [closeModal, setCloseModal] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    const handleTokenChoose = (tokenData) => {
        setSelectedToken(tokenData);
        setQuery("");
        handleCloseTokensModal();
    }

    useEffect(() => {
        onChooseParentToken(selectedToken);
        setWidth(window.innerWidth);
    })


    return (
        <Dialog open={openTokensModal} onClose={handleCloseTokensModal} sx={{
            "& .MuiPaper-root": {
                borderRadius: "30px"
            },
            backgroundColor: "rgba(28, 29, 39, 0.9)"
        }}>
            <Box display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                padding="2rem 2rem 2rem 2rem"
                width={width <= 500 ? "320px" : "400px"}
                height="70vh"
                sx={{ background: `linear-gradient(135deg, ${colors.primary[600]} 30%, ${colors.primary[800]} 90%)` }}>
                <Typography
                    variant="h3"
                    color={colors.grey[100]}
                    sx={{ m: "5px 0 5px 0" }}>Select a token
                </Typography>
                <Box marginTop="20px">
                    <TextField
                        variant="outlined"
                        placeholder="Search by name"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            width: width <= 500 ? "260px" : "340px"
                        }}
                        onChange={e => setQuery(e.target.value.toLocaleLowerCase())}
                    />
                </Box>
                <Divider variant="middle" sx={{ width: "100%", marginTop: "30px" }} />
                {(tokensArr !== null) && (tokensArr !== undefined) && <TokensTable onChooseToken={handleTokenChoose} coins={tokensArr.filter(token => token.CoinName.toLowerCase().includes(query) || token.Symbol.toLowerCase().includes(query))} />}
            </Box>


        </Dialog>
    );
};

export default ModalDialogTokens;