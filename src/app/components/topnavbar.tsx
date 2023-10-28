'use client'
import { usePathname, useRouter } from 'next/navigation'
import './css/topnavbar.css'
import { Button } from '@chakra-ui/react'
import Image from 'next/image'

export function Topnavbar() {
    const pathname = usePathname()

    const router = useRouter()

    return (
        <div className='topnavbar'>
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
                <Button className='signupButton mr-2' onClick={() => { router.push('/auth/signup') }}>
                    Signup
                </Button>
                <Button className='loginButton' onClick={() => { router.push('/auth/login') }}>
                    Login
                </Button>
            </div>
        </div>
    )
}