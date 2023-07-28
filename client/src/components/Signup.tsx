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

interface SignupProps {
  onSignupSuccess: (user: User) => void,
}

export default function Signup({onSignupSuccess}: SignupProps) {
  const navigate = useNavigate();
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
    <Grid container component="main" sx={{ height: '100%' }}>
      <CssBaseline />
      <Grid container item xs={false} sm={6} md={5} className='loginImage'>
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
      </Grid>
      <Grid item xs={12} sm={6} md={7} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 6,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
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
                        borderRadius: "50px"
                      }
                    }}
                    InputLabelProps={{
                      style: { color: '#D0D0D0' },
                    }}
                    sx={{mb: 3}}
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
                    autoFocus
                    InputProps={{
                      style: {
                        borderRadius: "50px"
                      }
                    }}
                    InputLabelProps={{
                      style: { color: '#D0D0D0' },
                    }}
                    sx={{mb: 3}}
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
                    autoFocus
                    InputProps={{
                      style: {
                        borderRadius: "50px"
                      }
                    }}
                    InputLabelProps={{
                      style: { color: '#D0D0D0' },
                    }}
                    sx={{mb: 3}}
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
                    autoFocus
                    type="password"
                    InputProps={{
                      style: {
                        borderRadius: "50px",
                      }
                    }}
                    InputLabelProps={{
                      style: { color: '#D0D0D0' },
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