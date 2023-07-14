import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { NavLink, useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { User } from "../models/user";
import * as MoodAPI from "../network/mood_api";

interface NavbarProps {
  loggedInUser: User | null,
  onLogoutSuccess: () => void
}

//change auth to loggedInUser?
export default function Navbar({loggedInUser, onLogoutSuccess}: NavbarProps) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async() => {
    try {
      await MoodAPI.logout();
      onLogoutSuccess();
      handleClose();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  function stringToColor(string: string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0].toUpperCase()}`,
    };
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {loggedInUser 
              ? <NavLink to="/home">Mood</NavLink> 
              : <NavLink to="/">Mood</NavLink> 
            }
          </Typography>
          
          {loggedInUser && (
            <div>
              <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                <Avatar {...stringAvatar(loggedInUser.firstname)}/>
              </IconButton>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}><NavLink to="/profile">Profile</NavLink></MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </div>
            )}

          {!loggedInUser && (
            <Button color="inherit"><NavLink to="/login">Login</NavLink></Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}