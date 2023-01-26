import Header from "../../components/Header";
import { Box, IconButton, Card, useTheme, CardContent, Grid, Avatar, Typography, Button, TextField, CircularProgress } from "@mui/material";
import { useContext, useState } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import HomeCardCreate from "../../components/HomeCards/HomeCardCreate";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import StepperCreatePortfolio from "../../components/StepperCreatePortfolio/StepperCreatePortfolio";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

const CreatePortfolio = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [imageUrl, setImageUrl] = useState("");
    const [imagePreroll, setImagePreroll] = useState("");
    const [portfolioName, setPortfolioName] = useState("");
    const [portfolioDescription, setPortfolioDescription] = useState("");
    const [sizeError, setSizeError] = useState(false);
    const [typeError, setTypeError] = useState(false);
    const [otherErrors, setOtherErrors] = useState(false);
    const [buttonState, setButtonState] = useState('before creation');

    const navigate = useNavigate();


    const handleCreatePortfolio = async (e) => {
        e.preventDefault();
        setButtonState('loading');
        const formData = new FormData();
        formData.append('name', portfolioName);
        formData.append('description', portfolioDescription);
        formData.append('icon', imageUrl);

        if (portfolioName === "" || portfolioDescription === "") {
            setButtonState('before creation');
            setOtherErrors('no name or description');
            return
        }

        await axios.post('/portfolio/closed/create', formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        }).then(response => {
            if (response.data.msg === 'portfolio created') {
                setImageUrl("");
                setImagePreroll("");
                Cookies.set('hasPortfolio', 'true');
                setButtonState('before creation');
                navigate('/portfolio');
            } else if (response.data.msg === 'portfolio already exists' || response.data.msg === 'portfolio name already exists' || response.data.msg === 'no name or description') {
                setButtonState('before creation');
                setOtherErrors(response.data.msg);
            }
        }).catch(error => {
            setButtonState('before creation');
            console.error(error)
        });
    }


    const handleLoadAvatar = async (e) => {
        const file = e.target.files[0];

        if (file === undefined) {
            return
        }
        if (file.size > 1024 * 1024 * 3) {
            setSizeError(true);
            return
        }

        if (!file.type.match('image.*')) {
            setTypeError(true);
            return
        } else {
            setImageUrl(file);
            setTypeError(false);
            setSizeError(false);

            const reader = new FileReader();
            reader.onload = function () {
                setImagePreroll(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }


    useEffect(() => {
        if (Cookies.get('hasPortfolio') === "true") {
            navigate('/portfolio');
        }
    })



    return (
        <Box m="20px" >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={"CREATE PORTFOLIO"} subtitle={"and compete for the prizes"} />
                <Box>
                    <IconButton>
                        <ShareOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box display="flex" justifyContent='center' alignItems='center'>
                <Box maxWidth="350px" marginTop="15px" display="flex" justifyContent='center' alignItems='center' >
                    <form onSubmit={handleCreatePortfolio} style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "1rem 2rem 2rem 2rem",
                        borderRadius: '50px',
                        width: "30rem",
                        background: `linear-gradient(135deg, ${colors.primary[700]} 10%, ${colors.primary[900]} 90%)`,
                        boxShadow: '7px 4px 12px -7px rgba(0,0,0,0.59)'
                    }}>
                        <Box display="flex" width='100%' marginTop="20px" >
                            <Box >
                                {sizeError && <Typography variant="caption" color={colors.redAccent[500]}>maximum avatar size is 3mb</Typography>}
                                {typeError && <Typography variant="caption" color={colors.redAccent[500]}>uploaded file is not an image</Typography>}
                                {otherErrors && <Typography variant="caption" color={colors.redAccent[500]}>{otherErrors}</Typography>}
                                <Typography
                                    variant="h5"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "0px 0 20px 0" }}>Logo and portfolio name</Typography>
                                <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="10px">
                                    <Box borderRadius="7px" display="flex" alignItems="center" justifyContent="center" borderColor={colors.grey[500]} sx={{ width: 50, height: 50 }} >
                                        <label htmlFor="avatar-upload">
                                            <Avatar alt="+" src={imagePreroll} sx={{ width: 48, height: 48, bgcolor: colors.grey[600], border: "solid 1px", borderColor: colors.grey[200], cursor: 'pointer' }} component="span" />
                                        </label>
                                        <input type="file" id="avatar-upload" style={{ display: "none" }} name="icon" onChange={handleLoadAvatar} />
                                    </Box>
                                    <TextField placeholder="Jupiter Capital" variant="outlined" maxLength={10} required sx={{
                                        width: "16rem",
                                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: colors.grey[200]
                                        },
                                        "& .MuiFormLabel-root.Mui-focused": {
                                            color: colors.grey[200]
                                        }
                                    }} value={portfolioName} onChange={(e) => setPortfolioName(e.target.value)} />
                                </Box>


                                <Typography
                                    variant="h5"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "40px 0 20px 0" }}>Description</Typography>
                                <TextField placeholder="Manage low-risk diversitified crypto portfolio" variant="outlined" multiline rows={3} maxLength={10} sx={{
                                    width: "20rem",
                                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: colors.grey[200]
                                    },
                                    "& .MuiFormLabel-root.Mui-focused": {
                                        color: colors.grey[200]
                                    }
                                }} value={portfolioDescription} onChange={(e) => setPortfolioDescription(e.target.value)} />
                            </Box>
                        </Box>
                        <div>
                            {buttonState === 'before creation' && <Button size="large" variant="contained" type="submit" sx={{ width: "20rem", marginTop: "40px", backgroundColor: colors.greenAccent[700], '&:hover': { backgroundColor: colors.greenAccent[600], } }} onClick={handleCreatePortfolio}>CREATE PORTFOLIO</Button>}
                            {buttonState === 'loading' && <Button size="large" variant="contained" type="submit" sx={{ width: "20rem", marginTop: "40px", backgroundColor: colors.redAccent[600], '&:hover': { backgroundColor: colors.redAccent[600], } }} ><CircularProgress size={22} sx={{ color: colors.grey[100], mr: '5px' }} /> Creating...</Button>}
                        </div>
                    </form >
                </Box>
            </Box >

        </Box >
    )
}

export default CreatePortfolio;