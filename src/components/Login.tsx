import { NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as MoodAPI from "../network/mood_api";
import { Controller, useForm } from 'react-hook-form';
import { User } from "../models/user";
import Container from '@mui/material/Container';
import loginImg from "../assets/dreambed.jpg";
import InputLabel from '@mui/material/InputLabel';

interface LoginProps {
  onLoginSuccess: (user: User) => void,
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const navigate = useNavigate();

  const { control, handleSubmit} = useForm<MoodAPI.LoginCredentials>();

  const loginSubmit = async (input: MoodAPI.LoginCredentials) => {
    try {
      const user = await MoodAPI.login(input);
      onLoginSuccess(user);
      alert("You are logged in!");
      navigate('/home');
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '80vh' }}>
      <CssBaseline />
      <Grid container item xs={false} sm={6} md={5} className='loginImage'>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 2
          }}
        >
          <Grid item sx={{ mb: 3, fontSize: '35px', fontWeight: 'bold'}}>mood</Grid>
          <Grid item><img src={loginImg} alt="Bed in the clouds" id="dreambedImg" className="circleImage"/></Grid>
          <Grid item sx={{ mt: 3, fontSize: '20px', textAlign:'center'}}>"Believe you can, and you're halfway there."</Grid>
          <Grid item sx={{ fontSize: '18px', textAlign:'center'}}>-Theodore Roosevelt</Grid>
        </Container>
      </Grid>

      <Grid item xs={12} sm={6} md={7} component={Paper} elevation={6} square 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center'
        }}
      >
        <Box
          sx={{
            mx: 8,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography component="h1" variant="h1" sx={{mb: 4, textAlign: 'left', color: '#000'}}>
            SIGN IN
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(loginSubmit)} 
            sx={{ 
              mt: 1,
              display: 'flex',
              flexDirection: 'column'
          }}>
            <InputLabel htmlFor="username"><Typography variant='h4'>Username</Typography></InputLabel>
            <Controller 
                control={control}
                name="username"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    autoComplete="username"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    InputProps={{
                      style: {
                        borderRadius: "50px"
                      }
                    }}
                    sx={{mb: 4}}
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
                    autoComplete="password"
                    name="password"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    autoFocus
                    type="password"
                    InputProps={{
                      style: {
                        borderRadius: "50px",
                      }
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
              <Typography variant="subtitle2" sx={{fontWeight: 500}}>Sign In</Typography>
            </Button>
            <Grid item sx={{mt: 2, alignSelf: 'center'}}>
              <NavLink to="/signup" className={"signup-link"}>
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}