'use client'
import { Button, SimpleGrid } from '@chakra-ui/react'
import './globals.css'
import Image from 'next/image'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import { useRouter } from 'next/navigation';
import { Topnavbar } from './components/before_loggedIn/topnavbar';
import { useState } from 'react';
import { FcLike } from 'react-icons/fc'
import { FcLikePlaceholder } from 'react-icons/fc'
import Link from 'next/link';

export default function Home() {

  const router = useRouter();

  const projects = [
    {
      projectId: '12454',
      title: 'E-Commerce Platform',
      thumbnail: 'https://user-images.githubusercontent.com/91625966/226650206-9ea63a4d-0791-4475-a911-d88599880415.png',
      description: 'A comprehensive e-commerce platform with a wide range of products and features.',
      likes: 1666,
      downloads: 40,
      price: 450,
    },
    {
      title: 'Voting Management System',
      thumbnail: 'https://user-images.githubusercontent.com/91625966/226650206-9ea63a4d-0791-4475-a911-d88599880415.png',
      description: 'An online system for managing and conducting elections and votes.',
      likes: 106,
      downloads: 40,
      price: 450,
    },
    {
      title: 'File Saver',
      thumbnail: 'https://user-images.githubusercontent.com/91625966/202890841-d0f3495c-6ce8-46b9-aad3-51f0bdd28e26.png',
      description: 'A simple file-saving application to manage your important documents.',
      likes: 16,
      downloads: 40,
      price: 450,
    },
    {
      title: 'Code Market',
      thumbnail: 'https://user-images.githubusercontent.com/91625966/202890841-d0f3495c-6ce8-46b9-aad3-51f0bdd28e26.png',
      description: 'An online marketplace for buying and selling code and software.',
      likes: 16,
      downloads: 4040,
      price: 4050,
    },
    {
      title: 'E-Commerce Shopping Web App',
      thumbnail: 'https://user-images.githubusercontent.com/91625966/202890841-d0f3495c-6ce8-46b9-aad3-51f0bdd28e26.png',
      description: 'A mobile app for convenient online shopping and product discovery.',
      likes: 16,
      downloads: 40,
      price: 450,
    },
    {
      title: 'Payment Gateway Integration',
      thumbnail: 'https://user-images.githubusercontent.com/91625966/202890841-d0f3495c-6ce8-46b9-aad3-51f0bdd28e26.png',
      description: 'Integrate payment gateways into your applications for seamless transactions.',
      likes: 16,
      downloads: 40,
      price: 450,
    },
    {
      title: 'Google Authentication',
      thumbnail: 'https://user-images.githubusercontent.com/91625966/202890841-d0f3495c-6ce8-46b9-aad3-51f0bdd28e26.png',
      description: 'Add Google authentication to your applications for user sign-in.',
      likes: 16,
      downloads: 40,
      price: 450,
    },
    {
      title: 'OTP Sent to Email',
      thumbnail: 'https://user-images.githubusercontent.com/91625966/202890841-d0f3495c-6ce8-46b9-aad3-51f0bdd28e26.png',
      description: 'Send OTPs to email addresses for user verification and security.',
      likes: 16,
      downloads: 40,
      price: 450,
    },
    {
      title: 'OTP Sent to Mobile Number',
      thumbnail: 'https://user-images.githubusercontent.com/91625966/202890841-d0f3495c-6ce8-46b9-aad3-51f0bdd28e26.png',
      description: 'Send OTPs to mobile numbers for user verification and security.',
      likes: 16,
      downloads: 40,
      price: 450,
    },
  ];



  const [clickLike, setClickLike] = useState<number | null>(null);

  const likeBtn = (index: number) => {
    if (clickLike === index) {
      setClickLike(null); // Toggle like state off
    } else {
      setClickLike(index); // Toggle like state on
      router.push('/auth/login');
    }
  };

  function formatLikes(likes: number) {
    if (likes >= 1000000) {
      return (likes / 1000000).toFixed(1) + 'm';
    } else if (likes >= 1000) {
      return (likes / 1000).toFixed(1) + 'k';
    } else {
      return likes.toString();
    }
  }


  return (
    <>
      <Topnavbar />

      <main className="mainBody">
        <SimpleGrid spacing={10} templateColumns='repeat(auto-fill, minmax(350px, 1fr))'>
          {
            projects.map((project, index) => {
              return (
                <div key={index} className='projectCard'>
                  <Link href={'#'}>
                    <Image
                      src={project.thumbnail}
                      alt="Picture of the codemarket"
                      width={500} //automatically provided
                      height={500} //automatically provided
                      blurDataURL="data:..." // automatically provided
                      placeholder="blur" // Optional blur-up while loading
                    />
                    <div className='p-1 title'>{project.title}</div>
                    <div className='p-1 description'>{project.description}</div>
                  </Link>
                  <div className='btnGroup'>
                    <Button
                      className='likeButton mr-2'
                      leftIcon={
                        clickLike === index ? <FcLike style={{ marginRight: '-2px', marginTop: '-3px', fontSize: '16px' }} /> : <FcLikePlaceholder style={{ marginRight: '-2px', marginTop: '-3px', fontSize: '16px' }} />}

                      onClick={() => { likeBtn(index) }}
                    >
                      {project.likes > 1000 ? formatLikes(project.likes) : formatLikes(project.likes)} Like
                    </Button>

                    <Button
                      className='downloadButton'
                      leftIcon={<DownloadForOfflineOutlinedIcon sx={{ marginRight: '-5px', fontSize: '18px' }} />}
                      onClick={() => { router.push('/auth/login') }}
                    >
                      {project.downloads > 1000 ? formatLikes(project.downloads) : formatLikes(project.downloads)} Downloads
                    </Button>
                  </div>
                </div>
              )
            })
          }
        </SimpleGrid>
      </main>
    </>
  )
}
