'use client'
import { Button, SimpleGrid } from '@chakra-ui/react'
import Image from 'next/image'
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FcLike } from 'react-icons/fc'
import { FcLikePlaceholder } from 'react-icons/fc'
import Link from 'next/link';
import axios from 'axios';
import { s3_bucket_url } from '@/app/components/configrations'
import { ProjectMedia } from '../components/CustomLoading';
import { isEmptyArray } from '../components/CustomFunctions';
export default function Home() {

  const router = useRouter();

  interface Project {
    _id: string;
    title: string;
    description: string;
    thumbnail: string;
    price: number;
    likes: number;
    downloads: number;
    // Add other properties as needed
  }

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects');
        if (res.status === 201) {
          setProjects(res.data.projects);
        } else {
          console.log('fetch post error');
        }
      } catch (error) {
        console.log('publish api error', error)
      }
    }
    fetchProjects();
  }, [])



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
    <main className="mainBody" id='learnmore'>
            {
              isEmptyArray(projects) ? <ProjectMedia /> :
                <SimpleGrid spacing={10} templateColumns='repeat(auto-fill, minmax(350px, 1fr))' className='pb-20'>
                  {
                    projects.map((project, index) => {
                      return (
                        <div key={index} className='projectCard'>
                          <Link href={`/${project?._id}`}>
                            <Image
                              src={`${s3_bucket_url!}/thumbnails/${project?.thumbnail}`}
                              alt="Picture of the codemarket"
                              width={500} //automatically provided
                              height={500} //automatically provided
                              blurDataURL="data:..." // automatically provided
                              placeholder="blur" // Optional blur-up while loading
                              className='imageThumbnail'
                            />
                            <div className='p-1 title'>{project?.title}</div>
                            <div className='p-1 description'>{project?.description}</div>
                          </Link>
                          <div className='btnGroup'>
                            <Button
                              className='likeButton mr-2'
                              leftIcon={
                                clickLike === index ? <FcLike style={{ marginRight: '-2px', marginTop: '-3px', fontSize: '16px' }} /> : <FcLikePlaceholder style={{ marginRight: '-2px', marginTop: '-3px', fontSize: '16px' }} />}

                              onClick={() => { likeBtn(index) }}
                            >
                              {project?.likes > 1000 ? formatLikes(project?.likes) : formatLikes(project?.likes)} Like
                            </Button>

                            <Button
                              className='downloadButton'
                              leftIcon={<DownloadForOfflineOutlinedIcon sx={{ marginRight: '-5px', fontSize: '18px' }} />}
                              onClick={() => { router.push('/auth/login') }}
                            >
                              {project?.downloads > 1000 ? formatLikes(project?.downloads) : formatLikes(project?.downloads)} Source Code
                            </Button>
                          </div>
                        </div>
                      )
                    })
                  }
                </SimpleGrid>
            }
          </main>
      {/* <div className="bg-white">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Download Project Source Code Free.{' '}
                <a href="#learnmore" className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Learn and Enhance your coding skills.
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Download and contribute to this project to make it even better!.Join us on this coding journey and explore the endless possibilities that the CodeMarket community offers.

                Happy coding!

              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/auth/signup"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </Link>
                <a href="#learnmore" className="text-sm font-semibold leading-6 text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          
        </div>
      </div> */}
    </>
  )
}
