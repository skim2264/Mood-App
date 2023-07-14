import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import * as MoodAPI from "../network/mood_api";
import { Controller, useForm } from 'react-hook-form';
import { User } from "../models/user";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface SignupProps {
  onSignupSuccess: (user: User) => void,
}
//have a return that sign up was successful - navigate to main page

export default function Signup({onSignupSuccess}: SignupProps) {
  const navigate = useNavigate();
  const { control, handleSubmit} = useForm<MoodAPI.SignUpCredentials>();

  const signUpSubmit = async (input: MoodAPI.SignUpCredentials) => {
    try {
      const newUser = await MoodAPI.signUp(input);
      console.log(newUser);
      onSignupSuccess(newUser);
      navigate("/home");
      alert("sign up success");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(signUpSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller 
                  control={control}
                  name="firstname"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller 
                    control={control}
                    name="lastname"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        autoComplete="family-name"
                        name="lastName"
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        autoFocus
                      />
                    )}
                  />
              </Grid>
              <Grid item xs={12}>
                <Controller 
                    control={control}
                    name="username"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        autoComplete="new-username"
                        name="username"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        type="username"
                        autoFocus
                      />
                    )}
                  />
              </Grid>
              <Grid item xs={12}>
                <Controller 
                    control={control}
                    name="password"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        autoComplete="new-password"
                        name="password"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        autoFocus
                      />
                    )}
                  />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/login">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}