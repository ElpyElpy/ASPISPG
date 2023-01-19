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

    const handleTokenChoose = (tokenData) => {
        setSelectedToken(tokenData);
        setQuery("");
        handleCloseTokensModal();
    }

    useEffect(() => {
        onChooseParentToken(selectedToken);
    })


    return (
        <Dialog open={openTokensModal} onClose={handleCloseTokensModal} sx={{
            "& .MuiPaper-root": {
                borderRadius: "30px"
            }
        }}>
            <Box
                width="32rem"
                padding="2rem 1rem 2rem 1rem"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                borderRadius='30px'
                backgroundColor={colors.primary[600]}
                height="80vh"
            >
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
                        sx={{ width: "30rem" }}
                        onChange={e => setQuery(e.target.value.toLocaleLowerCase())}
                    />
                </Box>
                <Divider variant="middle" sx={{ width: "30rem", marginTop: "30px" }} />
                {/* <ul className="list">
                    {tokensArr.filter(token => token.CoinName.toLowerCase().includes(query)).map(token => (
                        <li key={token.Id} className="listItem">{token.Symbol}</li>
                    ))}
                </ul> */}
                {(tokensArr !== null) && (tokensArr !== undefined) && <TokensTable onChooseToken={handleTokenChoose} coins={tokensArr.filter(token => token.CoinName.toLowerCase().includes(query) || token.Symbol.toLowerCase().includes(query))} />}
            </Box>

        </Dialog>
    );
};

export default ModalDialogTokens;