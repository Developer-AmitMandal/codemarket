"use client"
import React, { ChangeEvent, useState } from 'react'
import login from './signup.module.css'
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, ChakraProvider, Stack, useToast } from '@chakra-ui/react'
import Link from 'next/link';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import Image from 'next/image';
import { customTheme } from '@/app/components/chakraui';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignupPage() {

    const toast = useToast();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = () => { };
    const [isclick0, setIsclick0] = useState(false);
    const [isclick1, setIsclick1] = useState(false);
    const [isclick2, setIsclick2] = useState(false);

    const [userdata, setuserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: ''
    })
    const inputData = (e: ChangeEvent<HTMLInputElement>) => {
        setuserData({ ...userdata, [e.target.name]: e.target.value })
    }


    const regexemail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const regexmobile = /^[0-9]{10}$/;

    const submitData = async () => {

        const { firstName, lastName, email, mobile, password } = userdata;

        if (!firstName) {
            toast({ title: "Enter First Name", status: 'warning', duration: 4000, position: 'top', isClosable: true });
        } else if (!lastName) {
            toast({ title: "Enter Last Name", status: 'warning', duration: 4000, position: 'top-right', isClosable: true });
        } else if (!regexemail.test(email)) {
            toast({ title: "Enter Email Id", status: 'warning', duration: 4000, position: 'top-right', isClosable: true });
        } else if (!regexmobile.test(mobile)) {
            toast({ title: "Enter Correct Mobile number", status: 'warning', duration: 4000, position: 'top-right', isClosable: true });
        } else if (!password) {
            toast({ title: "Enter Strong Password", status: 'warning', duration: 4000, position: 'top-right', isClosable: true });
        } else {
            try {
                setIsclick0(true);
                const res = await axios.post(`/api/users/signup`, userdata);
                if (res.status === 201) {
                    setIsclick0(false);
                    sessionStorage.setItem('codemarket', res.data.token);
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
            <ChakraProvider theme={customTheme} />
            <div className={login.form}>
                <div className={login.formLeft}>
                    {/* left side */}
                </div>


                <div className={login.mainForm}>

                    <div className={login.title}>
                        <Image
                            src='/images/codemarket.png'
                            alt="Picture of the codemarket"
                            width={300} //automatically provided
                            height={500} //automatically provided
                            blurDataURL="data:..." // automatically provided
                            placeholder="blur" // Optional blur-up while loading
                        />
                    </div>
                    <div className={login.subtitle}>Register your Account</div>
                    <div className='mb-3'>
                        <OutlinedInput
                            size='small'
                            className='mr-1'
                            style={{ width: '49%' }}
                            type='text'
                            startAdornment={
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            }
                            placeholder='First Name'
                            name='firstName'
                            onChange={inputData}
                        />
                        <OutlinedInput
                            size='small'
                            type='text'
                            style={{ width: '49%' }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            }
                            placeholder='Last Name'
                            name='lastName'
                            onChange={inputData}
                        />
                    </div>
                    <div>
                        <OutlinedInput
                            size='small'
                            fullWidth
                            type='text'
                            startAdornment={
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            }
                            placeholder='Email Id'
                            name='email'
                            onChange={inputData}
                        />
                    </div>
                    <div>
                        <OutlinedInput
                            size='small'
                            fullWidth
                            type='text'
                            startAdornment={
                                <InputAdornment position="start">
                                    <CallIcon />
                                </InputAdornment>
                            }
                            placeholder='Mobile Number'
                            name='mobile'
                            className='mt-3'
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
                                Signup
                            </Button>
                        </Stack>
                    </div>

                    <div className='text-center mt-2'>
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
                                        alert('signup failed')
                                    }, 1000);
                                }}
                            >
                                Signup with  Google
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
                                        alert('signup failed')
                                    }, 1000);
                                }}
                            >
                                Signup with Facebook
                            </Button>
                        </Stack>
                    </div>

                    <div className='mt-3'>
                        <span className='mr-1'> Already have an Account?</span><Link className={login.bottomOption} href={'/auth/login'}>Login here</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
