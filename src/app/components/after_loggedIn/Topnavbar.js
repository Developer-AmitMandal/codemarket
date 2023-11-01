'use client'
import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import './css/topnavbar.css'
import axios from 'axios'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import CodeIcon from '@mui/icons-material/Code';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';

export function Topnavbar() {
    const router = useRouter();
    const toast = useToast();

    const LoggedOut = async () => {
        try {
            const res = await axios.get('/api/users/logout');
            if (res.status === 201) {
                toast({ title: res.data.msg, status: 'success', duration: 4000, position: 'top-right', isClosable: true });
                setTimeout(() => {
                    router.push('/');
                }, 1000);
            } else {
                toast({ title: 'Logged Out error', status: 'error', duration: 4000, position: 'top-right', isClosable: true });
            }
        } catch (error) {
            console.log('logout error', error)
        }
    }


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // users data
    const [usersData, setUsers] = useState([]);
    const fetchusers = async () => {
        try {
            const res = await axios.get('/api/users');
            if (res.status === 201) {
                setUsers(res.data.users);
            } else {
                console.log('fetch post error');
            }
        } catch (error) {
            console.log('get users api error', error)
        }
    }

    useEffect(() => {
        fetchusers();
    }, [0]);
    return (
        <div className='topnavbar'>
            <Link href={'/dashboard'}>
                <Image
                    src='/images/codemarket.png'
                    alt="Picture of the codemarket"
                    width={200} //automatically provided
                    height={500} //automatically provided
                    blurDataURL="data:..." // automatically provided
                    placeholder="blur" // Optional blur-up while loading
                />
            </Link>
            <div className='rightNavOption'>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar alt={usersData?.fullName} src='sd' sx={{ width: 32, height: 32 }}></Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleClose}>
                        <Avatar src='imag' /> {usersData?.fullName}
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => { router.push(`/dashboard`) }}>
                        <ListItemIcon>
                            <HomeIcon fontSize="small" />
                        </ListItemIcon>
                        Home
                    </MenuItem>
                    <MenuItem onClick={() => { router.push(`/purchased/${usersData?._id}`) }}>
                        <ListItemIcon>
                            <CodeIcon fontSize="small" />
                        </ListItemIcon>
                        Purchased Projects
                    </MenuItem>
                    <MenuItem onClick={LoggedOut}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}
