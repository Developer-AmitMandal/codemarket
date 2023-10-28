"use client"
import React, { ChangeEvent, useState } from 'react'
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, ChakraProvider, Stack, useToast } from '@chakra-ui/react'
import Link from 'next/link';
import login from '../signup/signup.module.css'
import Image from 'next/image'
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {

    const toast = useToast();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = () => { };
    const [isclick0, setIsclick0] = useState(false);
    const [isclick1, setIsclick1] = useState(false);
    const [isclick2, setIsclick2] = useState(false);



    const [userdata, setuserData] = useState({
        email: '',
        password: ''
    })
    const inputData = (e: ChangeEvent<HTMLInputElement>) => {
        setuserData({ ...userdata, [e.target.name]: e.target.value });
    }


    const regexemail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const submitData = async () => {

        const { email, password } = userdata;

        if (!email) {
            toast({ title: "Enter email/user id", status: 'warning', duration: 4000, position: 'top-right', isClosable: true });
        } else if (!password) {
            toast({ title: "Enter Password", status: 'warning', duration: 4000, position: 'top-right', isClosable: true });
        } else {
            try {
                setIsclick0(true);
                const res = await axios.post(`/api/users/login`, userdata);
                if (res.status === 201) {
                    setIsclick0(false);
                    toast({ title: res.data.msg, status: 'success', duration: 4000, position: 'top', isClosable: true });
                    router.push('/dashboard')
                } else {
                    setIsclick0(false);
                    toast({ title: res.data.msg, status: 'error', duration: 4000, position: 'top', isClosable: true });
                }
            } catch (error) {
                setIsclick0(false);
                console.log('signup user api call error', error);
            }
        }
    }

    return (
        <main className={login.mainbody}>
            <ChakraProvider />
            <div className={login.form}>
                <div className={login.formLeft}>

                </div>

                <div className={login.mainForm}>
                    <div className={login.title}>
                        <Image
                            src='/images/codemarket.png'
                            alt="Picture of the codemarket"
                            width={300} // automatically provided
                            height={500} // automatically provided
                            blurDataURL="data:..." // automatically provided
                            placeholder="blur" // Optional blur-up while loading
                        />
                    </div>
                    <div className={login.subtitle}>Login to your Account</div>
                    <div>
                        <OutlinedInput
                            size='small'
                            fullWidth
                            type='text'
                            startAdornment={
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            }
                            placeholder='E-mail/user Id'
                            name='email'
                            onChange={inputData}
                        />
                    </div>

                    <div>
                        <OutlinedInput
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            startAdornment={
                                <InputAdornment position="start">
                                    <KeyIcon />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            size='small'
                            className='mt-3'
                            placeholder='Password'
                            name='password'
                            onChange={inputData}
                        />
                    </div>
                    <div>
                        <Stack direction='row' spacing={4} className='mt-3'>
                            <Button
                                className={login.loginButton}
                                isLoading={isclick0}
                                loadingText='Loading'
                                spinnerPlacement='start'
                                onClick={submitData}
                            >
                                Login
                            </Button>
                        </Stack>
                    </div>

                    <div className={login.bottomOption}>
                        <Link onClick={() => { alert('coming soon') }} href={''}>Forget Password?</Link>
                    </div>
                    <div className='text-center'>
                        {'------------- OR --------------'}
                    </div>
                    <div>
                        <Stack className={login.authProviderButton}>
                            <Button
                                className={login.googleButton}
                                isLoading={isclick1}
                                loadingText='Loading'
                                spinnerPlacement='start'
                                onClick={() => {
                                    setIsclick1(true);
                                    setTimeout(() => {
                                        setIsclick1(false)
                                        alert('login failed')
                                    }, 1000);
                                }}
                            >
                                Login with  Google
                            </Button>
                            <Button
                                className={login.facebookButton}
                                isLoading={isclick2}
                                loadingText='Loading'
                                spinnerPlacement='start'
                                onClick={() => {
                                    setIsclick2(true);
                                    setTimeout(() => {
                                        setIsclick2(false)
                                        alert('login failed')
                                    }, 1000);
                                }}
                            >
                                Login with Facebook
                            </Button>
                        </Stack>
                    </div>

                    <div className='mt-3'>
                        {'Don\'t have an Account?'} <Link className={login.bottomOption} href={'/auth/signup'}>Register</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
