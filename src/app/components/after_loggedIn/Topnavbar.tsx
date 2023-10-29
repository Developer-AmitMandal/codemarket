'use client'
import { Button, ChakraProvider, useToast } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import './css/topnavbar.css'
import axios from 'axios'

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

    return (
        <div className='topnavbar'>
            <ChakraProvider />
            <div>
                <Image
                    src='/images/codemarket.png'
                    alt="Picture of the codemarket"
                    width={200} //automatically provided
                    height={500} //automatically provided
                    blurDataURL="data:..." // automatically provided
                    placeholder="blur" // Optional blur-up while loading
                />
            </div>
            <div className='rightNavOption'>
                {/* <Button className='signupButton mr-2' onClick={() => { router.push('/auth/signup') }}>
                    Signup
                </Button> */}
                <Button className='loggedOutButton' onClick={LoggedOut}>
                    Logout
                </Button>
            </div>
        </div>
    )
}
