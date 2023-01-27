import { Box, Button, Dialog, IconButton, Link, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import GoogleIcon from '@mui/icons-material/Google';
import React, { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from "react";







const Form = ({ handleClose }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isLogin, setIsLogin] = useState(false);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [errorEmailText, setErrorEmailText] = useState("");
    const [errorUserNameText, setErrorUserNameText] = useState("");
    const [errorPasswordText, setErrorPasswordText] = useState("");
    const [width, setWidth] = useState(window.innerWidth);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPasswordError(false);
        setErrorPasswordText("");
        setUserNameError(false);
        setErrorUserNameText("");

        if (password.length < 8) {
            setPasswordError(true);
            setErrorPasswordText("Password to short...");
        } else if (!isLogin && userName.length > 16) {
            setUserNameError(true);
            setErrorUserNameText("Username too long...");
        } else {
            setErrorUserNameText("");
            setErrorPasswordText("");
            setUserNameError(false);
            setPasswordError(false);
            if (!isLogin) {
                var user = {
                    username: userName,
                    email: email,
                    password: password
                }
            } else {
                var user = {
                    email: email,
                    password: password
                }
            }
            if (isLogin) {
                await axios.post('/auth/login', user, { withCredentials: true }).then(response => {
                    console.log(`msg responded by api: ${response.data.msg}`);
                    if (response.data.msg === 'wrong credentials') {
                        setEmailError(true)
                        setPasswordError(true)
                    } else if (response.data.msg === 'Wrong password or username') {
                        setEmailError(true)
                        setPasswordError(true)
                        setErrorEmailText("Wrong e-mail or password");
                        setErrorPasswordText("Wrong e-mail or password")
                    } else {
                        setEmailError(false)
                        setPasswordError(false)
                        setUserNameError(false)
                        setErrorEmailText("")
                        setErrorUserNameText("")
                        setErrorPasswordText("")
                        Cookies.set('user', response.data.msg, { expires: 1 });
                        handleClose()
                        navigate('/portfolio');
                        window.location.reload();

                    }
                })
                    .catch(error => console.error(error));
            } else {
                await axios.post('/auth/register', user, { withCredentials: true })
                    .then(response => {
                        console.log(`msg responded by api: ${response.data.msg}`);
                        if (response.data.msg === 'E-mail already exists') {
                            setUserNameError(false)
                            setErrorUserNameText("")
                            setEmailError(true)
                            setErrorEmailText("E-mail already exists");
                        } else if (response.data.msg === 'wrong credentials') {
                            setUserNameError(true)
                            setEmailError(true)
                            setPasswordError(true)
                        } else if (response.data.msg === 'Username already exists') {
                            setEmailError(false)
                            setErrorEmailText("")
                            setUserNameError(true)
                            setErrorUserNameText("UserName already exists")
                        } else if (response.data.msg === 'username and email already exist') {
                            setEmailError(true)
                            setUserNameError(true)
                            setErrorEmailText("Already exists")
                            setErrorUserNameText("Already exists")
                        } else {
                            setEmailError(false)
                            setPasswordError(false)
                            setUserNameError(false)
                            setErrorEmailText("")
                            setErrorUserNameText("")
                            setErrorPasswordText("")
                            Cookies.set('user', response.data.msg, { expires: 1 });
                            handleClose()
                            navigate('/portfolio');
                            window.location.reload();
                        }
                    })
                    .catch(error => console.error(error));
            }
        }
    }


    const handleLogin = () => {
        setIsLogin(!isLogin)
    }

    useEffect(() => {
        setWidth(window.innerWidth);
    })

    return (
        <form onSubmit={handleSubmit} style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: width <= 500 ? "2rem 2rem 2rem 2rem" : "2rem 5rem 3rem 5rem",
            border: "solid",
            borderWidth: "1px",
            borderColor: `linear-gradient(135deg, ${colors.greenAccent[400]} 30%, ${colors.greenAccent[500]} 90%)`,
            borderRadius: '50px',
            // backgroundColor: colors.primary[600]
            background: `linear-gradient(135deg, ${colors.primary[500]} 30%, ${colors.primary[900]} 90%)`
        }}>
            {!isLogin && <Typography
                variant={width <= 500 ? "h4" : "h2"}
                color={colors.grey[100]}
                fontWeight="bold"
            >
                REGISTRATION
            </Typography>}

            {isLogin && <Typography
                variant={width <= 500 ? "h4" : "h2"}
                color={colors.grey[100]}
                fontWeight="bold"
            >
                LOG IN
            </Typography>}

            <Box maxWidth="300px" marginTop="15px">

                {!isLogin && <Typography
                    variant="h7"
                    color={colors.grey[100]}
                >
                    Already have an account? <Link href="#" color="secondary" onClick={handleLogin}>Log in</Link>
                </Typography>}
                {isLogin && <Typography
                    variant="h7"
                    color={colors.grey[100]}
                >
                    Don't have an account? <Link href="#" color="secondary" onClick={handleLogin}>Sign up</Link>
                </Typography>}
            </Box>
            {!isLogin && <TextField error={userNameError} helperText={errorUserNameText} label="username (max 16 characters)" variant="outlined" maxLength={16} required sx={{
                margin: "1rem",
                width: "100%",
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.grey[200]
                },
                "& .MuiFormLabel-root.Mui-focused": {
                    color: colors.grey[200]
                }
            }} value={userName} onChange={(e) => setUserName(e.target.value)} />}
            <TextField error={emailError} helperText={errorEmailText} label="e-mail" type="email" variant="outlined" required sx={{
                margin: "1rem",
                width: "100%",
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.grey[200]
                },
                "& .MuiFormLabel-root.Mui-focused": {
                    color: colors.grey[200]
                }
            }} value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField error={passwordError} label="password (min 8 characters)" helperText={errorPasswordText} type="password" variant="outlined" minLength={8} required sx={{
                margin: "1rem",
                width: "100%",
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.grey[200]
                },
                "& .MuiFormLabel-root.Mui-focused": {
                    color: colors.grey[200]
                }
            }} value={password} onChange={(e) => setPassword(e.target.value)} />
            <div>
                {!isLogin && <Button variant="contained" type="submit" sx={{ width: width <= 500 ? "260px" : "300px", marginTop: "10px", backgroundColor: colors.greenAccent[600] }}>Sign up</Button>}
                {isLogin && <Button variant="contained" type="submit" sx={{ width: width <= 500 ? "260px" : "300px", marginTop: "10px", backgroundColor: colors.greenAccent[600] }}>Log in</Button>}
            </div>
            <div>
                {!isLogin && <Button variant="contained" color="primary" sx={{ width: width <= 500 ? "260px" : "300px", marginTop: "10px", backgroundColor: colors.blueAccent[700] }} startIcon={<GoogleIcon />}>Sign up with Google</Button>}
                {isLogin && <Button variant="contained" color="primary" sx={{ width: width <= 500 ? "260px" : "300px", marginTop: "10px", backgroundColor: colors.blueAccent[700] }} startIcon={<GoogleIcon />}>Log in with Google</Button>}
            </div>
            {!isLogin && <Box maxWidth="300px" marginTop="15px">
                <Typography
                    variant="body2"
                    color={colors.grey[100]}
                >
                    By registering, you agree to <Link href="#" color="secondary">Terms of Service</Link> and <Link href="#" color="secondary">Privacy Policy</Link>.
                </Typography>
            </Box>}
        </form >

    )
};

export default Form;