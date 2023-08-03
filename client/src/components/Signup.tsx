import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink, useNavigate } from 'react-router-dom';
import * as MoodAPI from "../network/mood_api";
import { Controller, useForm } from 'react-hook-form';
import { User } from "../models/user";
import InputLabel from '@mui/material/InputLabel';
import loginImg from "../assets/dreambed.jpg";
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

interface SignupProps {
  onSignupSuccess: (user: User) => void,
}

export default function Signup({onSignupSuccess}: SignupProps) {
  const navigate = useNavigate();

  const [screenMatch, setScreenMatch] = useState(window.matchMedia("(min-width: 600px)").matches);

  useEffect(() => {
    window
    .matchMedia("(min-width: 600px)")
    .addEventListener('change', e => setScreenMatch(e.matches));
  },[]);

  const { control, handleSubmit} = useForm<MoodAPI.SignUpCredentials>();

  const signUpSubmit = async (input: MoodAPI.SignUpCredentials) => {
    try {
      const newUser = await MoodAPI.signUp(input);
      onSignupSuccess(newUser);
      navigate("/home");
      alert("You are signed up!");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '80vh','@media (max-width: 600px)': {height: '100%'}}}>
      <CssBaseline />
      {screenMatch &&<Grid container item xs={false} sm={6} md={5} className='loginImage'>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid item sx={{ mb: 3, fontSize: '35px', fontWeight: 'bold'}}>mood</Grid>
          <Grid item><img src={loginImg} alt="Bed in the clouds" id="dreambedImg" className="circleImage"/></Grid>
          <Grid item sx={{ mt: 3, fontSize: '20px', textAlign:'center'}}>"Believe you can, and you're halfway there."</Grid>
          <Grid item sx={{ fontSize: '18px', textAlign:'center'}}>-Theodore Roosevelt</Grid>
        </Container>
      </Grid>}
      {!screenMatch && <></>}

      <Grid item xs={12} sm={6} md={7} component={Paper} elevation={6} square 
        className="login-mobile"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center'
        }}>
        <Box
          sx={{
            my: 6,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            '@media (max-width: 600px)': {
              my: 2
            }
          }}
        >
          <Typography component="h1" variant="h1" sx={{mb: 2, textAlign:'left', color: '#000'}}>
            SIGN UP
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(signUpSubmit)} 
            sx={{ 
              mt: 1,
              display: 'flex',
              flexDirection: 'column',
          }}>
            <InputLabel htmlFor="firstName"><Typography variant='h4'>First Name</Typography></InputLabel>
            <Controller 
                control={control}
                name="firstname"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    InputProps={{
                      style: {
                        borderRadius: "50px",
                        height: "50px"
                      }
                    }}
                    InputLabelProps={{
                      style: { color: '#D0D0D0', fontSize: "18px"},
                    }}
                    sx={{mb: 2}}
                  />
                )}
              />
              <InputLabel htmlFor="lastName"><Typography variant='h4'>Last Name</Typography></InputLabel>
            <Controller 
                control={control}
                name="lastname"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    autoComplete="family-name"
                    name="lastName"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    InputProps={{
                      style: {
                        borderRadius: "50px",
                        height: "50px"
                      }
                    }}
                    InputLabelProps={{
                      style: { color: '#D0D0D0', fontSize: "18px" },
                    }}
                    sx={{mb: 2}}
                  />
                )}
              />
            <InputLabel htmlFor="username"><Typography variant='h4'>Username</Typography></InputLabel>
            <Controller 
                control={control}
                name="username"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    autoComplete="new-username"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    InputProps={{
                      style: {
                        borderRadius: "50px",
                        height: "50px"
                      }
                    }}
                    InputLabelProps={{
                      style: { color: '#D0D0D0', fontSize: "18px" },
                    }}
                    sx={{mb: 2}}
                  />
                )}
              />
              <InputLabel htmlFor="password"><Typography variant='h4'>Password</Typography></InputLabel>
              <Controller 
                control={control}
                name="password"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    autoComplete="new-password"
                    name="password"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    InputProps={{
                      style: {
                        borderRadius: "50px",
                        height: "50px"
                      }
                    }}
                    InputLabelProps={{
                      style: { color: '#D0D0D0', fontSize: "18px" },
                    }}
                  />
                )}
              />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: 'white', borderRadius: 50, width: 150, alignSelf:'center' }}
              className="gradient-button"
            >
              <Typography variant="subtitle2" sx={{fontWeight: 500}}>Sign Up</Typography>
            </Button>
            <Grid item sx={{mt: 2, alignSelf: 'center'}}>
              <NavLink to="/login" className={"signup-link"}>
                {"Have an account? Login"}
              </NavLink>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}